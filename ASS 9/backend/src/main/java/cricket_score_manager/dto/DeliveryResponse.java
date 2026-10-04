package cricket_score_manager.dto;

public class DeliveryResponse {

    private Long id;
    private Long inningsId;
    private Integer overNumber;
    private Integer ballNumber;
    private Long batsmanId;
    private String batsmanName;
    private Long bowlerId;
    private String bowlerName;
    private Integer batsmanRuns;
    private Integer extras;
    private Integer totalRuns;
    private String extraType;
    private Boolean wicket;
    private String wicketType;

    public DeliveryResponse() {
    }

    public DeliveryResponse(Long id, Long inningsId, Integer overNumber, Integer ballNumber,
                           Long batsmanId, String batsmanName, Long bowlerId, String bowlerName,
                           Integer batsmanRuns, Integer extras, Integer totalRuns, String extraType,
                           Boolean wicket, String wicketType) {
        this.id = id;
        this.inningsId = inningsId;
        this.overNumber = overNumber;
        this.ballNumber = ballNumber;
        this.batsmanId = batsmanId;
        this.batsmanName = batsmanName;
        this.bowlerId = bowlerId;
        this.bowlerName = bowlerName;
        this.batsmanRuns = batsmanRuns;
        this.extras = extras;
        this.totalRuns = totalRuns;
        this.extraType = extraType;
        this.wicket = wicket;
        this.wicketType = wicketType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getInningsId() {
        return inningsId;
    }

    public void setInningsId(Long inningsId) {
        this.inningsId = inningsId;
    }

    public Integer getOverNumber() {
        return overNumber;
    }

    public void setOverNumber(Integer overNumber) {
        this.overNumber = overNumber;
    }

    public Integer getBallNumber() {
        return ballNumber;
    }

    public void setBallNumber(Integer ballNumber) {
        this.ballNumber = ballNumber;
    }

    public Long getBatsmanId() {
        return batsmanId;
    }

    public void setBatsmanId(Long batsmanId) {
        this.batsmanId = batsmanId;
    }

    public String getBatsmanName() {
        return batsmanName;
    }

    public void setBatsmanName(String batsmanName) {
        this.batsmanName = batsmanName;
    }

    public Long getBowlerId() {
        return bowlerId;
    }

    public void setBowlerId(Long bowlerId) {
        this.bowlerId = bowlerId;
    }

    public String getBowlerName() {
        return bowlerName;
    }

    public void setBowlerName(String bowlerName) {
        this.bowlerName = bowlerName;
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

    public Integer getTotalRuns() {
        return totalRuns;
    }

    public void setTotalRuns(Integer totalRuns) {
        this.totalRuns = totalRuns;
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
