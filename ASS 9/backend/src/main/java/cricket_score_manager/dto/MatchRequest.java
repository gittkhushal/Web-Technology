package cricket_score_manager.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class MatchRequest {

    @NotNull(message = "Team 1 ID is required")
    private Long team1Id;

    @NotNull(message = "Team 2 ID is required")
    private Long team2Id;

    @NotBlank(message = "Match type is required")
    private String matchType;

    @NotBlank(message = "Venue is required")
    private String venue;

    @NotNull(message = "Match date is required")
    private LocalDateTime matchDate;

    @NotBlank(message = "Status is required")
    private String status;

    public MatchRequest() {
    }

    public MatchRequest(Long team1Id, Long team2Id, String matchType, String venue, LocalDateTime matchDate, String status) {
        this.team1Id = team1Id;
        this.team2Id = team2Id;
        this.matchType = matchType;
        this.venue = venue;
        this.matchDate = matchDate;
        this.status = status;
    }

    public Long getTeam1Id() {
        return team1Id;
    }

    public void setTeam1Id(Long team1Id) {
        this.team1Id = team1Id;
    }

    public Long getTeam2Id() {
        return team2Id;
    }

    public void setTeam2Id(Long team2Id) {
        this.team2Id = team2Id;
    }

    public String getMatchType() {
        return matchType;
    }

    public void setMatchType(String matchType) {
        this.matchType = matchType;
    }

    public String getVenue() {
        return venue;
    }

    public void setVenue(String venue) {
        this.venue = venue;
    }

    public LocalDateTime getMatchDate() {
        return matchDate;
    }

    public void setMatchDate(LocalDateTime matchDate) {
        this.matchDate = matchDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
