package cricket_score_manager.repository;

import cricket_score_manager.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<Team, Long> {

    boolean existsByName(String name);

    boolean existsByShortName(String shortName);
}