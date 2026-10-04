package cricket_score_manager.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;

public class InningsRequest {

    @NotNull(message = "Match ID is required")
    private Long matchId;

    @NotNull(message = "Batting team ID is required")
    private Long battingTeamId;

    @NotNull(message = "Innings number is required")
    @Min(value = 1, message = "Innings number must be at least 1")
    private Integer inningsNumber;

    public InningsRequest() {
    }

    public InningsRequest(Long matchId, Long battingTeamId, Integer inningsNumber) {
        this.matchId = matchId;
        this.battingTeamId = battingTeamId;
        this.inningsNumber = inningsNumber;
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

    public Integer getInningsNumber() {
        return inningsNumber;
    }

    public void setInningsNumber(Integer inningsNumber) {
        this.inningsNumber = inningsNumber;
    }
}
