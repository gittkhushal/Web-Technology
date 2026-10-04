package cricket_score_manager.controller;

import cricket_score_manager.dto.MatchRequest;
import cricket_score_manager.dto.MatchResponse;
import cricket_score_manager.service.MatchService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/matches")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class MatchController {

    private final MatchService matchService;

    public MatchController(MatchService matchService) {
        this.matchService = matchService;
    }

    @PostMapping
    public ResponseEntity<MatchResponse> createMatch(@Valid @RequestBody MatchRequest request) {
        MatchResponse response = matchService.createMatch(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<MatchResponse>> getAllMatches() {
        List<MatchResponse> matches = matchService.getAllMatches();
        return ResponseEntity.ok(matches);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MatchResponse> getMatchById(@PathVariable Long id) {
        MatchResponse match = matchService.getMatchById(id);
        return ResponseEntity.ok(match);
    }

    @GetMapping(params = "status")
    public ResponseEntity<List<MatchResponse>> getMatchesByStatus(@RequestParam String status) {
        List<MatchResponse> matches = matchService.getMatchesByStatus(status);
        return ResponseEntity.ok(matches);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<MatchResponse> updateMatchStatus(@PathVariable Long id, @RequestParam String status) {
        MatchResponse response = matchService.updateMatchStatus(id, status);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMatch(@PathVariable Long id) {
        matchService.deleteMatch(id);
        return ResponseEntity.noContent().build();
    }
}
