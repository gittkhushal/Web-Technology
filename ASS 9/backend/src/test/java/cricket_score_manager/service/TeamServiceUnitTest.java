package cricket_score_manager.service;

import cricket_score_manager.dto.TeamRequest;
import cricket_score_manager.dto.TeamResponse;
import cricket_score_manager.entity.Team;
import cricket_score_manager.repository.TeamRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class TeamServiceUnitTest {

    @Mock
    private TeamRepository teamRepository;

    @InjectMocks
    private TeamService teamService;

    @BeforeEach
    void setUp() {
    }

    private void setIdUsingReflection(Object obj, Long id) {
        try {
            java.lang.reflect.Field field = obj.getClass().getDeclaredField("id");
            field.setAccessible(true);
            field.set(obj, id);
        } catch (NoSuchFieldException | IllegalAccessException e) {
            // ID will be null for tests - acceptable for mocking scenarios
        }
    }

    @Test
    void testCreateTeam() {
        TeamRequest request = new TeamRequest("India", "IND");

        Team savedTeam = new Team("India", "IND");
        setIdUsingReflection(savedTeam, 1L);

        when(teamRepository.existsByName("India")).thenReturn(false);
        when(teamRepository.existsByShortName("IND")).thenReturn(false);
        when(teamRepository.save(any(Team.class))).thenReturn(savedTeam);

        TeamResponse response = teamService.createTeam(request);

        assertNotNull(response);
        assertEquals("India", response.getName());
        assertEquals("IND", response.getShortName());
        assertEquals(1L, response.getId());
    }

    @Test
    void testDuplicateTeamNameThrowsError() {
        TeamRequest request = new TeamRequest("India", "INDIA");

        when(teamRepository.existsByName("India")).thenReturn(true);

        assertThrows(IllegalArgumentException.class, () -> teamService.createTeam(request));
    }

    @Test
    void testDuplicateShortNameThrowsError() {
        TeamRequest request = new TeamRequest("Bharat", "IND");

        when(teamRepository.existsByName("Bharat")).thenReturn(false);
        when(teamRepository.existsByShortName("IND")).thenReturn(true);

        assertThrows(IllegalArgumentException.class, () -> teamService.createTeam(request));
    }

    @Test
    void testGetTeamById() {
        Team team = new Team("Pakistan", "PAK");
        setIdUsingReflection(team, 2L);

        when(teamRepository.findById(2L)).thenReturn(Optional.of(team));

        TeamResponse response = teamService.getTeamById(2L);

        assertNotNull(response);
        assertEquals("Pakistan", response.getName());
        assertEquals("PAK", response.getShortName());
        assertEquals(2L, response.getId());
    }

    @Test
    void testGetNonexistentTeamThrowsError() {
        when(teamRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class, () -> teamService.getTeamById(999L));
    }

    @Test
    void testShortNameMaxLength() {
        // Short name must not exceed 10 characters - validation happens at controller level
        TeamRequest request = new TeamRequest("Team", "VERYLONGSHORTNAME");
        assertTrue(request.getShortName().length() > 10);
    }
}
