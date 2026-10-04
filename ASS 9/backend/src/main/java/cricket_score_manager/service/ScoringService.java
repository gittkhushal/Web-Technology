package cricket_score_manager.service;

import cricket_score_manager.dto.DeliveryRequest;
import cricket_score_manager.dto.DeliveryResponse;
import cricket_score_manager.entity.Delivery;
import cricket_score_manager.entity.Innings;
import cricket_score_manager.entity.Player;
import cricket_score_manager.repository.InningsRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import cricket_score_manager.repository.DeliveryRepository;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ScoringService {

    private final DeliveryRepository deliveryRepository;
    private final InningsService inningsService;
    private final PlayerService playerService;
    private final InningsRepository inningsRepository;

    public ScoringService(DeliveryRepository deliveryRepository, InningsService inningsService,
                         PlayerService playerService, InningsRepository inningsRepository) {
        this.deliveryRepository = deliveryRepository;
        this.inningsService = inningsService;
        this.playerService = playerService;
        this.inningsRepository = inningsRepository;
    }

    public DeliveryResponse recordDelivery(DeliveryRequest request) {
        // Validate inputs
        Innings innings = inningsService.getInningsEntityById(request.getInningsId());
        Player batsman = playerService.getPlayerEntityById(request.getBatsmanId());
        Player bowler = playerService.getPlayerEntityById(request.getBowlerId());

        // Validate players belong to correct teams
        if (!batsman.getTeam().getId().equals(innings.getBattingTeam().getId())) {
            throw new IllegalArgumentException("Batsman does not belong to the batting team");
        }
        if (bowler.getTeam().getId().equals(innings.getBattingTeam().getId())) {
            throw new IllegalArgumentException("Bowler must belong to the fielding team");
        }

        // Calculate if delivery is legal
        boolean isLegalBall = isLegal(request.getExtraType());
        
        // Validate wickets don't exceed 10
        if (request.getWicket() && innings.getWickets() >= 10) {
            throw new IllegalArgumentException("Cannot record wicket - all batsmen are out");
        }

        // Calculate delivery runs
        int totalDeliveryRuns = request.getBatsmanRuns() + request.getExtras();

        // Determine over and ball number
        int totalBalls = innings.getTotalBalls();
        int ballNumber = (totalBalls % 6) + 1;
        int overNumber = totalBalls / 6;

        // Create delivery
        Delivery delivery = new Delivery(
                innings,
                overNumber,
                ballNumber,
                batsman,
                bowler,
                request.getBatsmanRuns(),
                request.getExtras(),
                totalDeliveryRuns,
                request.getExtraType(),
                request.getWicket(),
                request.getWicketType()
        );

        Delivery savedDelivery = deliveryRepository.save(delivery);

        // Update innings stats
        innings.setTotalRuns(innings.getTotalRuns() + totalDeliveryRuns);
        
        if (isLegalBall) {
            innings.setTotalBalls(innings.getTotalBalls() + 1);
        }

        if (request.getWicket()) {
            innings.setWickets(innings.getWickets() + 1);
        }

        inningsRepository.save(innings);

        return toResponse(savedDelivery);
    }

    public List<DeliveryResponse> getInningsDeliveries(Long inningsId) {
        return deliveryRepository.findByInningsId(inningsId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<DeliveryResponse> getRecentDeliveries(Long inningsId, int count) {
        return deliveryRepository.findRecentDeliveries(inningsId, PageRequest.of(0, count)).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public Delivery getDeliveryEntityById(Long id) {
        return deliveryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Delivery not found with id: " + id));
    }

    private boolean isLegal(String extraType) {
        if (extraType == null || extraType.isEmpty()) {
            return true; // Normal delivery is legal
        }
        
        return !extraType.equalsIgnoreCase("WIDE") && !extraType.equalsIgnoreCase("NO_BALL");
    }

    private DeliveryResponse toResponse(Delivery delivery) {
        return new DeliveryResponse(
                delivery.getId(),
                delivery.getInnings().getId(),
                delivery.getOverNumber(),
                delivery.getBallNumber(),
                delivery.getBatsman().getId(),
                delivery.getBatsman().getName(),
                delivery.getBowler().getId(),
                delivery.getBowler().getName(),
                delivery.getBatsmanRuns(),
                delivery.getExtras(),
                delivery.getTotalRuns(),
                delivery.getExtraType(),
                delivery.getWicket(),
                delivery.getWicketType()
        );
    }
}
