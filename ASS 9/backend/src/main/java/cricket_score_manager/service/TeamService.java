package cricket_score_manager.service;

import cricket_score_manager.dto.TeamRequest;
import cricket_score_manager.dto.TeamResponse;
import cricket_score_manager.entity.Team;
import cricket_score_manager.repository.TeamRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TeamService {

    private final TeamRepository teamRepository;

    public TeamService(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    public TeamResponse createTeam(TeamRequest request) {
        if (teamRepository.existsByName(request.getName())) {
            throw new IllegalArgumentException("Team with name '" + request.getName() + "' already exists");
        }
        if (teamRepository.existsByShortName(request.getShortName())) {
            throw new IllegalArgumentException("Team with short name '" + request.getShortName() + "' already exists");
        }

        Team team = new Team(request.getName(), request.getShortName());
        Team savedTeam = teamRepository.save(team);
        return toResponse(savedTeam);
    }

    public List<TeamResponse> getAllTeams() {
        return teamRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public TeamResponse getTeamById(Long id) {
        Team team = teamRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Team not found with id: " + id));
        return toResponse(team);
    }

    public void deleteTeam(Long id) {
        if (!teamRepository.existsById(id)) {
            throw new IllegalArgumentException("Team not found with id: " + id);
        }
        teamRepository.deleteById(id);
    }

    public Team getTeamEntityById(Long id) {
        return teamRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Team not found with id: " + id));
    }

    private TeamResponse toResponse(Team team) {
        return new TeamResponse(team.getId(), team.getName(), team.getShortName());
    }
}
