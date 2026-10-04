package cricket_score_manager.dto;

public class InningsResponse {

    private Long id;
    private Long matchId;
    private Long battingTeamId;
    private String battingTeamName;
    private Integer inningsNumber;
    private Integer totalRuns;
    private Integer wickets;
    private Integer totalBalls;
    private Double overs;

    public InningsResponse() {
    }

    public InningsResponse(Long id, Long matchId, Long battingTeamId, String battingTeamName,
                          Integer inningsNumber, Integer totalRuns, Integer wickets, Integer totalBalls, Double overs) {
        this.id = id;
        this.matchId = matchId;
        this.battingTeamId = battingTeamId;
        this.battingTeamName = battingTeamName;
        this.inningsNumber = inningsNumber;
        this.totalRuns = totalRuns;
        this.wickets = wickets;
        this.totalBalls = totalBalls;
        this.overs = overs;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getMatchId() {
        return matchId;
    }

    public void setMatchId(Long matchId) {
        this.matchId = matchId;
    }

    public Long getBattingTeamId() {
        return battingTeamId;
    }

    public void setBattingTeamId(Long battingTeamId) {
        this.battingTeamId = battingTeamId;
    }

    public String getBattingTeamName() {
        return battingTeamName;
    }

    public void setBattingTeamName(String battingTeamName) {
        this.battingTeamName = battingTeamName;
    }

    public Integer getInningsNumber() {
        return inningsNumber;
    }

    public void setInningsNumber(Integer inningsNumber) {
        this.inningsNumber = inningsNumber;
    }

    public Integer getTotalRuns() {
        return totalRuns;
    }

    public void setTotalRuns(Integer totalRuns) {
        this.totalRuns = totalRuns;
    }

    public Integer getWickets() {
        return wickets;
    }

    public void setWickets(Integer wickets) {
        this.wickets = wickets;
    }

    public Integer getTotalBalls() {
        return totalBalls;
    }

    public void setTotalBalls(Integer totalBalls) {
        this.totalBalls = totalBalls;
    }

    public Double getOvers() {
        return overs;
    }

    public void setOvers(Double overs) {
        this.overs = overs;
    }
}
