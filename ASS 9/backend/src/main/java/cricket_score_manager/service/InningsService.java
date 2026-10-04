package cricket_score_manager.service;

import cricket_score_manager.dto.InningsRequest;
import cricket_score_manager.dto.InningsResponse;
import cricket_score_manager.entity.Innings;
import cricket_score_manager.entity.Match;
import cricket_score_manager.entity.Team;
import cricket_score_manager.repository.InningsRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InningsService {

    private final InningsRepository inningsRepository;
    private final MatchService matchService;
    private final TeamService teamService;

    public InningsService(InningsRepository inningsRepository, MatchService matchService, TeamService teamService) {
        this.inningsRepository = inningsRepository;
        this.matchService = matchService;
        this.teamService = teamService;
    }

    public InningsResponse createInnings(InningsRequest request) {
        Match match = matchService.getMatchEntityById(request.getMatchId());
        Team battingTeam = teamService.getTeamEntityById(request.getBattingTeamId());

        // Validate that batting team is one of the match teams
        if (!battingTeam.getId().equals(match.getTeam1().getId()) && 
            !battingTeam.getId().equals(match.getTeam2().getId())) {
            throw new IllegalArgumentException("Batting team must be one of the teams in the match");
        }

        Innings innings = new Innings(match, battingTeam, request.getInningsNumber());
        Innings savedInnings = inningsRepository.save(innings);
        return toResponse(savedInnings);
    }

    public List<InningsResponse> getInningsByMatchId(Long matchId) {
        matchService.getMatchEntityById(matchId); // Validate match exists
        return inningsRepository.findByMatchIdOrderByInningsNumberAsc(matchId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public InningsResponse getInningsById(Long id) {
        Innings innings = inningsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Innings not found with id: " + id));
        return toResponse(innings);
    }

    public Innings getInningsEntityById(Long id) {
        return inningsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Innings not found with id: " + id));
    }

    public void deleteInnings(Long id) {
        if (!inningsRepository.existsById(id)) {
            throw new IllegalArgumentException("Innings not found with id: " + id);
        }
        inningsRepository.deleteById(id);
    }

    private InningsResponse toResponse(Innings innings) {
        double overs = calculateOvers(innings.getTotalBalls());
        return new InningsResponse(
                innings.getId(),
                innings.getMatch().getId(),
                innings.getBattingTeam().getId(),
                innings.getBattingTeam().getName(),
                innings.getInningsNumber(),
                innings.getTotalRuns(),
                innings.getWickets(),
                innings.getTotalBalls(),
                overs
        );
    }

    private double calculateOvers(Integer totalBalls) {
        if (totalBalls == null || totalBalls == 0) return 0.0;
        int completedOvers = totalBalls / 6;
        int remainingBalls = totalBalls % 6;
        return completedOvers + (remainingBalls / 10.0);
    }
}
