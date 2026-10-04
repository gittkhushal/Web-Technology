package cricket_score_manager.dto;

import java.time.LocalDateTime;

public class MatchResponse {

    private Long id;
    private Long team1Id;
    private String team1Name;
    private Long team2Id;
    private String team2Name;
    private String matchType;
    private String venue;
    private LocalDateTime matchDate;
    private String status;

    public MatchResponse() {
    }

    public MatchResponse(Long id, Long team1Id, String team1Name, Long team2Id, String team2Name,
                         String matchType, String venue, LocalDateTime matchDate, String status) {
        this.id = id;
        this.team1Id = team1Id;
        this.team1Name = team1Name;
        this.team2Id = team2Id;
        this.team2Name = team2Name;
        this.matchType = matchType;
        this.venue = venue;
        this.matchDate = matchDate;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTeam1Id() {
        return team1Id;
    }

    public void setTeam1Id(Long team1Id) {
        this.team1Id = team1Id;
    }

    public String getTeam1Name() {
        return team1Name;
    }

    public void setTeam1Name(String team1Name) {
        this.team1Name = team1Name;
    }

    public Long getTeam2Id() {
        return team2Id;
    }

    public void setTeam2Id(Long team2Id) {
        this.team2Id = team2Id;
    }

    public String getTeam2Name() {
        return team2Name;
    }

    public void setTeam2Name(String team2Name) {
        this.team2Name = team2Name;
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
