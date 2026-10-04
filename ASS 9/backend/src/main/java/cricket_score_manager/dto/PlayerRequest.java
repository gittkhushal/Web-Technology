package cricket_score_manager.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;

public class PlayerRequest {

    @NotBlank(message = "Player name is required")
    private String name;

    @NotBlank(message = "Role is required")
    private String role;

    @NotNull(message = "Jersey number is required")
    @Min(value = 1, message = "Jersey number must be at least 1")
    @Max(value = 99, message = "Jersey number must not exceed 99")
    private Integer jerseyNumber;

    @NotNull(message = "Team ID is required")
    private Long teamId;

    public PlayerRequest() {
    }

    public PlayerRequest(String name, String role, Integer jerseyNumber, Long teamId) {
        this.name = name;
        this.role = role;
        this.jerseyNumber = jerseyNumber;
        this.teamId = teamId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Integer getJerseyNumber() {
        return jerseyNumber;
    }

    public void setJerseyNumber(Integer jerseyNumber) {
        this.jerseyNumber = jerseyNumber;
    }

    public Long getTeamId() {
        return teamId;
    }

    public void setTeamId(Long teamId) {
        this.teamId = teamId;
    }
}
