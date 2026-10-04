package cricket_score_manager.dto;

import java.util.List;

public class LiveMatchResponse {

    private Long matchId;
    private String team1Name;
    private String team1ShortName;
    private String team2Name;
    private String team2ShortName;
    private String venue;
    private String matchType;
    private String status;
    
    private InningsResponse currentInnings;
    private Integer inningsCount;
    private Integer totalInningsPlayed;
    
    private Integer team1Score;
    private Integer team2Score;
    private Integer team1Wickets;
    private Integer team2Wickets;
    
    private Double runRate;
    private String commentary;
    
    private List<DeliveryResponse> recentDeliveries;
    private List<BatsmanStatsResponse> batsmanStats;
    private List<BowlerStatsResponse> bowlerStats;

    public LiveMatchResponse() {
    }

    // Getters and setters
    public Long getMatchId() {
        return matchId;
    }

    public void setMatchId(Long matchId) {
        this.matchId = matchId;
    }

    public String getTeam1Name() {
        return team1Name;
    }

    public void setTeam1Name(String team1Name) {
        this.team1Name = team1Name;
    }

    public String getTeam1ShortName() {
        return team1ShortName;
    }

    public void setTeam1ShortName(String team1ShortName) {
        this.team1ShortName = team1ShortName;
    }

    public String getTeam2Name() {
        return team2Name;
    }

    public void setTeam2Name(String team2Name) {
        this.team2Name = team2Name;
    }

    public String getTeam2ShortName() {
        return team2ShortName;
    }

    public void setTeam2ShortName(String team2ShortName) {
        this.team2ShortName = team2ShortName;
    }

    public String getVenue() {
        return venue;
    }

    public void setVenue(String venue) {
        this.venue = venue;
    }

    public String getMatchType() {
        return matchType;
    }

    public void setMatchType(String matchType) {
        this.matchType = matchType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public InningsResponse getCurrentInnings() {
        return currentInnings;
    }

    public void setCurrentInnings(InningsResponse currentInnings) {
        this.currentInnings = currentInnings;
    }

    public Integer getInningsCount() {
        return inningsCount;
    }

    public void setInningsCount(Integer inningsCount) {
        this.inningsCount = inningsCount;
    }

    public Integer getTotalInningsPlayed() {
        return totalInningsPlayed;
    }

    public void setTotalInningsPlayed(Integer totalInningsPlayed) {
        this.totalInningsPlayed = totalInningsPlayed;
    }

    public Integer getTeam1Score() {
        return team1Score;
    }

    public void setTeam1Score(Integer team1Score) {
        this.team1Score = team1Score;
    }

    public Integer getTeam2Score() {
        return team2Score;
    }

    public void setTeam2Score(Integer team2Score) {
        this.team2Score = team2Score;
    }

    public Integer getTeam1Wickets() {
        return team1Wickets;
    }

    public void setTeam1Wickets(Integer team1Wickets) {
        this.team1Wickets = team1Wickets;
    }

    public Integer getTeam2Wickets() {
        return team2Wickets;
    }

    public void setTeam2Wickets(Integer team2Wickets) {
        this.team2Wickets = team2Wickets;
    }

    public Double getRunRate() {
        return runRate;
    }

    public void setRunRate(Double runRate) {
        this.runRate = runRate;
    }

    public String getCommentary() {
        return commentary;
    }

    public void setCommentary(String commentary) {
        this.commentary = commentary;
    }

    public List<DeliveryResponse> getRecentDeliveries() {
        return recentDeliveries;
    }

    public void setRecentDeliveries(List<DeliveryResponse> recentDeliveries) {
        this.recentDeliveries = recentDeliveries;
    }

    public List<BatsmanStatsResponse> getBatsmanStats() {
        return batsmanStats;
    }

    public void setBatsmanStats(List<BatsmanStatsResponse> batsmanStats) {
        this.batsmanStats = batsmanStats;
    }

    public List<BowlerStatsResponse> getBowlerStats() {
        return bowlerStats;
    }

    public void setBowlerStats(List<BowlerStatsResponse> bowlerStats) {
        this.bowlerStats = bowlerStats;
    }
}
