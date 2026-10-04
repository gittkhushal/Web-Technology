package cricket_score_manager.repository;

import cricket_score_manager.entity.Delivery;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface DeliveryRepository extends JpaRepository<Delivery, Long> {

    List<Delivery> findByInningsId(Long inningsId);

    @Query(value = "SELECT * FROM deliveries WHERE innings_id = ?1 ORDER BY id DESC LIMIT ?2", nativeQuery = true)
    List<Delivery> findRecentDeliveries(Long inningsId, Pageable pageable);
}
