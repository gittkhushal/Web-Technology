package cricket_score_manager.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "innings")
public class Innings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "match_id", nullable = false)
    private Match match;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "batting_team_id", nullable = false)
    private Team battingTeam;

    @Column(nullable = false)
    private Integer inningsNumber;

    @Column(nullable = false)
    private Integer totalRuns = 0;

    @Column(nullable = false)
    private Integer wickets = 0;

    @Column(nullable = false)
    private Integer totalBalls = 0;

    public Innings() {
    }

    public Innings(
            Match match,
            Team battingTeam,
            Integer inningsNumber
    ) {
        this.match = match;
        this.battingTeam = battingTeam;
        this.inningsNumber = inningsNumber;
        this.totalRuns = 0;
        this.wickets = 0;
        this.totalBalls = 0;
    }

    public Long getId() {
        return id;
    }

    public Match getMatch() {
        return match;
    }

    public Team getBattingTeam() {
        return battingTeam;
    }

    public Integer getInningsNumber() {
        return inningsNumber;
    }

    public Integer getTotalRuns() {
        return totalRuns;
    }

    public Integer getWickets() {
        return wickets;
    }

    public Integer getTotalBalls() {
        return totalBalls;
    }

    public void setMatch(Match match) {
        this.match = match;
    }

    public void setBattingTeam(Team battingTeam) {
        this.battingTeam = battingTeam;
    }

    public void setInningsNumber(Integer inningsNumber) {
        this.inningsNumber = inningsNumber;
    }

    public void setTotalRuns(Integer totalRuns) {
        this.totalRuns = totalRuns;
    }

    public void setWickets(Integer wickets) {
        this.wickets = wickets;
    }

    public void setTotalBalls(Integer totalBalls) {
        this.totalBalls = totalBalls;
    }
}