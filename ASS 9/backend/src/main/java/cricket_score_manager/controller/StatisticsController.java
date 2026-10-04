package cricket_score_manager.controller;

import cricket_score_manager.dto.BatsmanStatsResponse;
import cricket_score_manager.dto.BowlerStatsResponse;
import cricket_score_manager.service.StatisticsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/statistics")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class StatisticsController {

    private final StatisticsService statisticsService;

    public StatisticsController(StatisticsService statisticsService) {
        this.statisticsService = statisticsService;
    }

    @GetMapping("/batsmen/innings/{inningsId}")
    public ResponseEntity<List<BatsmanStatsResponse>> getBatsmanStats(@PathVariable Long inningsId) {
        List<BatsmanStatsResponse> stats = statisticsService.getBatsmanStats(inningsId);
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/bowlers/innings/{inningsId}")
    public ResponseEntity<List<BowlerStatsResponse>> getBowlerStats(@PathVariable Long inningsId) {
        List<BowlerStatsResponse> stats = statisticsService.getBowlerStats(inningsId);
        return ResponseEntity.ok(stats);
    }
}
