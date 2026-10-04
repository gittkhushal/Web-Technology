package cricket_score_manager.dto;

public class PlayerResponse {

    private Long id;
    private String name;
    private String role;
    private Integer jerseyNumber;
    private Long teamId;
    private String teamName;

    public PlayerResponse() {
    }

    public PlayerResponse(Long id, String name, String role, Integer jerseyNumber, Long teamId, String teamName) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.jerseyNumber = jerseyNumber;
        this.teamId = teamId;
        this.teamName = teamName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }
}
