# F1Insight Frontend Integration Guide

## Architecture Overview

```
Frontend (React/Vite/TS)  →  Backend (Express/TS)  →  ML Service (FastAPI/Python)
     :5173                       :5000                      :8000
```

The frontend communicates exclusively with the Express backend. The backend proxies F1 data (via Ergast API with Redis caching) and bridges to the ML prediction service.

## Service Layer

### HTTP Client (`src/services/client.ts`)

Central axios instance with:
- **Base URL**: `VITE_API_URL` env var or `/api` (proxied by Vite dev server)
- **JWT interceptor**: Attaches `Authorization: Bearer <token>` to every request
- **Token refresh**: On 401 response, automatically calls `POST /api/auth/refresh` using httpOnly cookie, retries the failed request, and queues concurrent requests during refresh
- **Credentials**: `withCredentials: true` for httpOnly refresh token cookies

### Authentication (`src/services/auth.service.ts`)

| Function | Endpoint | Description |
|---|---|---|
| `loginApi(email, password)` | `POST /auth/login` | Returns `LoginResult` — either `{ authenticated: true, user }` or `{ authenticated: false, requiresOTP: true, userId }` on 403 |
| `signupApi(email, password, name)` | `POST /auth/signup` | Returns `{ userId }` — user must verify OTP |
| `verifyOTPApi(userId, code)` | `POST /auth/verify` | Verifies OTP, returns user + sets access token |
| `resendOTPApi(userId, purpose)` | `POST /auth/resend-otp` | Triggers new OTP email |
| `refreshTokenApi()` | `POST /auth/refresh` | Cookie-based refresh, returns new access token |
| `logoutApi()` | `POST /auth/logout` | Clears tokens on both client and server |

**Auth Flow:**
1. Signup → OTP email sent → Navigate to `/otp`
2. Verify OTP → Tokens issued → Navigate to dashboard
3. Login → If verified: tokens issued; If unverified: 403 with `requiresOTP` → Navigate to `/otp`
4. Token stored in memory (not localStorage) for XSS protection
5. Refresh token in httpOnly cookie for persistence

### F1 Data API (`src/services/api.ts`)

Adapter layer that remaps backend camelCase responses back to PascalCase for frontend component compatibility.

**Key remapping** (backend → frontend):
- `circuit` → `Circuit`
- `firstPractice` → `FirstPractice`
- `qualifying` → `Qualifying`
- `results` → `Results`
- `sprint` → `Sprint`

| Method | Endpoint | Auth Required |
|---|---|---|
| `api.getSchedule(year)` | `GET /f1/{year}/schedule` | No |
| `api.getDrivers(year)` | `GET /f1/{year}/drivers` | No |
| `api.getConstructors(year)` | `GET /f1/{year}/constructors` | No |
| `api.getAllCircuits(year)` | `GET /f1/{year}/circuits` | No |
| `api.getCircuit(circuitId)` | `GET /f1/circuits/{circuitId}` | No |
| `api.getRaceResults(year, round)` | `GET /f1/{year}/{round}/results` | No |
| `api.getLastRaceResults()` | `GET /f1/current/last/results` | No |
| `api.getDriverStandings(year)` | `GET /f1/{year}/standings/drivers` | No |
| `api.getConstructorStandings(year)` | `GET /f1/{year}/standings/constructors` | No |
| `api.getSeasons()` | `GET /f1/seasons` | No |

### Predictions (`src/services/prediction.service.ts`)

| Function | Endpoint | Auth Required |
|---|---|---|
| `predictRace(season, round)` | `GET /predictions/race` | Yes |
| `predictSingle(season, round, driverId)` | `GET /predictions/single` | Yes |
| `getPredictionHistory(page, limit, season)` | `GET /predictions/history` | Yes |

The ML backend uses a stacking ensemble model (Ridge + Random Forest + Gradient Boosting + XGBoost → Ridge meta-learner) with MAE 3.09 and Spearman correlation 0.71.

### Strategy (`src/services/strategy.service.ts`)

| Function | Endpoint | Auth Required |
|---|---|---|
| `getStrategyRecommendation(params)` | `POST /strategy/recommend` | Yes |

Parameters include predicted position stats, circuit ID, race laps, track temperature, and rain probability. Returns optimal pit strategy with safety car analysis.

### User Profile (`src/services/user.service.ts`)

| Function | Endpoint | Auth Required |
|---|---|---|
| `getProfile()` | `GET /users/me` | Yes |
| `updateProfile(data)` | `PATCH /users/me` | Yes |
| `updatePreferences(prefs)` | `PATCH /users/me/preferences` | Yes |
| `changePassword(current, new)` | `PATCH /users/me/password` | Yes |

### Notifications (`src/services/notification.service.ts`)

| Function | Endpoint | Auth Required |
|---|---|---|
| `getNotifications(page, limit, unreadOnly)` | `GET /notifications` | Yes |
| `markAsRead(id)` | `PATCH /notifications/{id}/read` | Yes |
| `markAllAsRead()` | `POST /notifications/read-all` | Yes |
| `deleteNotification(id)` | `DELETE /notifications/{id}` | Yes |

## Development Setup

### Prerequisites
- Node.js 18+
- Python 3.10+ (for ML service)
- MongoDB (for backend)
- Redis (optional, for backend caching)

### Environment Variables

Create `F1Insight-Frontend/.env`:
```
VITE_API_URL=http://localhost:5000/api
```

### Starting Services

```bash
# 1. ML Service (port 8000)
cd F1Insight-ML && bash run.sh

# 2. Backend (port 5000)
cd F1Insight-Backend && npm run dev

# 3. Frontend (port 5173)
cd F1Insight-Frontend && npm run dev
```

The Vite dev server proxies `/api` requests to `http://localhost:5000`, so the frontend can use relative API paths in development.

### Running Tests

```bash
# Frontend service tests
cd F1Insight-Frontend && npm run test:run

# Backend tests
cd F1Insight-Backend && npm test

# ML tests
cd F1Insight-ML && python -m pytest tests/ -v
```

## Data Flow

### Authentication Flow
```
Login Page → POST /auth/login → 200: store token → Dashboard
                               → 403: requiresOTP → OTP Page
                                                      → POST /auth/verify → 200: store token → Dashboard
```

### Prediction Flow
```
Playground → Select Race → fetchSchedule (Redux thunk)
           → Select Mode → Full Grid / Single Driver
           → Run Prediction → GET /predictions/race (or /single)
                                → Backend → ML Service (FastAPI)
                                → Response with predicted positions
           → View Results → Optional: POST /strategy/recommend
```

### Token Refresh Flow
```
API Request → 401 Unauthorized
  → Interceptor: POST /auth/refresh (with httpOnly cookie)
  → New access token → Retry original request
  → If refresh fails → Clear session → Redirect to login
```

## Key Design Decisions

1. **Token storage**: Access token in memory (not localStorage) to prevent XSS; refresh token in httpOnly cookie for persistence across page reloads.

2. **Data remapping**: Backend normalizes Ergast API data to camelCase. Frontend adapter remaps back to PascalCase to avoid changing 12+ component files. This is handled in `api.ts` via `remapRace()`.

3. **Error handling**: Auth errors (401) trigger automatic token refresh. OTP-required (403) responses are caught in `loginApi` and returned as a discriminated union type for clean control flow.

4. **Redux compatibility**: Existing Redux slices and thunks work unchanged because the API adapter preserves the same TypeScript types and data shapes.
