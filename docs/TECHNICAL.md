# F1Insight Frontend — Technical Documentation

> **Version:** 1.0.0
> **Framework:** React 19.2 + TypeScript 5.9
> **Build Tool:** Vite 7.2
> **Port:** 5173 (dev)

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Technology Stack](#2-technology-stack)
3. [Project Structure](#3-project-structure)
4. [Configuration](#4-configuration)
5. [Routing & Pages](#5-routing--pages)
6. [Authentication](#6-authentication)
7. [State Management](#7-state-management)
8. [API Services](#8-api-services)
9. [Component Library](#9-component-library)
10. [Design System](#10-design-system)
11. [Testing](#11-testing)
12. [Build & Deployment](#12-build--deployment)

---

## 1. Architecture Overview

```
┌──────────────────────────────────────────────────┐
│                 React SPA (:5173)                 │
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌───────────────┐  │
│  │  Pages   │  │  Redux   │  │  Auth Context  │  │
│  │ (Router) │  │  Store   │  │  (JWT + OTP)   │  │
│  └────┬─────┘  └────┬─────┘  └───────┬───────┘  │
│       │              │                │           │
│  ┌────▼──────────────▼────────────────▼────────┐ │
│  │          API Service Layer                   │ │
│  │  ┌────────┐ ┌──────┐ ┌─────────┐ ┌───────┐ │ │
│  │  │  F1    │ │ Auth │ │Predict  │ │Strat  │ │ │
│  │  │Adapter │ │ Svc  │ │  Svc    │ │ Svc   │ │ │
│  │  └────┬───┘ └──┬───┘ └────┬────┘ └───┬───┘ │ │
│  └───────┼────────┼──────────┼───────────┼─────┘ │
│          └────────┴──────────┴───────────┘       │
│                       │                           │
│              ┌────────▼────────┐                  │
│              │  Axios Client   │                  │
│              │  (JWT + Refresh │                  │
│              │   Interceptors) │                  │
│              └────────┬────────┘                  │
└───────────────────────┼──────────────────────────┘
                        │
                  /api proxy
                        │
               ┌────────▼────────┐
               │  Express Backend │
               │   (:5000)        │
               └─────────────────┘
```

---

## 2. Technology Stack

| Category | Package | Version |
|----------|---------|---------|
| **UI Framework** | React | 19.2.0 |
| **Routing** | React Router | 7.13.0 |
| **State** | Redux Toolkit | 2.11.2 |
| **Persistence** | Redux Persist | 6.0.0 |
| **HTTP** | Axios | 1.13.5 |
| **Animation** | Framer Motion | 12.29.2 |
| **Icons** | Lucide React | 0.563.0 |
| **Styling** | Tailwind CSS | 4.1.18 |
| **Class Utils** | tailwind-merge + clsx | 3.4.0 / 2.1.1 |
| **Variants** | Class Variance Authority | 0.7.1 |
| **Build** | Vite | 7.2.4 |
| **Language** | TypeScript | 5.9.3 (strict) |
| **Testing** | Vitest | 4.0.18 |
| **DOM Testing** | @testing-library/react | latest |

---

## 3. Project Structure

```
src/
├── main.tsx                           # App entry point
├── App.tsx                            # Route definitions
├── index.css                          # Tailwind + custom theme
├── contexts/
│   └── AuthContext.tsx                 # JWT auth state + methods
├── store/
│   ├── index.ts                       # Redux store + persist config
│   ├── hooks.ts                       # Typed dispatch/selector hooks
│   └── slices/
│       ├── scheduleSlice.ts           # Race calendar state
│       ├── driverSlice.ts             # Drivers state
│       ├── constructorSlice.ts        # Constructors state
│       ├── circuitSlice.ts            # Circuits state
│       ├── resultSlice.ts             # Race results state
│       └── notificationSlice.ts       # Toast notification queue
├── services/
│   ├── client.ts                      # Axios instance + interceptors
│   ├── api.ts                         # F1 data adapter (key remapping)
│   ├── auth.service.ts                # Auth API calls
│   ├── user.service.ts                # User profile/preferences
│   ├── prediction.service.ts          # ML prediction calls
│   ├── strategy.service.ts            # Strategy recommendation
│   ├── notification.service.ts        # Backend notifications
│   └── types.ts                       # Shared TypeScript types
├── pages/
│   ├── Landing.tsx                    # Public landing page
│   ├── Login.tsx                      # Login form
│   ├── Signup.tsx                     # Multi-step registration
│   ├── OTP.tsx                        # 6-digit OTP verification
│   ├── Dashboard.tsx                  # Mission control overview
│   ├── Playground.tsx                 # 4-step prediction wizard
│   ├── Schedules.tsx                  # Race calendar
│   ├── Drivers.tsx                    # Driver grid
│   ├── DriverDetails.tsx              # Individual driver profile
│   ├── Constructors.tsx               # Constructor grid
│   ├── ConstructorDetails.tsx         # Team profile
│   ├── Circuits.tsx                   # Circuit grid
│   ├── CircuitDetails.tsx             # Circuit detail + track SVG
│   ├── RaceResults.tsx                # Race results + podium
│   ├── ProfilePage.tsx                # User profile management
│   ├── SettingsPage.tsx               # App settings (4 tabs)
│   ├── PublicDrivers.tsx              # Public driver view
│   ├── PublicConstructors.tsx         # Public constructor view
│   ├── PublicSchedule.tsx             # Public schedule view
│   ├── Terms.tsx                      # Terms of Service
│   └── Privacy.tsx                    # Privacy Policy
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx                 # Top nav + notification dropdown
│   │   ├── Sidebar.tsx                # Collapsible dashboard sidebar
│   │   ├── Footer.tsx                 # Site footer
│   │   ├── DashboardLayout.tsx        # Protected layout wrapper
│   │   ├── PublicLayout.tsx           # Public page layout
│   │   ├── AuthLayout.tsx             # Auth page layout
│   │   ├── Layout.tsx                 # Generic layout
│   │   ├── AmbientBackground.tsx      # Animated background effects
│   │   ├── ScrollToTop.tsx            # Route change scroll reset
│   │   └── PageTransition.tsx         # Page enter/exit animations
│   ├── ui/
│   │   ├── button.tsx                 # Button with variants
│   │   ├── card.tsx                   # Card container
│   │   ├── input.tsx                  # Text input
│   │   ├── skeleton.tsx               # Loading placeholder
│   │   ├── GlowingBorder.tsx          # Red glow border effect
│   │   ├── GlowingButton.tsx          # Button with glow shadow
│   │   ├── Reveal.tsx                 # Scroll reveal animation
│   │   └── auth/
│   │       ├── AuthCard.tsx           # Auth form wrapper
│   │       ├── AuthInput.tsx          # Auth-styled input
│   │       ├── AuthButton.tsx         # Auth-styled button
│   │       └── StrengthMeter.tsx      # Password strength indicator
│   ├── dashboard/
│   │   ├── Leaderboard.tsx            # Driver standings table
│   │   ├── StatsCard.tsx              # Animated stat display
│   │   ├── NotificationSystem.tsx     # Toast notification overlay
│   │   ├── ProfileOverlay.tsx         # Profile dropdown
│   │   └── SettingsOverlay.tsx        # Settings dropdown
│   ├── home/
│   │   ├── HeroSection.tsx            # Landing hero with CTA
│   │   └── FeaturesSection.tsx        # Feature grid
│   ├── auth/
│   │   └── ProtectedRoute.tsx         # Auth route guard
│   ├── PageHeader.tsx                 # Title + description header
│   ├── DriverCard.tsx                 # Driver grid card
│   ├── ConstructorCard.tsx            # Constructor grid card
│   ├── Podium.tsx                     # Podium visualization
│   ├── YearSelect.tsx                 # Year filter dropdown
│   └── CustomCursor.tsx               # Custom cursor effect
├── lib/
│   └── utils.ts                       # cn() class merge utility
├── test/
│   └── setup.ts                       # Vitest + testing-library setup
└── docs/
    └── INTEGRATION.md                 # Integration guide
```

---

## 4. Configuration

### Vite Configuration

```typescript
// vite.config.ts
{
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts']
  }
}
```

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `/api` | Backend API base URL |

### TypeScript

- **Target:** ES2022
- **Module:** ESNext
- **Strict mode:** Enabled
- **JSX:** `react-jsx` (automatic)
- **No unused locals/parameters:** Enforced

---

## 5. Routing & Pages

### Public Routes

| Path | Page | Layout | Description |
|------|------|--------|-------------|
| `/` | Landing | — | Hero section, features, CTA |
| `/login` | Login | AuthLayout | Email/password form |
| `/signup` | Signup | AuthLayout | 3-step registration wizard |
| `/otp` | OTP | AuthLayout | 6-digit verification |
| `/drivers` | PublicDrivers | PublicLayout | Public driver grid |
| `/constructors` | PublicConstructors | PublicLayout | Public constructor grid |
| `/schedule` | PublicSchedule | PublicLayout | Public race calendar |
| `/terms` | Terms | Layout | Legal terms |
| `/privacy` | Privacy | Layout | Privacy policy |

### Protected Routes (Dashboard)

All wrapped by `ProtectedRoute` + `DashboardLayout`.

| Path | Page | Description |
|------|------|-------------|
| `/dashboard/overview` | Dashboard | Mission control with live countdown, stats, notifications |
| `/dashboard/playground` | Playground | 4-step prediction wizard with ML integration |
| `/dashboard/schedules` | Schedules | Race calendar with year filter |
| `/dashboard/drivers` | Drivers | Driver grid with search/filter |
| `/dashboard/drivers/:driverId` | DriverDetails | Driver profile + stats |
| `/dashboard/constructors` | Constructors | Constructor grid |
| `/dashboard/constructors/:constructorId` | ConstructorDetails | Team profile + engineering metrics |
| `/dashboard/circuits` | Circuits | Circuit grid |
| `/dashboard/circuits/:circuitId` | CircuitDetails | Circuit SVG + technical data |
| `/dashboard/results/:year/:round` | RaceResults | Podium + results table |
| `/dashboard/profile` | ProfilePage | User profile management |
| `/dashboard/settings` | SettingsPage | Appearance, alerts, security, system |

### Key Pages

**Playground (Prediction Wizard):**
1. **Select Event** — Pick season and race from schedule
2. **Configure** — Choose prediction mode (full grid vs single driver)
3. **Processing** — ML prediction with loading animation
4. **Results** — Podium visualization, full grid, strategy analysis panel

**Dashboard (Mission Control):**
- Live countdown timer (ticks every second, cached in localStorage)
- Stats cards: Races completed, championship lead, season, ML MAE
- Upcoming races list, recent notifications
- Driver leaderboard, prediction playground quick link

**Settings Page (4 tabs):**
- Appearance: Theme selector
- Alerts: Race, qualifying, prediction, driver news toggles
- Security: 2FA toggle, password change
- System: Session timeout, backend/ML service status

---

## 6. Authentication

### Auth Context (`AuthContext.tsx`)

```typescript
interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  pendingUserId: string | null
  login(email, password): Promise<LoginResult>
  signup(email, password, name): Promise<{ userId }>
  verifyOTP(userId, code): Promise<void>
  resendOTP(userId, purpose?): Promise<void>
  logout(): Promise<void>
  setPendingUserId(id): void
}
```

### Authentication Flow

```
Signup → POST /auth/signup → { userId } → Navigate /otp
                                              │
Login → POST /auth/login ─┬─▶ Verified: { user, accessToken } → Dashboard
                           └─▶ 403: { requiresOTP, userId } → /otp
                                              │
OTP → POST /auth/verify → { user, accessToken } + refreshToken cookie → Dashboard
```

### Token Management

- **Access token:** Stored in-memory via `setAccessToken()` in `client.ts`
- **Refresh token:** httpOnly cookie (managed by backend)
- **User data:** localStorage key `f1insight_user`
- **Session recovery:** On mount, restore user from localStorage + attempt token refresh

### Axios Interceptors

- **Request:** Attaches `Authorization: Bearer {token}` if token exists
- **Response (401):** Queues failed requests, attempts `POST /auth/refresh`, retries all queued requests with new token. If refresh fails, redirects to login.

### Protected Routes

`ProtectedRoute` component checks `isAuthenticated` from AuthContext. Redirects to `/login` if not authenticated. Shows loading spinner during session recovery.

---

## 7. State Management

### Redux Store

```typescript
{
  schedule:      ScheduleState,      // Race calendar
  circuit:       CircuitState,       // Circuits + selected
  driver:        DriverState,        // Driver list
  constructors:  ConstructorState,   // Constructor list
  result:        ResultState,        // Race results by year/round
  notification:  NotificationState   // Toast queue (runtime only)
}
```

**Persistence:** Redux Persist with localStorage. Only data arrays are persisted (not `status` or `error` fields). Notification queue is not persisted.

### Slice Pattern

Each data slice follows a consistent pattern:

```typescript
// State
{ data: T[], status: 'idle' | 'loading' | 'succeeded' | 'failed', error: string | null }

// Thunk
export const fetchData = createAsyncThunk('slice/fetchData', async (params) => {
  return await api.getData(params)
})

// Reducers
extraReducers: (builder) => {
  builder
    .addCase(fetchData.pending, (state) => { state.status = 'loading' })
    .addCase(fetchData.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.data = action.payload
    })
    .addCase(fetchData.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
}
```

### Notification Slice (Runtime Only)

```typescript
interface Notification {
  id: string
  type: 'race' | 'prediction' | 'driver' | 'system'
  title: string
  message: string
  timestamp: number
  autoClose?: number   // ms before auto-dismiss
  pinned?: boolean     // prevents auto-dismiss
}

// Actions
pushNotification(payload)   // Adds to front, max 10
dismissNotification(id)     // Remove by ID
togglePin(id)               // Toggle pinned state
clearAll()                  // Remove unpinned only
```

### Typed Hooks

```typescript
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```

---

## 8. API Services

### HTTP Client (`client.ts`)

- **Base URL:** `import.meta.env.VITE_API_URL || '/api'`
- **Credentials:** `withCredentials: true`
- **Request interceptor:** Attach Bearer token
- **Response interceptor:** 401 → refresh token → retry queue

### F1 Data Adapter (`api.ts`)

Remaps backend camelCase responses to frontend PascalCase types (matching Ergast format):

```
Backend: { circuit, firstPractice, results, qualifying }
Adapter: { Circuit, FirstPractice, Results, Qualifying }
```

This avoids changing 12+ component references across 5+ page files.

| Method | Backend Endpoint | Return Type |
|--------|-----------------|-------------|
| `getSchedule(year)` | `GET /f1/{year}/schedule` | `Race[]` |
| `getDrivers(year)` | `GET /f1/{year}/drivers` | `Driver[]` |
| `getConstructors(year)` | `GET /f1/{year}/constructors` | `Constructor[]` |
| `getCircuit(id)` | `GET /f1/circuits/{id}` | `Circuit` |
| `getAllCircuits(year)` | `GET /f1/{year}/circuits` | `Circuit[]` |
| `getRaceResults(year, round)` | `GET /f1/{year}/{round}/results` | `Race` |
| `getLastRaceResults()` | `GET /f1/current/last/results` | `Race` |
| `getDriverStandings(year)` | `GET /f1/{year}/standings/drivers` | `DriverStanding[]` |
| `getConstructorStandings(year)` | `GET /f1/{year}/standings/constructors` | `ConstructorStanding[]` |
| `getSeasons()` | `GET /f1/seasons` | `Season[]` |

### Auth Service (`auth.service.ts`)

| Function | Endpoint | Returns |
|----------|----------|---------|
| `loginApi(email, pw)` | `POST /auth/login` | `{ authenticated, user? }` or `{ requiresOTP, userId }` |
| `signupApi(email, pw, name)` | `POST /auth/signup` | `{ userId }` |
| `verifyOTPApi(userId, code)` | `POST /auth/verify` | `User` |
| `resendOTPApi(userId, purpose)` | `POST /auth/resend-otp` | `void` |
| `refreshTokenApi()` | `POST /auth/refresh` | `User | null` |
| `logoutApi()` | `POST /auth/logout` | `void` |

### Prediction Service (`prediction.service.ts`)

| Function | Endpoint | Returns |
|----------|----------|---------|
| `predictRace(season, round)` | `GET /predictions/race` | `RacePrediction` |
| `predictSingle(season, round, driverId)` | `GET /predictions/single` | `SinglePrediction` |
| `getPredictionHistory(page, limit, season?)` | `GET /predictions/history` | `{ predictions, pagination }` |

### Strategy Service (`strategy.service.ts`)

| Function | Endpoint | Returns |
|----------|----------|---------|
| `getStrategyRecommendation(params)` | `POST /strategy/recommend` | `StrategyResult` |

Params: `predictedPositionMean`, `predictedPositionStd`, `circuitId`, `raceLaps`, `trackTemp`, `rainProbability`

### User Service (`user.service.ts`)

| Function | Endpoint | Returns |
|----------|----------|---------|
| `getProfile()` | `GET /users/me` | `UserProfile` |
| `updateProfile(data)` | `PATCH /users/me` | `UserProfile` |
| `updatePreferences(prefs)` | `PATCH /users/me/preferences` | `UserPreferences` |
| `changePassword(current, new)` | `PATCH /users/me/password` | `void` |

### Notification Service (`notification.service.ts`)

| Function | Endpoint | Returns |
|----------|----------|---------|
| `getNotifications(page, limit, unreadOnly)` | `GET /notifications` | `{ notifications, unreadCount, pagination }` |
| `markAsRead(id)` | `PATCH /notifications/{id}/read` | `void` |
| `markAllAsRead()` | `POST /notifications/read-all` | `void` |
| `deleteNotification(id)` | `DELETE /notifications/{id}` | `void` |

---

## 9. Component Library

### Layout Components

| Component | Purpose |
|-----------|---------|
| `Navbar` | Top navigation with logo, links, notification dropdown, user avatar |
| `Sidebar` | Collapsible dashboard sidebar with menu items |
| `DashboardLayout` | Protected wrapper: Sidebar + Navbar + NotificationSystem + content |
| `PublicLayout` | Public wrapper: Navbar + Footer + AmbientBackground |
| `AuthLayout` | Minimal centered layout for auth pages |
| `AmbientBackground` | Animated gradient blobs and particles |
| `ScrollToTop` | Resets scroll position on route change |
| `PageTransition` | Framer Motion page enter/exit animations |

### UI Primitives

| Component | Props | Description |
|-----------|-------|-------------|
| `Button` | `variant`, `size` | Default, outline, ghost variants |
| `Card` | `children` | Card with header, title, content slots |
| `Input` | `icon`, standard HTML | Input with optional icon prefix |
| `Skeleton` | `className` | Animated loading placeholder |
| `GlowingBorder` | `children` | Container with F1 red glow effect |
| `GlowingButton` | `size`, `disabled` | Button with red glow shadow |
| `Reveal` | `children` | Scroll-triggered text reveal animation |

### Auth Components

| Component | Description |
|-----------|-------------|
| `AuthCard` | Branded card wrapper for login/signup/OTP |
| `AuthInput` | Dark-themed input with validation styling |
| `AuthButton` | Full-width submit button with loading state |
| `StrengthMeter` | 4-level password strength indicator |
| `ProtectedRoute` | Route guard checking auth state |

### Dashboard Components

| Component | Description |
|-----------|-------------|
| `StatsCard` | Animated counter with icon, suffix, delay |
| `Leaderboard` | Driver championship standings table |
| `NotificationSystem` | Toast notification overlay (stacked, auto-dismiss) |
| `ProfileOverlay` | User profile dropdown panel |
| `SettingsOverlay` | Quick settings dropdown panel |

### Data Display Components

| Component | Description |
|-----------|-------------|
| `DriverCard` | Grid card showing driver name, number, nationality |
| `ConstructorCard` | Grid card showing team name, nationality |
| `Podium` | Top-3 visualization with position pedestals |
| `PageHeader` | Page title + description with consistent styling |
| `YearSelect` | Year filter dropdown with configurable range |

---

## 10. Design System

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `f1-black` | `#0B0D10` | Primary background |
| `f1-red` | `#E10600` | Primary accent, CTAs, active states |
| `f1-white` | `#FFFFFF` | Primary text |
| `f1-graphite` | `#1F232B` | Secondary background, borders |
| `f1-steel` | `#9AA0A6` | Secondary text, muted content |
| `f1-blue` | `#1E90FF` | Info accent |
| `f1-green` | `#00C853` | Success states |
| `f1-amber` | `#FFB300` | Warning states |

### Typography

| Usage | Font | Weight | Transform |
|-------|------|--------|-----------|
| Headings | Orbitron | 700-900 | Uppercase |
| Body | Inter | 400-700 | Normal |
| Labels | Inter | 700 | Uppercase, letter-spacing 0.2em |
| Data | Orbitron | 700 | Tabular nums |

### Spacing & Layout

- Container: max-width 1280px, centered
- Border radius: `rounded-xl` (12px) standard, `rounded-2xl` (16px) for cards
- Shadows: Custom F1 red glows (`shadow-[0_0_15px_rgba(225,6,0,0.3)]`)

### Custom Effects

- **Custom scrollbar:** F1 red thumb on dark track
- **Card hover:** `translateY(-4px)` + red glow shadow
- **Icon glow:** Red drop-shadow on hover
- **Selection:** F1 red background, white text

### Animation Patterns

| Pattern | Library | Usage |
|---------|---------|-------|
| Page transitions | Framer Motion | `initial/animate/exit` on route change |
| Stagger lists | Framer Motion | `delay: index * 0.1` on list items |
| Hover effects | Framer Motion | `whileHover={{ scale: 1.05 }}` |
| Scroll reveal | Framer Motion | `whileInView` with threshold |
| SVG animation | Framer Motion | Track car animation on circuit detail |
| Counter | Custom | Animated number counting on StatsCard |

---

## 11. Testing

### Framework

- **Runner:** Vitest 4.0 (Vite-native, Jest-compatible)
- **DOM:** jsdom
- **Setup:** `@testing-library/jest-dom/vitest` matchers

### Test Files

| File | Tests | Coverage |
|------|-------|----------|
| `client.test.ts` | 4 | Axios instance, token management, interceptors |
| `api.test.ts` | 10 | All adapter methods, key remapping |
| `auth.test.ts` | 8 | Login, signup, OTP, logout, error handling |
| **Total** | **22** | |

### Running Tests

```bash
npm test        # Watch mode
npm run test:run # Single run
```

### Test Patterns

- `vi.mock()` for module mocking
- `vi.hoisted()` for mock function declarations (avoids hoisting issues)
- Axios mock with `vi.fn()` for get/post/interceptors
- Token management tested via `setAccessToken` / `getAccessToken`

---

## 12. Build & Deployment

### Scripts

```bash
npm run dev      # Vite dev server with HMR (:5173)
npm run build    # TypeScript check + Vite production build
npm run preview  # Preview production build locally
npm run lint     # ESLint check
npm test         # Vitest watch mode
npm run test:run # Vitest single run
```

### Build Output

- **Directory:** `dist/`
- **Chunks:** Automatic code splitting via Vite
- **Assets:** Hashed filenames for cache busting
- **Source maps:** Dev only

### Dev Server Proxy

All `/api/*` requests are proxied to `http://localhost:5000` during development, eliminating CORS issues.

### Production Deployment

The `dist/` folder is a static SPA. Serve with any static file server (Nginx, Vercel, Netlify, etc.). Configure the server to route all paths to `index.html` for client-side routing.

**Nginx example:**
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

### Required Services

1. Backend API running at configured `VITE_API_URL`
2. No direct external API calls — all data flows through backend
