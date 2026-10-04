package cricket_score_manager.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;

public class DeliveryRequest {

    @NotNull(message = "Innings ID is required")
    private Long inningsId;

    @NotNull(message = "Batsman ID is required")
    private Long batsmanId;

    @NotNull(message = "Bowler ID is required")
    private Long bowlerId;

    @NotNull(message = "Batsman runs is required")
    @Min(value = 0, message = "Batsman runs cannot be negative")
    @Max(value = 6, message = "Batsman runs cannot exceed 6")
    private Integer batsmanRuns;

    @NotNull(message = "Extras is required")
    @Min(value = 0, message = "Extras cannot be negative")
    private Integer extras;

    private String extraType;

    private Boolean wicket = false;

    private String wicketType;

    public DeliveryRequest() {
    }

    public DeliveryRequest(Long inningsId, Long batsmanId, Long bowlerId, Integer batsmanRuns,
                          Integer extras, String extraType, Boolean wicket, String wicketType) {
        this.inningsId = inningsId;
        this.batsmanId = batsmanId;
        this.bowlerId = bowlerId;
        this.batsmanRuns = batsmanRuns;
        this.extras = extras;
        this.extraType = extraType;
        this.wicket = wicket;
        this.wicketType = wicketType;
    }

    public Long getInningsId() {
        return inningsId;
    }

    public void setInningsId(Long inningsId) {
        this.inningsId = inningsId;
    }

    public Long getBatsmanId() {
        return batsmanId;
    }

    public void setBatsmanId(Long batsmanId) {
        this.batsmanId = batsmanId;
    }

    public Long getBowlerId() {
        return bowlerId;
    }

    public void setBowlerId(Long bowlerId) {
        this.bowlerId = bowlerId;
    }

    public Integer getBatsmanRuns() {
        return batsmanRuns;
    }

    public void setBatsmanRuns(Integer batsmanRuns) {
        this.batsmanRuns = batsmanRuns;
    }

    public Integer getExtras() {
        return extras;
    }

    public void setExtras(Integer extras) {
        this.extras = extras;
    }

    public String getExtraType() {
        return extraType;
    }

    public void setExtraType(String extraType) {
        this.extraType = extraType;
    }

    public Boolean getWicket() {
        return wicket;
    }

    public void setWicket(Boolean wicket) {
        this.wicket = wicket;
    }

    public String getWicketType() {
        return wicketType;
    }

    public void setWicketType(String wicketType) {
        this.wicketType = wicketType;
    }
}
