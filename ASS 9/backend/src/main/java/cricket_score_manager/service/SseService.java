package cricket_score_manager.service;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import java.io.IOException;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class SseService {

    private final Map<Long, List<SseEmitter>> matchEmitters = new ConcurrentHashMap<>();

    public SseEmitter subscribe(Long matchId) {
        SseEmitter emitter = new SseEmitter(300000L); // 5 minute timeout

        matchEmitters.computeIfAbsent(matchId, k -> Collections.synchronizedList(new ArrayList<>()))
                .add(emitter);

        // Handle client disconnect
        emitter.onCompletion(() -> removeEmitter(matchId, emitter));
        emitter.onTimeout(() -> removeEmitter(matchId, emitter));
        emitter.onError(throwable -> removeEmitter(matchId, emitter));

        return emitter;
    }

    public void broadcast(Long matchId, Object data) {
        List<SseEmitter> emitters = matchEmitters.get(matchId);
        if (emitters == null || emitters.isEmpty()) {
            return;
        }

        List<SseEmitter> failedEmitters = new ArrayList<>();

        for (SseEmitter emitter : emitters) {
            try {
                SseEmitter.SseEventBuilder event = SseEmitter.event()
                        .id(UUID.randomUUID().toString())
                        .name("score-update")
                        .data(data)
                        .reconnectTime(5000);

                emitter.send(event);
            } catch (IOException e) {
                failedEmitters.add(emitter);
            }
        }

        // Remove failed emitters
        failedEmitters.forEach(emitter -> removeEmitter(matchId, emitter));
    }

    private void removeEmitter(Long matchId, SseEmitter emitter) {
        List<SseEmitter> emitters = matchEmitters.get(matchId);
        if (emitters != null) {
            emitters.remove(emitter);
            if (emitters.isEmpty()) {
                matchEmitters.remove(matchId);
            }
        }
    }

    public int getConnectedClientsCount(Long matchId) {
        List<SseEmitter> emitters = matchEmitters.get(matchId);
        return emitters != null ? emitters.size() : 0;
    }
}
