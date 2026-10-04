# 🏏 Cricket Score Manager

A full-stack real-time cricket score management system built with Spring Boot and React, featuring live score updates using Server-Sent Events (SSE).

![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.1.1-brightgreen)
![React](https://img.shields.io/badge/React-19.2-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-316192)
![Java](https://img.shields.io/badge/Java-17-orange)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Real-time Updates](#real-time-updates)
- [Testing](#testing)

## ✨ Features

### Core Functionality
- ✅ **Match Management** - Create and manage cricket matches with teams
- ✅ **Ball-by-Ball Scoring** - Record individual deliveries with detailed statistics
- ✅ **Real-time Updates** - Live score broadcasts using Server-Sent Events (SSE)
- ✅ **Team & Player Management** - Comprehensive team and player database
- ✅ **Innings Tracking** - Separate innings management for each team
- ✅ **Statistics Service** - Player and team performance analytics

### Advanced Features
- 🎯 **Cricket Rules Validation**
  - Legal vs illegal deliveries (Wide, No Ball)
  - Maximum wickets limit (10 per innings)
  - Player-team association validation
  - Batting/bowling team verification
- 📊 **Live Match State**
  - Current score and run rate
  - Over-by-over breakdown
  - Recent deliveries feed
- 🔄 **SSE Real-time Broadcasting**
  - Automatic updates on score changes
  - Connection management and error handling
  - Multiple client support

## 🛠️ Tech Stack

### Backend
- **Framework**: Spring Boot 4.1.1
- **Language**: Java 17
- **Database**: PostgreSQL
- **ORM**: Spring Data JPA (Hibernate)
- **Validation**: Jakarta Validation API
- **Build Tool**: Maven

### Frontend
- **Framework**: React 19.2
- **Build Tool**: Vite 8.3
- **HTTP Client**: Axios 1.20
- **Linting**: OXLint 1.81

## 🏗️ Architecture

```
cricket-score-manager/
├── backend/
│   ├── src/main/java/cricket_score_manager/
│   │   ├── controller/       # REST API endpoints
│   │   │   ├── MatchController.java
│   │   │   ├── ScoringController.java
│   │   │   ├── InningsController.java
│   │   │   ├── TeamController.java
│   │   │   └── PlayerController.java
│   │   ├── service/          # Business logic layer
│   │   │   ├── MatchService.java
│   │   │   ├── ScoringService.java
│   │   │   ├── InningsService.java
│   │   │   ├── StatisticsService.java
│   │   │   ├── TeamService.java
│   │   │   ├── PlayerService.java
│   │   │   ├── SseService.java
│   │   │   └── LiveMatchService.java
│   │   ├── entity/           # JPA entities
│   │   │   ├── Match.java
│   │   │   ├── Team.java
│   │   │   ├── Player.java
│   │   │   ├── Innings.java
│   │   │   └── Delivery.java
│   │   ├── repository/       # Data access layer
│   │   │   ├── MatchRepository.java
│   │   │   ├── DeliveryRepository.java
│   │   │   ├── InningsRepository.java
│   │   │   ├── TeamRepository.java
│   │   │   └── PlayerRepository.java
│   │   └── dto/              # Data transfer objects
│   │       ├── MatchResponse.java
│   │       ├── DeliveryRequest.java
│   │       ├── DeliveryResponse.java
│   │       └── InningsResponse.java
│   └── src/test/java/        # Unit tests
│       └── cricket_score_manager/
│           └── service/
│               ├── ScoringServiceUnitTest.java
│               └── TeamServiceUnitTest.java
└── frontend/
    └── src/
        ├── components/       # React components
        │   └── MatchList.jsx
        ├── hooks/            # Custom React hooks
        │   └── useMatchSSE.js
        ├── services/         # API services
        │   ├── matchService.js
        │   └── playerService.js
        └── context/          # React context
            └── MatchContext.jsx
```

## 🚀 Getting Started

### Prerequisites

- Java 17 or higher
- PostgreSQL 12 or higher
- Node.js 18 or higher
- Maven 3.8+

### Backend Setup

1. **Configure Database**
   
   Create a PostgreSQL database:
   ```sql
   CREATE DATABASE cricket_score_db;
   ```

2. **Update Application Properties**
   
   Edit `backend/src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/cricket_score_db
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

3. **Run Backend**
   ```bash
   cd backend
   mvn spring-boot:run
   ```
   
   Backend runs on: `http://localhost:8080`

### Frontend Setup

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```
   
   Frontend runs on: `http://localhost:5173`

## 📡 API Documentation

### Match Endpoints

#### Create Match
```http
POST /api/matches
Content-Type: application/json

{
  "team1Id": 1,
  "team2Id": 2,
  "matchType": "ODI",
  "venue": "Eden Gardens",
  "matchDate": "2024-03-20T14:30:00",
  "status": "SCHEDULED"
}
```

#### Get All Matches
```http
GET /api/matches
```

#### Get Match by ID
```http
GET /api/matches/{id}
```

#### SSE Event Stream
```http
GET /api/matches/{matchId}/events
Accept: text/event-stream
```

### Scoring Endpoints

#### Record Delivery
```http
POST /api/deliveries
Content-Type: application/json

{
  "inningsId": 1,
  "batsmanId": 5,
  "bowlerId": 12,
  "batsmanRuns": 4,
  "extras": 0,
  "extraType": null,
  "wicket": false,
  "wicketType": null
}
```

#### Get Innings Deliveries
```http
GET /api/deliveries/innings/{inningsId}
```

#### Get Recent Deliveries
```http
GET /api/deliveries/innings/{inningsId}/recent?count=10
```

### Team Endpoints

#### Create Team
```http
POST /api/teams
Content-Type: application/json

{
  "name": "India",
  "country": "India"
}
```

### Player Endpoints

#### Create Player
```http
POST /api/players
Content-Type: application/json

{
  "name": "Virat Kohli",
  "role": "BATSMAN",
  "teamId": 1
}
```

## 🗄️ Database Schema

### Entity Relationships

```
Match (1) ----< (Many) Innings
Team (1) ----< (Many) Player
Team (1) ----< (Many) Match (as team1 or team2)
Innings (1) ----< (Many) Delivery
Player (1) ----< (Many) Delivery (as batsman or bowler)
```

### Key Entities

**Match**
- id, team1_id, team2_id, match_type, venue, match_date, status

**Innings**
- id, match_id, batting_team_id, innings_number, total_runs, total_balls, wickets

**Delivery**
- id, innings_id, over_number, ball_number, batsman_id, bowler_id
- batsman_runs, extras, total_runs, extra_type, wicket, wicket_type

**Team**
- id, name, country

**Player**
- id, name, role, team_id

## 🔴 Real-time Updates

### Server-Sent Events (SSE) Implementation

The application uses SSE for real-time score broadcasting:

**Backend (SseService.java)**
```java
public void broadcast(Long matchId, Object data) {
    List<SseEmitter> emitters = matchEmitters.get(matchId);
    // Send data to all connected clients
}
```

**Frontend (useMatchSSE.js)**
```javascript
const { events, isConnected, error } = useMatchSSE(matchId);

useEffect(() => {
  const eventSource = new EventSource(`/api/matches/${matchId}/events`);
  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    // Update UI with new score
  };
}, [matchId]);
```

### Event Flow
1. User records a delivery via POST `/api/deliveries`
2. `ScoringController` saves delivery and broadcasts update
3. `SseService` pushes event to all connected SSE clients
4. Frontend receives event and updates UI instantly

## 🧪 Testing

### Run Backend Tests
```bash
cd backend
mvn test
```

### Test Coverage
- ✅ `ScoringServiceUnitTest` - Ball-by-ball scoring logic
- ✅ `TeamServiceUnitTest` - Team management operations

## 🎯 Key Implementation Highlights

### 1. Cricket Rules Validation
```java
// Validate wickets don't exceed 10
if (request.getWicket() && innings.getWickets() >= 10) {
    throw new IllegalArgumentException("Cannot record wicket - all batsmen are out");
}

// Validate players belong to correct teams
if (!batsman.getTeam().getId().equals(innings.getBattingTeam().getId())) {
    throw new IllegalArgumentException("Batsman does not belong to the batting team");
}
```

### 2. Over and Ball Calculation
```java
int totalBalls = innings.getTotalBalls();
int ballNumber = (totalBalls % 6) + 1;  // 1-6 balls per over
int overNumber = totalBalls / 6;
```

### 3. Legal Ball Detection
```java
private boolean isLegal(String extraType) {
    if (extraType == null || extraType.isEmpty()) {
        return true; // Normal delivery
    }
    // Wide and No Ball are illegal (don't increment ball count)
    return !extraType.equalsIgnoreCase("WIDE") && 
           !extraType.equalsIgnoreCase("NO_BALL");
}
```

## 🎨 Frontend Features

### Match List Component
- Responsive grid layout
- Status badges (Scheduled, Live, Completed)
- Match format indicators
- Venue and date display

### Real-time Score Updates
- Automatic reconnection on connection loss
- Error handling and user feedback
- Connection status indicators

## 🔒 CORS Configuration

```java
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
```

Configured for local development with React dev server.

## 📝 License

This project is created for educational purposes as part of Web Technology coursework.

## 👤 Author

**Khushal**
- GitHub: [@gittkhushal](https://github.com/gittkhushal)

## 🙏 Acknowledgments

- Spring Boot Documentation
- React Documentation
- PostgreSQL Documentation
- Server-Sent Events (SSE) specification

---

**Assignment 9 - Web Technology Course**
