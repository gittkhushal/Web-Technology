package cricket_score_manager.controller;

import cricket_score_manager.dto.InningsRequest;
import cricket_score_manager.dto.InningsResponse;
import cricket_score_manager.service.InningsService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/innings")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class InningsController {

    private final InningsService inningsService;

    public InningsController(InningsService inningsService) {
        this.inningsService = inningsService;
    }

    @PostMapping
    public ResponseEntity<InningsResponse> createInnings(@Valid @RequestBody InningsRequest request) {
        InningsResponse response = inningsService.createInnings(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<InningsResponse> getInningsById(@PathVariable Long id) {
        InningsResponse innings = inningsService.getInningsById(id);
        return ResponseEntity.ok(innings);
    }

    @GetMapping("/match/{matchId}")
    public ResponseEntity<List<InningsResponse>> getInningsByMatchId(@PathVariable Long matchId) {
        List<InningsResponse> innings = inningsService.getInningsByMatchId(matchId);
        return ResponseEntity.ok(innings);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInnings(@PathVariable Long id) {
        inningsService.deleteInnings(id);
        return ResponseEntity.noContent().build();
    }
}
