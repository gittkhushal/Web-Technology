package cricket_score_manager.service;

import cricket_score_manager.dto.MatchRequest;
import cricket_score_manager.dto.MatchResponse;
import cricket_score_manager.entity.Match;
import cricket_score_manager.entity.Team;
import cricket_score_manager.repository.MatchRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MatchService {

    private final MatchRepository matchRepository;
    private final TeamService teamService;

    public MatchService(MatchRepository matchRepository, TeamService teamService) {
        this.matchRepository = matchRepository;
        this.teamService = teamService;
    }

    public MatchResponse createMatch(MatchRequest request) {
        Team team1 = teamService.getTeamEntityById(request.getTeam1Id());
        Team team2 = teamService.getTeamEntityById(request.getTeam2Id());

        if (team1.getId().equals(team2.getId())) {
            throw new IllegalArgumentException("Team 1 and Team 2 cannot be the same team");
        }

        Match match = new Match(
                team1,
                team2,
                request.getMatchType(),
                request.getVenue(),
                request.getMatchDate(),
                request.getStatus()
        );

        Match savedMatch = matchRepository.save(match);
        return toResponse(savedMatch);
    }

    public List<MatchResponse> getAllMatches() {
        return matchRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public MatchResponse getMatchById(Long id) {
        Match match = matchRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Match not found with id: " + id));
        return toResponse(match);
    }

    public List<MatchResponse> getMatchesByStatus(String status) {
        return matchRepository.findByStatus(status).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public MatchResponse updateMatchStatus(Long id, String status) {
        Match match = matchRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Match not found with id: " + id));
        match.setStatus(status);
        Match updatedMatch = matchRepository.save(match);
        return toResponse(updatedMatch);
    }

    public void deleteMatch(Long id) {
        if (!matchRepository.existsById(id)) {
            throw new IllegalArgumentException("Match not found with id: " + id);
        }
        matchRepository.deleteById(id);
    }

    public Match getMatchEntityById(Long id) {
        return matchRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Match not found with id: " + id));
    }

    private MatchResponse toResponse(Match match) {
        return new MatchResponse(
                match.getId(),
                match.getTeam1().getId(),
                match.getTeam1().getName(),
                match.getTeam2().getId(),
                match.getTeam2().getName(),
                match.getMatchType(),
                match.getVenue(),
                match.getMatchDate(),
                match.getStatus()
        );
    }
}
