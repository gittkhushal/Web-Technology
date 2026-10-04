package cricket_score_manager.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "deliveries")
public class Delivery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "innings_id", nullable = false)
    private Innings innings;

    @Column(nullable = false)
    private Integer overNumber;

    @Column(nullable = false)
    private Integer ballNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "batsman_id", nullable = false)
    private Player batsman;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bowler_id", nullable = false)
    private Player bowler;

    @Column(nullable = false)
    private Integer batsmanRuns = 0;

    @Column(nullable = false)
    private Integer extras = 0;

    @Column(nullable = false)
    private Integer totalRuns = 0;

    @Column(nullable = false)
    private String extraType;

    @Column(nullable = false)
    private Boolean wicket = false;

    private String wicketType;

    public Delivery() {
    }

    public Delivery(
            Innings innings,
            Integer overNumber,
            Integer ballNumber,
            Player batsman,
            Player bowler,
            Integer batsmanRuns,
            Integer extras,
            Integer totalRuns,
            String extraType,
            Boolean wicket,
            String wicketType
    ) {
        this.innings = innings;
        this.overNumber = overNumber;
        this.ballNumber = ballNumber;
        this.batsman = batsman;
        this.bowler = bowler;
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

    public Innings getInnings() {
        return innings;
    }

    public Integer getOverNumber() {
        return overNumber;
    }

    public Integer getBallNumber() {
        return ballNumber;
    }

    public Player getBatsman() {
        return batsman;
    }

    public Player getBowler() {
        return bowler;
    }

    public Integer getBatsmanRuns() {
        return batsmanRuns;
    }

    public Integer getExtras() {
        return extras;
    }

    public Integer getTotalRuns() {
        return totalRuns;
    }

    public String getExtraType() {
        return extraType;
    }

    public Boolean getWicket() {
        return wicket;
    }

    public String getWicketType() {
        return wicketType;
    }

    public void setInnings(Innings innings) {
        this.innings = innings;
    }

    public void setOverNumber(Integer overNumber) {
        this.overNumber = overNumber;
    }

    public void setBallNumber(Integer ballNumber) {
        this.ballNumber = ballNumber;
    }

    public void setBatsman(Player batsman) {
        this.batsman = batsman;
    }

    public void setBowler(Player bowler) {
        this.bowler = bowler;
    }

    public void setBatsmanRuns(Integer batsmanRuns) {
        this.batsmanRuns = batsmanRuns;
    }

    public void setExtras(Integer extras) {
        this.extras = extras;
    }

    public void setTotalRuns(Integer totalRuns) {
        this.totalRuns = totalRuns;
    }

    public void setExtraType(String extraType) {
        this.extraType = extraType;
    }

    public void setWicket(Boolean wicket) {
        this.wicket = wicket;
    }

    public void setWicketType(String wicketType) {
        this.wicketType = wicketType;
    }
}