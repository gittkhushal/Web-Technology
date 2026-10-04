package cricket_score_manager.dto;

public class BowlerStatsResponse {

    private Long playerId;
    private String playerName;
    private Integer jerseyNumber;
    private Double overs;
    private Integer runsConceded;
    private Integer wickets;
    private Double economy;

    public BowlerStatsResponse() {
    }

    public BowlerStatsResponse(Long playerId, String playerName, Integer jerseyNumber,
                              Double overs, Integer runsConceded, Integer wickets, Double economy) {
        this.playerId = playerId;
        this.playerName = playerName;
        this.jerseyNumber = jerseyNumber;
        this.overs = overs;
        this.runsConceded = runsConceded;
        this.wickets = wickets;
        this.economy = economy;
    }

    public Long getPlayerId() {
        return playerId;
    }

    public void setPlayerId(Long playerId) {
        this.playerId = playerId;
    }

    public String getPlayerName() {
        return playerName;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    public Integer getJerseyNumber() {
        return jerseyNumber;
    }

    public void setJerseyNumber(Integer jerseyNumber) {
        this.jerseyNumber = jerseyNumber;
    }

    public Double getOvers() {
        return overs;
    }

    public void setOvers(Double overs) {
        this.overs = overs;
    }

    public Integer getRunsConceded() {
        return runsConceded;
    }

    public void setRunsConceded(Integer runsConceded) {
        this.runsConceded = runsConceded;
    }

    public Integer getWickets() {
        return wickets;
    }

    public void setWickets(Integer wickets) {
        this.wickets = wickets;
    }

    public Double getEconomy() {
        return economy;
    }

    public void setEconomy(Double economy) {
        this.economy = economy;
    }
}
