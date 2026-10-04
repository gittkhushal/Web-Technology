package cricket_score_manager.service;

import cricket_score_manager.dto.DeliveryRequest;
import cricket_score_manager.dto.DeliveryResponse;
import cricket_score_manager.entity.*;
import cricket_score_manager.repository.DeliveryRepository;
import cricket_score_manager.repository.InningsRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ScoringServiceUnitTest {

    @Mock
    private DeliveryRepository deliveryRepository;

    @Mock
    private InningsService inningsService;

    @Mock
    private PlayerService playerService;

    @Mock
    private InningsRepository inningsRepository;

    @InjectMocks
    private ScoringService scoringService;

    private Team team1, team2;
    private Player batsman, bowler;
    private Match match;
    private Innings innings;

    @BeforeEach
    void setUp() {
        // Create teams (IDs will be assigned by JPA in real scenarios)
        team1 = new Team("Team A", "TA");
        team2 = new Team("Team B", "TB");

        // Create players
        batsman = new Player("Batsman 1", "BATSMAN", 1, team1);
        bowler = new Player("Bowler 1", "BOWLER", 10, team2);

        // Create match
        match = new Match(team1, team2, "T20", "Stadium", LocalDateTime.now(), "LIVE");

        // Create innings
        innings = new Innings(match, team1, 1);
        
        // Mock ID assignment
        setIdUsingReflection(team1, 1L);
        setIdUsingReflection(team2, 2L);
        setIdUsingReflection(batsman, 1L);
        setIdUsingReflection(bowler, 2L);
        setIdUsingReflection(match, 1L);
        setIdUsingReflection(innings, 1L);
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
    void testRecordNormalFour() {
        DeliveryRequest request = new DeliveryRequest(
                innings.getId(), batsman.getId(), bowler.getId(),
                4, 0, null, false, null
        );

        when(inningsService.getInningsEntityById(innings.getId())).thenReturn(innings);
        when(playerService.getPlayerEntityById(batsman.getId())).thenReturn(batsman);
        when(playerService.getPlayerEntityById(bowler.getId())).thenReturn(bowler);
        when(deliveryRepository.save(any(Delivery.class))).thenAnswer(invocation -> {
            Delivery d = invocation.getArgument(0);
            setIdUsingReflection(d, 1L);
            return d;
        });
        when(inningsRepository.save(any(Innings.class))).thenReturn(innings);

        DeliveryResponse response = scoringService.recordDelivery(request);

        assertNotNull(response);
        assertEquals(4, response.getBatsmanRuns());
        assertEquals(0, response.getExtras());
        assertEquals(4, response.getTotalRuns());
        assertFalse(response.getWicket());
    }

    @Test
    void testRecordWide() {
        DeliveryRequest request = new DeliveryRequest(
                innings.getId(), batsman.getId(), bowler.getId(),
                0, 1, "WIDE", false, null
        );

        when(inningsService.getInningsEntityById(innings.getId())).thenReturn(innings);
        when(playerService.getPlayerEntityById(batsman.getId())).thenReturn(batsman);
        when(playerService.getPlayerEntityById(bowler.getId())).thenReturn(bowler);
        when(deliveryRepository.save(any(Delivery.class))).thenAnswer(invocation -> {
            Delivery d = invocation.getArgument(0);
            setIdUsingReflection(d, 1L);
            return d;
        });
        when(inningsRepository.save(any(Innings.class))).thenReturn(innings);

        DeliveryResponse response = scoringService.recordDelivery(request);

        assertEquals(0, response.getBatsmanRuns());
        assertEquals(1, response.getExtras());
        assertEquals(1, response.getTotalRuns());
        assertEquals("WIDE", response.getExtraType());
    }

    @Test
    void testRecordNoBall() {
        DeliveryRequest request = new DeliveryRequest(
                innings.getId(), batsman.getId(), bowler.getId(),
                0, 1, "NO_BALL", false, null
        );

        when(inningsService.getInningsEntityById(innings.getId())).thenReturn(innings);
        when(playerService.getPlayerEntityById(batsman.getId())).thenReturn(batsman);
        when(playerService.getPlayerEntityById(bowler.getId())).thenReturn(bowler);
        when(deliveryRepository.save(any(Delivery.class))).thenAnswer(invocation -> {
            Delivery d = invocation.getArgument(0);
            setIdUsingReflection(d, 1L);
            return d;
        });
        when(inningsRepository.save(any(Innings.class))).thenReturn(innings);

        DeliveryResponse response = scoringService.recordDelivery(request);

        assertEquals(0, response.getBatsmanRuns());
        assertEquals(1, response.getExtras());
        assertEquals(1, response.getTotalRuns());
        assertEquals("NO_BALL", response.getExtraType());
    }

    @Test
    void testRecordBye() {
        DeliveryRequest request = new DeliveryRequest(
                innings.getId(), batsman.getId(), bowler.getId(),
                0, 1, "BYE", false, null
        );

        when(inningsService.getInningsEntityById(innings.getId())).thenReturn(innings);
        when(playerService.getPlayerEntityById(batsman.getId())).thenReturn(batsman);
        when(playerService.getPlayerEntityById(bowler.getId())).thenReturn(bowler);
        when(deliveryRepository.save(any(Delivery.class))).thenAnswer(invocation -> {
            Delivery d = invocation.getArgument(0);
            setIdUsingReflection(d, 1L);
            return d;
        });
        when(inningsRepository.save(any(Innings.class))).thenReturn(innings);

        DeliveryResponse response = scoringService.recordDelivery(request);

        assertEquals(0, response.getBatsmanRuns());
        assertEquals(1, response.getExtras());
        assertEquals(1, response.getTotalRuns());
        assertEquals("BYE", response.getExtraType());
    }

    @Test
    void testRecordWicket() {
        DeliveryRequest request = new DeliveryRequest(
                innings.getId(), batsman.getId(), bowler.getId(),
                0, 0, null, true, "BOWLED"
        );

        when(inningsService.getInningsEntityById(innings.getId())).thenReturn(innings);
        when(playerService.getPlayerEntityById(batsman.getId())).thenReturn(batsman);
        when(playerService.getPlayerEntityById(bowler.getId())).thenReturn(bowler);
        when(deliveryRepository.save(any(Delivery.class))).thenAnswer(invocation -> {
            Delivery d = invocation.getArgument(0);
            setIdUsingReflection(d, 1L);
            return d;
        });
        when(inningsRepository.save(any(Innings.class))).thenReturn(innings);

        DeliveryResponse response = scoringService.recordDelivery(request);

        assertTrue(response.getWicket());
        assertEquals("BOWLED", response.getWicketType());
    }

    @Test
    void testInvalidBatsmanNotInBattingTeam() {
        // Bowler from team2, but batsman also from team2
        Player wrongBatsman = new Player("Wrong Batsman", "BATSMAN", 5, team2);
        setIdUsingReflection(wrongBatsman, 3L);

        DeliveryRequest request = new DeliveryRequest(
                innings.getId(), wrongBatsman.getId(), bowler.getId(),
                4, 0, null, false, null
        );

        when(inningsService.getInningsEntityById(innings.getId())).thenReturn(innings);
        when(playerService.getPlayerEntityById(wrongBatsman.getId())).thenReturn(wrongBatsman);
        when(playerService.getPlayerEntityById(bowler.getId())).thenReturn(bowler);

        assertThrows(IllegalArgumentException.class, () -> scoringService.recordDelivery(request));
    }

    @Test
    void testInvalidBowlerInBattingTeam() {
        // Bowler from team1, but team1 is batting (should be fielding)
        Player wrongBowler = new Player("Wrong Bowler", "BOWLER", 5, team1);
        setIdUsingReflection(wrongBowler, 3L);

        DeliveryRequest request = new DeliveryRequest(
                innings.getId(), batsman.getId(), wrongBowler.getId(),
                4, 0, null, false, null
        );

        when(inningsService.getInningsEntityById(innings.getId())).thenReturn(innings);
        when(playerService.getPlayerEntityById(batsman.getId())).thenReturn(batsman);
        when(playerService.getPlayerEntityById(wrongBowler.getId())).thenReturn(wrongBowler);

        assertThrows(IllegalArgumentException.class, () -> scoringService.recordDelivery(request));
    }

    @Test
    void testCannotExceedTenWickets() {
        innings.setWickets(10);

        DeliveryRequest request = new DeliveryRequest(
                innings.getId(), batsman.getId(), bowler.getId(),
                0, 0, null, true, "BOWLED"
        );

        when(inningsService.getInningsEntityById(innings.getId())).thenReturn(innings);
        when(playerService.getPlayerEntityById(batsman.getId())).thenReturn(batsman);
        when(playerService.getPlayerEntityById(bowler.getId())).thenReturn(bowler);

        assertThrows(IllegalArgumentException.class, () -> scoringService.recordDelivery(request));
    }

    @Test
    void testNoBallWith4Runs() {
        // No-ball + 4 runs from bat = 5 total runs
        DeliveryRequest request = new DeliveryRequest(
                innings.getId(), batsman.getId(), bowler.getId(),
                4, 1, "NO_BALL", false, null
        );

        when(inningsService.getInningsEntityById(innings.getId())).thenReturn(innings);
        when(playerService.getPlayerEntityById(batsman.getId())).thenReturn(batsman);
        when(playerService.getPlayerEntityById(bowler.getId())).thenReturn(bowler);
        when(deliveryRepository.save(any(Delivery.class))).thenAnswer(invocation -> {
            Delivery d = invocation.getArgument(0);
            setIdUsingReflection(d, 1L);
            return d;
        });
        when(inningsRepository.save(any(Innings.class))).thenReturn(innings);

        DeliveryResponse response = scoringService.recordDelivery(request);

        assertEquals(4, response.getBatsmanRuns());
        assertEquals(1, response.getExtras());
        assertEquals(5, response.getTotalRuns());
    }
}
