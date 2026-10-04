package cricket_score_manager.controller;

import cricket_score_manager.dto.LiveMatchResponse;
import cricket_score_manager.service.LiveMatchService;
import cricket_score_manager.service.SseService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/api/matches")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class LiveMatchController {

    private final LiveMatchService liveMatchService;
    private final SseService sseService;

    public LiveMatchController(LiveMatchService liveMatchService, SseService sseService) {
        this.liveMatchService = liveMatchService;
        this.sseService = sseService;
    }

    @GetMapping("/{matchId}/live")
    public ResponseEntity<LiveMatchResponse> getLiveMatchState(@PathVariable Long matchId) {
        LiveMatchResponse response = liveMatchService.getLiveMatchState(matchId);
        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/{matchId}/events", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribeToMatchEvents(@PathVariable Long matchId) {
        return sseService.subscribe(matchId);
    }
}
