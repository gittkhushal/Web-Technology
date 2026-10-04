package cricket_score_manager.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "matches")
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team1_id", nullable = false)
    private Team team1;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team2_id", nullable = false)
    private Team team2;

    @Column(nullable = false)
    private String matchType;

    @Column(nullable = false)
    private String venue;

    @Column(nullable = false)
    private LocalDateTime matchDate;

    @Column(nullable = false)
    private String status;

    public Match() {
    }

    public Match(
            Team team1,
            Team team2,
            String matchType,
            String venue,
            LocalDateTime matchDate,
            String status
    ) {
        this.team1 = team1;
        this.team2 = team2;
        this.matchType = matchType;
        this.venue = venue;
        this.matchDate = matchDate;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public Team getTeam1() {
        return team1;
    }

    public Team getTeam2() {
        return team2;
    }

    public String getMatchType() {
        return matchType;
    }

    public String getVenue() {
        return venue;
    }

    public LocalDateTime getMatchDate() {
        return matchDate;
    }

    public String getStatus() {
        return status;
    }

    public void setTeam1(Team team1) {
        this.team1 = team1;
    }

    public void setTeam2(Team team2) {
        this.team2 = team2;
    }

    public void setMatchType(String matchType) {
        this.matchType = matchType;
    }

    public void setVenue(String venue) {
        this.venue = venue;
    }

    public void setMatchDate(LocalDateTime matchDate) {
        this.matchDate = matchDate;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}