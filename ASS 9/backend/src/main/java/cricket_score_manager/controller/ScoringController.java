package cricket_score_manager.controller;

import cricket_score_manager.dto.DeliveryRequest;
import cricket_score_manager.dto.DeliveryResponse;
import cricket_score_manager.service.ScoringService;
import cricket_score_manager.service.SseService;
import cricket_score_manager.service.LiveMatchService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/deliveries")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class ScoringController {

    private final ScoringService scoringService;
    private final SseService sseService;
    private final LiveMatchService liveMatchService;

    public ScoringController(ScoringService scoringService, SseService sseService, LiveMatchService liveMatchService) {
        this.scoringService = scoringService;
        this.sseService = sseService;
        this.liveMatchService = liveMatchService;
    }

    @PostMapping
    public ResponseEntity<DeliveryResponse> recordDelivery(@Valid @RequestBody DeliveryRequest request) {
        DeliveryResponse response = scoringService.recordDelivery(request);
        
        // Broadcast update to SSE clients
        Long matchId = scoringService.getDeliveryEntityById(response.getId()).getInnings().getMatch().getId();
        var liveMatch = liveMatchService.getLiveMatchState(matchId);
        sseService.broadcast(matchId, liveMatch);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/innings/{inningsId}")
    public ResponseEntity<List<DeliveryResponse>> getInningsDeliveries(@PathVariable Long inningsId) {
        List<DeliveryResponse> deliveries = scoringService.getInningsDeliveries(inningsId);
        return ResponseEntity.ok(deliveries);
    }

    @GetMapping("/innings/{inningsId}/recent")
    public ResponseEntity<List<DeliveryResponse>> getRecentDeliveries(
            @PathVariable Long inningsId,
            @RequestParam(defaultValue = "10") int count) {
        List<DeliveryResponse> deliveries = scoringService.getRecentDeliveries(inningsId, count);
        return ResponseEntity.ok(deliveries);
    }
}
