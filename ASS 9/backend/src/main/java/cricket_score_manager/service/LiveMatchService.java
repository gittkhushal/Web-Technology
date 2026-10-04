package cricket_score_manager.service;

import cricket_score_manager.dto.LiveMatchResponse;
import cricket_score_manager.dto.InningsResponse;
import cricket_score_manager.dto.DeliveryResponse;
import cricket_score_manager.dto.BatsmanStatsResponse;
import cricket_score_manager.dto.BowlerStatsResponse;
import cricket_score_manager.entity.Match;
import cricket_score_manager.entity.Innings;
import cricket_score_manager.repository.InningsRepository;
import cricket_score_manager.repository.DeliveryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LiveMatchService {

    private final MatchService matchService;
    private final InningsService inningsService;
    private final ScoringService scoringService;
    private final StatisticsService statisticsService;
    private final InningsRepository inningsRepository;
    private final DeliveryRepository deliveryRepository;

    public LiveMatchService(MatchService matchService, InningsService inningsService,
                           ScoringService scoringService, StatisticsService statisticsService,
                           InningsRepository inningsRepository, DeliveryRepository deliveryRepository) {
        this.matchService = matchService;
        this.inningsService = inningsService;
        this.scoringService = scoringService;
        this.statisticsService = statisticsService;
        this.inningsRepository = inningsRepository;
        this.deliveryRepository = deliveryRepository;
    }

    public LiveMatchResponse getLiveMatchState(Long matchId) {
        Match match = matchService.getMatchEntityById(matchId);

        LiveMatchResponse response = new LiveMatchResponse();
        response.setMatchId(match.getId());
        response.setTeam1Name(match.getTeam1().getName());
        response.setTeam1ShortName(match.getTeam1().getShortName());
        response.setTeam2Name(match.getTeam2().getName());
        response.setTeam2ShortName(match.getTeam2().getShortName());
        response.setVenue(match.getVenue());
        response.setMatchType(match.getMatchType());
        response.setStatus(match.getStatus());

        // Get all innings for this match
        List<Innings> innings = inningsRepository.findByMatchIdOrderByInningsNumberAsc(matchId);
        response.setTotalInningsPlayed(innings.size());

        // Set current innings if available
        if (!innings.isEmpty()) {
            Innings currentInnings = innings.get(innings.size() - 1);
            InningsResponse inningsResponse = inningsService.getInningsById(currentInnings.getId());
            response.setCurrentInnings(inningsResponse);
            response.setInningsCount(innings.size());

            // Get team scores from innings
            if (currentInnings.getBattingTeam().getId().equals(match.getTeam1().getId())) {
                response.setTeam1Score(currentInnings.getTotalRuns());
                response.setTeam1Wickets(currentInnings.getWickets());
            } else {
                response.setTeam2Score(currentInnings.getTotalRuns());
                response.setTeam2Wickets(currentInnings.getWickets());
            }

            // Get other team score from previous innings if available
            if (innings.size() > 1) {
                Innings previousInnings = innings.get(innings.size() - 2);
                if (previousInnings.getBattingTeam().getId().equals(match.getTeam1().getId())) {
                    response.setTeam1Score(previousInnings.getTotalRuns());
                    response.setTeam1Wickets(previousInnings.getWickets());
                } else {
                    response.setTeam2Score(previousInnings.getTotalRuns());
                    response.setTeam2Wickets(previousInnings.getWickets());
                }
            }

            // Calculate run rate
            double overs = inningsResponse.getOvers();
            if (overs > 0) {
                response.setRunRate(inningsResponse.getTotalRuns() / overs);
            }

            // Generate commentary
            String commentary = generateCommentary(currentInnings);
            response.setCommentary(commentary);

            // Get recent deliveries
            List<DeliveryResponse> recentDeliveries = scoringService.getRecentDeliveries(currentInnings.getId(), 5);
            response.setRecentDeliveries(recentDeliveries);

            // Get statistics
            List<BatsmanStatsResponse> batsmanStats = statisticsService.getBatsmanStats(currentInnings.getId());
            response.setBatsmanStats(batsmanStats);

            List<BowlerStatsResponse> bowlerStats = statisticsService.getBowlerStats(currentInnings.getId());
            response.setBowlerStats(bowlerStats);
        }

        return response;
    }

    private String generateCommentary(Innings innings) {
        int totalRuns = innings.getTotalRuns();
        int wickets = innings.getWickets();
        double overs = calculateOvers(innings.getTotalBalls());

        if (wickets == 10) {
            return String.format("All Out! %s scored %d runs in %.1f overs", 
                    innings.getBattingTeam().getName(), totalRuns, overs);
        }

        return String.format("%s: %d/%d (%d balls, %.1f overs)", 
                innings.getBattingTeam().getShortName(), totalRuns, wickets, innings.getTotalBalls(), overs);
    }

    private double calculateOvers(Integer totalBalls) {
        if (totalBalls == null || totalBalls == 0) return 0.0;
        int completedOvers = totalBalls / 6;
        int remainingBalls = totalBalls % 6;
        return completedOvers + (remainingBalls / 10.0);
    }
}
