package cricket_score_manager.service;

import cricket_score_manager.dto.PlayerRequest;
import cricket_score_manager.dto.PlayerResponse;
import cricket_score_manager.entity.Player;
import cricket_score_manager.entity.Team;
import cricket_score_manager.repository.PlayerRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlayerService {

    private final PlayerRepository playerRepository;
    private final TeamService teamService;

    public PlayerService(PlayerRepository playerRepository, TeamService teamService) {
        this.playerRepository = playerRepository;
        this.teamService = teamService;
    }

    public PlayerResponse createPlayer(PlayerRequest request) {
        Team team = teamService.getTeamEntityById(request.getTeamId());

        Player player = new Player(
                request.getName(),
                request.getRole(),
                request.getJerseyNumber(),
                team
        );

        Player savedPlayer = playerRepository.save(player);
        return toResponse(savedPlayer);
    }

    public List<PlayerResponse> getAllPlayers() {
        return playerRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public PlayerResponse getPlayerById(Long id) {
        Player player = playerRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Player not found with id: " + id));
        return toResponse(player);
    }

    public List<PlayerResponse> getPlayersByTeamId(Long teamId) {
        teamService.getTeamEntityById(teamId); // Validate team exists
        return playerRepository.findByTeamId(teamId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public void deletePlayer(Long id) {
        if (!playerRepository.existsById(id)) {
            throw new IllegalArgumentException("Player not found with id: " + id);
        }
        playerRepository.deleteById(id);
    }

    public Player getPlayerEntityById(Long id) {
        return playerRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Player not found with id: " + id));
    }

    private PlayerResponse toResponse(Player player) {
        return new PlayerResponse(
                player.getId(),
                player.getName(),
                player.getRole(),
                player.getJerseyNumber(),
                player.getTeam().getId(),
                player.getTeam().getName()
        );
    }
}
