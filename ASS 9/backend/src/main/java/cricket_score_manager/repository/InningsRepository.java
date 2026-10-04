package cricket_score_manager.repository;

import cricket_score_manager.entity.Innings;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InningsRepository extends JpaRepository<Innings, Long> {

    List<Innings> findByMatchId(Long matchId);

    List<Innings> findByMatchIdOrderByInningsNumberAsc(Long matchId);
}