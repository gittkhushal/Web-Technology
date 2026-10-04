package cricket_score_manager.service;

import cricket_score_manager.dto.BatsmanStatsResponse;
import cricket_score_manager.dto.BowlerStatsResponse;
import cricket_score_manager.entity.Delivery;
import cricket_score_manager.entity.Innings;
import org.springframework.stereotype.Service;
import cricket_score_manager.repository.DeliveryRepository;
import cricket_score_manager.repository.InningsRepository;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class StatisticsService {

    private final DeliveryRepository deliveryRepository;
    private final InningsRepository inningsRepository;
    private final InningsService inningsService;

    public StatisticsService(DeliveryRepository deliveryRepository, InningsRepository inningsRepository,
                           InningsService inningsService) {
        this.deliveryRepository = deliveryRepository;
        this.inningsRepository = inningsRepository;
        this.inningsService = inningsService;
    }

    public List<BatsmanStatsResponse> getBatsmanStats(Long inningsId) {
        Innings innings = inningsService.getInningsEntityById(inningsId);
        List<Delivery> deliveries = deliveryRepository.findByInningsId(inningsId);

        Map<Long, BatsmanStatData> statsMap = new HashMap<>();

        for (Delivery d : deliveries) {
            Long batsmanId = d.getBatsman().getId();
            statsMap.putIfAbsent(batsmanId, new BatsmanStatData(
                    d.getBatsman().getId(),
                    d.getBatsman().getName(),
                    d.getBatsman().getJerseyNumber()
            ));

            BatsmanStatData stats = statsMap.get(batsmanId);
            boolean isLegal = isLegalBall(d.getExtraType());

            if (isLegal) {
                stats.balls++;
            }

            stats.runs += d.getBatsmanRuns();

            if (d.getBatsmanRuns() == 4) stats.fours++;
            if (d.getBatsmanRuns() == 6) stats.sixes++;
        }

        return statsMap.values().stream()
                .map(data -> new BatsmanStatsResponse(
                        data.playerId,
                        data.playerName,
                        data.jerseyNumber,
                        data.runs,
                        data.balls,
                        data.fours,
                        data.sixes,
                        calculateStrikeRate(data.runs, data.balls)
                ))
                .collect(Collectors.toList());
    }

    public List<BowlerStatsResponse> getBowlerStats(Long inningsId) {
        Innings innings = inningsService.getInningsEntityById(inningsId);
        List<Delivery> deliveries = deliveryRepository.findByInningsId(inningsId);

        Map<Long, BowlerStatData> statsMap = new HashMap<>();

        for (Delivery d : deliveries) {
            Long bowlerId = d.getBowler().getId();
            statsMap.putIfAbsent(bowlerId, new BowlerStatData(
                    d.getBowler().getId(),
                    d.getBowler().getName(),
                    d.getBowler().getJerseyNumber()
            ));

            BowlerStatData stats = statsMap.get(bowlerId);
            boolean isLegal = isLegalBall(d.getExtraType());

            if (isLegal) {
                stats.ballsBowled++;
            }

            stats.runsConceded += d.getTotalRuns();

            if (d.getWicket()) {
                stats.wickets++;
            }
        }

        return statsMap.values().stream()
                .map(data -> new BowlerStatsResponse(
                        data.playerId,
                        data.playerName,
                        data.jerseyNumber,
                        calculateOvers(data.ballsBowled),
                        data.runsConceded,
                        data.wickets,
                        calculateEconomy(data.runsConceded, calculateOvers(data.ballsBowled))
                ))
                .collect(Collectors.toList());
    }

    private double calculateStrikeRate(int runs, int balls) {
        if (balls == 0) return 0.0;
        return (runs * 100.0) / balls;
    }

    private double calculateEconomy(int runs, double overs) {
        if (overs == 0) return 0.0;
        return runs / overs;
    }

    private double calculateOvers(int balls) {
        if (balls == 0) return 0.0;
        int completedOvers = balls / 6;
        int remainingBalls = balls % 6;
        return completedOvers + (remainingBalls / 10.0);
    }

    private boolean isLegalBall(String extraType) {
        if (extraType == null || extraType.isEmpty()) {
            return true;
        }
        return !extraType.equalsIgnoreCase("WIDE") && !extraType.equalsIgnoreCase("NO_BALL");
    }

    private static class BatsmanStatData {
        Long playerId;
        String playerName;
        Integer jerseyNumber;
        int runs = 0;
        int balls = 0;
        int fours = 0;
        int sixes = 0;

        BatsmanStatData(Long playerId, String playerName, Integer jerseyNumber) {
            this.playerId = playerId;
            this.playerName = playerName;
            this.jerseyNumber = jerseyNumber;
        }
    }

    private static class BowlerStatData {
        Long playerId;
        String playerName;
        Integer jerseyNumber;
        int ballsBowled = 0;
        int runsConceded = 0;
        int wickets = 0;

        BowlerStatData(Long playerId, String playerName, Integer jerseyNumber) {
            this.playerId = playerId;
            this.playerName = playerName;
            this.jerseyNumber = jerseyNumber;
        }
    }
}
