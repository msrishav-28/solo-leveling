# ­ƒùä´©Å Backend Architecture - Solo Leveling Habit Tracker

**Version:** 2.0  
**Last Updated:** November 4, 2025  
**Author:** M S Rishav Subhin

---

## ­ƒôæ Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Database Design](#database-design)
3. [API Specifications](#api-specifications)
4. [Authentication System](#authentication-system)
5. [Services Layer](#services-layer)
6. [Middleware](#middleware)
7. [Error Handling](#error-handling)
8. [Security](#security)
9. [Performance Optimization](#performance-optimization)
10. [Monitoring & Logging](#monitoring--logging)

---

## ­ƒÅù´©Å Architecture Overview

### **Tech Stack**
```yaml
Runtime: Node.js 18+
Framework: Express.js 4.18+
Database: PostgreSQL 15+
ORM: Prisma 5.0+
Cache: Redis 7.0+
Queue: Bull 4.0+
WebSocket: Socket.IO 4.5+
Testing: Jest + Supertest
Documentation: Swagger/OpenAPI
```

### **Project Structure**
```
backend/
Ôö£ÔöÇÔöÇ src/
Ôöé   Ôö£ÔöÇÔöÇ config/
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ database.js           # Prisma client
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ redis.js              # Redis connection
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ bull.js               # Queue configuration
Ôöé   Ôöé   ÔööÔöÇÔöÇ env.js                # Environment variables
Ôöé   Ôö£ÔöÇÔöÇ controllers/
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ auth.controller.js
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ user.controller.js
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ quest.controller.js
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ achievement.controller.js
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ leaderboard.controller.js
Ôöé   Ôöé   ÔööÔöÇÔöÇ notification.controller.js
Ôöé   Ôö£ÔöÇÔöÇ services/
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ auth.service.js
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ gamification.service.js
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ notification.service.js
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ analytics.service.js
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ email.service.js
Ôöé   Ôöé   ÔööÔöÇÔöÇ ai.service.js         # AI/ML integration
Ôöé   Ôö£ÔöÇÔöÇ models/                   # Prisma schema
Ôöé   Ôöé   ÔööÔöÇÔöÇ schema.prisma
Ôöé   Ôö£ÔöÇÔöÇ middleware/
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ auth.middleware.js
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ validation.middleware.js
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ rateLimit.middleware.js
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ error.middleware.js
Ôöé   Ôöé   ÔööÔöÇÔöÇ logger.middleware.js
Ôöé   Ôö£ÔöÇÔöÇ routes/
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ auth.routes.js
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ user.routes.js
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ quest.routes.js
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ achievement.routes.js
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ leaderboard.routes.js
Ôöé   Ôöé   ÔööÔöÇÔöÇ notification.routes.js
Ôöé   Ôö£ÔöÇÔöÇ utils/
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ validators.js
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ helpers.js
Ôöé   Ôöé   ÔööÔöÇÔöÇ constants.js
Ôöé   Ôö£ÔöÇÔöÇ jobs/                     # Bull queue jobs
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ notification.job.js
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ streak.job.js
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ leaderboard.job.js
Ôöé   Ôöé   ÔööÔöÇÔöÇ analytics.job.js
Ôöé   Ôö£ÔöÇÔöÇ websocket/
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ index.js
Ôöé   Ôöé   ÔööÔöÇÔöÇ handlers/
Ôöé   Ôöé       Ôö£ÔöÇÔöÇ quest.handler.js
Ôöé   Ôöé       Ôö£ÔöÇÔöÇ achievement.handler.js
Ôöé   Ôöé       ÔööÔöÇÔöÇ leaderboard.handler.js
Ôöé   Ôö£ÔöÇÔöÇ tests/
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ unit/
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ integration/
Ôöé   Ôöé   ÔööÔöÇÔöÇ e2e/
Ôöé   Ôö£ÔöÇÔöÇ app.js                    # Express app
Ôöé   ÔööÔöÇÔöÇ server.js                 # Server entry point
Ôö£ÔöÇÔöÇ prisma/
Ôöé   Ôö£ÔöÇÔöÇ schema.prisma
Ôöé   Ôö£ÔöÇÔöÇ migrations/
Ôöé   ÔööÔöÇÔöÇ seed.js
Ôö£ÔöÇÔöÇ .env.example
Ôö£ÔöÇÔöÇ .eslintrc.js
Ôö£ÔöÇÔöÇ .prettierrc
Ôö£ÔöÇÔöÇ jest.config.js
Ôö£ÔöÇÔöÇ package.json
ÔööÔöÇÔöÇ README.md
```

---

## ­ƒùä´©Å Database Design

### **Prisma Schema (Complete)**

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================================
// USER MANAGEMENT
// ============================================================

model User {
  id              String    @id @default(uuid())
  email           String    @unique
  passwordHash    String?
  hunterName      String    @unique
  avatarStyle     String    @default("confident")
  avatarUrl       String?
  
  // Gamification Stats
  level           Int       @default(1)
  totalXP         Int       @default(0)
  currentRank     Rank      @default(F)
  currentStreak   Int       @default(0)
  maxStreak       Int       @default(0)
  
  // Metadata
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  lastLogin       DateTime?
  isVerified      Boolean   @default(false)
  isActive        Boolean   @default(true)
  
  // OAuth
  oauthProvider   String?   // 'google', 'github'
  oauthId         String?
  
  // Relationships
  attributes      UserAttribute?
  quests          Quest[]
  completions     QuestCompletion[]
  achievements    UserAchievement[]
  notifications   Notification[]
  settings        UserSettings?
  sessions        Session[]
  refreshTokens   RefreshToken[]
  
  @@index([email])
  @@index([hunterName])
  @@index([currentRank])
  @@index([totalXP])
}

enum Rank {
  F
  E
  D
  C
  B
  A
  S
}

model UserAttribute {
  id            String   @id @default(uuid())
  userId        String   @unique
  user          User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  strength      Int      @default(0)
  intelligence  Int      @default(0)
  constitution  Int      @default(0)
  dexterity     Int      @default(0)
  charisma      Int      @default(0)
  luck          Int      @default(0)
  
  updatedAt     DateTime @updatedAt
  
  @@index([userId])
}

model UserSettings {
  id                      String   @id @default(uuid())
  userId                  String   @unique
  user                    User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  // Notifications
  questReminders          Boolean  @default(true)
  streakWarnings          Boolean  @default(true)
  achievementAlerts       Boolean  @default(true)
  dailyDigest             Boolean  @default(false)
  emailNotifications      Boolean  @default(true)
  pushNotifications       Boolean  @default(true)
  
  // Display
  theme                   String   @default("dark")
  language                String   @default("en")
  animationsEnabled       Boolean  @default(true)
  fontSize                String   @default("medium")
  
  // Privacy
  profileVisibility       String   @default("public")
  showOnLeaderboard       Boolean  @default(true)
  allowFriendRequests     Boolean  @default(true)
  
  updatedAt               DateTime @updatedAt
}

model Session {
  id           String   @id @default(uuid())
  userId       String
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  token        String   @unique
  ipAddress    String?
  userAgent    String?
  
  createdAt    DateTime @default(now())
  expiresAt    DateTime
  
  @@index([userId])
  @@index([token])
}

model RefreshToken {
  id           String   @id @default(uuid())
  userId       String
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  token        String   @unique
  expiresAt    DateTime
  createdAt    DateTime @default(now())
  
  @@index([userId])
  @@index([token])
}

// ============================================================
// QUEST SYSTEM
// ============================================================

model Quest {
  id                  String            @id @default(uuid())
  userId              String
  user                User              @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  title               String
  description         String?
  type                QuestType
  difficulty          Difficulty        @default(NORMAL)
  baseXP              Int
  
  // Attributes affected
  attributes          String[]          // ['strength', 'intelligence']
  
  // Scheduling
  reminderTime        DateTime?
  frequency           Frequency?
  deadline            DateTime?
  completionsPerDay   Int               @default(1)
  
  // Status
  isActive            Boolean           @default(true)
  isCompleted         Boolean           @default(false)
  
  // Metadata
  createdAt           DateTime          @default(now())
  updatedAt           DateTime          @updatedAt
  
  // AI Generated (if applicable)
  isAIGenerated       Boolean           @default(false)
  aiConfidence        Float?
  
  // Relationships
  completions         QuestCompletion[]
  
  @@index([userId])
  @@index([type])
  @@index([isActive])
  @@index([deadline])
}

enum QuestType {
  DAILY
  RECURRING
  ONE_TIME
}

enum Difficulty {
  EASY
  NORMAL
  HARD
}

enum Frequency {
  DAILY
  WEEKLY
  CUSTOM
}

model QuestCompletion {
  id                  String   @id @default(uuid())
  questId             String
  quest               Quest    @relation(fields: [questId], references: [id], onDelete: Cascade)
  userId              String
  user                User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  // Completion Details
  completedAt         DateTime @default(now())
  timeSpent           Int?     // seconds
  difficultyOverride  Difficulty?
  
  // XP Breakdown
  baseXP              Int
  difficultyMultiplier Float
  streakBonus         Int      @default(0)
  timeBonus           Int      @default(0)
  totalXP             Int
  
  // Attribute Gains
  attributeGains      Json     // { strength: 2, intelligence: 1 }
  
  notes               String?
  
  @@index([userId])
  @@index([questId])
  @@index([completedAt])
}

// ============================================================
// ACHIEVEMENT SYSTEM
// ============================================================

model Achievement {
  id            String   @id @default(uuid())
  name          String   @unique
  description   String
  rarity        Rarity
  
  // Trigger Configuration
  triggerType   TriggerType
  triggerValue  Int?
  triggerCondition Json? // Complex conditions
  
  // Rewards
  xpReward      Int      @default(0)
  icon          String?
  badgeUrl      String?
  
  // Metadata
  createdAt     DateTime @default(now())
  
  // Relationships
  userAchievements UserAchievement[]
}

enum Rarity {
  COMMON
  RARE
  EPIC
  LEGENDARY
}

enum TriggerType {
  STREAK
  LEVEL
  TOTAL_XP
  QUEST_COUNT
  ATTRIBUTE
  RANK
  SPECIAL
}

model UserAchievement {
  id              String      @id @default(uuid())
  userId          String
  user            User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  achievementId   String
  achievement     Achievement @relation(fields: [achievementId], references: [id], onDelete: Cascade)
  
  unlockedAt      DateTime    @default(now())
  
  @@unique([userId, achievementId])
  @@index([userId])
  @@index([achievementId])
}

// ============================================================
// NOTIFICATION SYSTEM
// ============================================================

model Notification {
  id             String           @id @default(uuid())
  userId         String
  user           User             @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  type           NotificationType
  title          String
  message        String
  
  // Related entities
  questId        String?
  achievementId  String?
  
  // Status
  isRead         Boolean          @default(false)
  isSent         Boolean          @default(false)
  
  // Scheduling
  scheduledFor   DateTime?
  sentAt         DateTime?
  createdAt      DateTime         @default(now())
  
  @@index([userId])
  @@index([isRead])
  @@index([scheduledFor])
}

enum NotificationType {
  QUEST_REMINDER
  STREAK_WARNING
  ACHIEVEMENT_UNLOCKED
  RANK_UP
  LEVEL_UP
  DAILY_DIGEST
  FRIEND_REQUEST
  SYSTEM
}

// ============================================================
// SOCIAL FEATURES
// ============================================================

model Friendship {
  id           String   @id @default(uuid())
  requesterId  String
  addresseeId  String
  
  status       FriendshipStatus @default(PENDING)
  
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  
  @@unique([requesterId, addresseeId])
  @@index([requesterId])
  @@index([addresseeId])
}

enum FriendshipStatus {
  PENDING
  ACCEPTED
  BLOCKED
}

model Guild {
  id          String   @id @default(uuid())
  name        String   @unique
  description String?
  imageUrl    String?
  
  ownerId     String
  
  maxMembers  Int      @default(50)
  level       Int      @default(1)
  totalXP     Int      @default(0)
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  members     GuildMember[]
}

model GuildMember {
  id        String   @id @default(uuid())
  guildId   String
  guild     Guild    @relation(fields: [guildId], references: [id], onDelete: Cascade)
  userId    String
  
  role      GuildRole @default(MEMBER)
  joinedAt  DateTime  @default(now())
  
  @@unique([guildId, userId])
  @@index([userId])
}

enum GuildRole {
  OWNER
  ADMIN
  MEMBER
}

// ============================================================
// ANALYTICS & TRACKING
// ============================================================

model DailyStats {
  id              String   @id @default(uuid())
  userId          String
  date            DateTime @db.Date
  
  questsCreated   Int      @default(0)
  questsCompleted Int      @default(0)
  xpGained        Int      @default(0)
  timeSpent       Int      @default(0) // seconds
  
  // Streak on this day
  streakCount     Int      @default(0)
  
  createdAt       DateTime @default(now())
  
  @@unique([userId, date])
  @@index([userId])
  @@index([date])
}

model AttributeHistory {
  id            String   @id @default(uuid())
  userId        String
  
  strength      Int
  intelligence  Int
  constitution  Int
  dexterity     Int
  charisma      Int
  luck          Int
  
  recordedAt    DateTime @default(now())
  
  @@index([userId])
  @@index([recordedAt])
}

// ============================================================
// AI/ML MODELS DATA
// ============================================================

model UserBehaviorPattern {
  id                String   @id @default(uuid())
  userId            String   @unique
  
  // Usage patterns
  preferredTime     String?  // "morning", "afternoon", "evening"
  avgSessionLength  Int?     // minutes
  questSuccessRate  Float?
  
  // Preferences
  preferredDifficulty String?
  favoriteAttributes  String[] // ['strength', 'intelligence']
  
  // Predictions
  churnRisk         Float?   // 0-1
  nextQuestPredict  Json?    // AI predicted next quest
  
  lastAnalyzed      DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  @@index([userId])
}

model QuestRecommendation {
  id            String   @id @default(uuid())
  userId        String
  
  title         String
  description   String
  type          QuestType
  difficulty    Difficulty
  attributes    String[]
  
  confidence    Float    // AI confidence score
  reason        String   // Why this quest
  
  isAccepted    Boolean  @default(false)
  isRejected    Boolean  @default(false)
  
  createdAt     DateTime @default(now())
  expiresAt     DateTime
  
  @@index([userId])
  @@index([createdAt])
}
```

### **Database Indexes Strategy**

```sql
-- Performance-critical indexes
CREATE INDEX idx_users_rank_xp ON users(current_rank, total_xp DESC);
CREATE INDEX idx_quest_completions_date ON quest_completions(completed_at DESC);
CREATE INDEX idx_notifications_pending ON notifications(user_id, is_sent, scheduled_for) 
  WHERE is_sent = false;

-- Leaderboard optimization
CREATE INDEX idx_users_leaderboard ON users(total_xp DESC, level DESC, current_streak DESC)
  WHERE is_active = true;

-- Quest filtering
CREATE INDEX idx_quests_active_deadline ON quests(user_id, is_active, deadline)
  WHERE is_active = true;
```

---

## ­ƒöî API Specifications

### **Authentication Endpoints**

```javascript
// POST /api/auth/register
Request:
{
  "email": "hunter@example.com",
  "password": "SecurePassword123!",
  "hunterName": "ShadowHunter"
}

Response: 201
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "hunter@example.com",
      "hunterName": "ShadowHunter",
      "level": 1,
      "rank": "F"
    },
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "refresh_token_here"
  }
}

Errors:
- 400: Email already exists
- 400: Hunter name taken
- 422: Validation error
```

```javascript
// POST /api/auth/login
Request:
{
  "email": "hunter@example.com",
  "password": "SecurePassword123!"
}

Response: 200
{
  "success": true,
  "data": {
    "user": { /* user object */ },
    "token": "jwt_token",
    "refreshToken": "refresh_token"
  }
}

Errors:
- 401: Invalid credentials
- 403: Account not verified
```

```javascript
// GET /api/auth/me
Headers: { Authorization: "Bearer {token}" }

Response: 200
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "hunter@example.com",
    "hunterName": "ShadowHunter",
    "level": 15,
    "totalXP": 8750,
    "currentRank": "C",
    "currentStreak": 12,
    "attributes": {
      "strength": 45,
      "intelligence": 38,
      /* ... */
    }
  }
}
```

```javascript
// POST /api/auth/oauth/google
// Redirects to Google OAuth
// Callback: GET /api/auth/oauth/google/callback?code=...

Response: 302 (Redirect to frontend with token in URL)
Location: https://app.com/auth/callback?token=jwt_token&refresh=refresh_token
```

### **Quest Management Endpoints**

```javascript
// POST /api/quests
Headers: { Authorization: "Bearer {token}" }
Request:
{
  "title": "Morning Workout",
  "description": "Complete 30-minute workout",
  "type": "DAILY",
  "difficulty": "HARD",
  "baseXP": 100,
  "attributes": ["strength", "constitution"],
  "reminderTime": "2025-11-05T07:00:00Z",
  "frequency": "DAILY"
}

Response: 201
{
  "success": true,
  "data": {
    "id": "quest_uuid",
    "title": "Morning Workout",
    "type": "DAILY",
    "difficulty": "HARD",
    "baseXP": 100,
    /* ... */
    "createdAt": "2025-11-04T10:30:00Z"
  }
}
```

```javascript
// GET /api/quests?type=DAILY&isActive=true&page=1&limit=20
Headers: { Authorization: "Bearer {token}" }

Response: 200
{
  "success": true,
  "data": {
    "quests": [
      {
        "id": "uuid",
        "title": "Morning Workout",
        "type": "DAILY",
        "difficulty": "HARD",
        "baseXP": 100,
        "isActive": true,
        "completionsToday": 0,
        "completionsTotal": 15
      },
      /* ... */
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 47,
      "pages": 3
    }
  }
}
```

```javascript
// POST /api/quests/:id/complete
Headers: { Authorization: "Bearer {token}" }
Request:
{
  "timeSpent": 1800,  // 30 minutes in seconds
  "difficultyOverride": "HARD",
  "notes": "Great session today!"
}

Response: 200
{
  "success": true,
  "data": {
    "completion": {
      "id": "completion_uuid",
      "questId": "quest_uuid",
      "completedAt": "2025-11-04T10:45:00Z",
      "xpBreakdown": {
        "baseXP": 100,
        "difficultyMultiplier": 1.5,
        "streakBonus": 25,
        "timeBonus": 15,
        "totalXP": 165
      }
    },
    "userUpdates": {
      "newLevel": 15,
      "newTotalXP": 8915,
      "didLevelUp": false,
      "didRankUp": false,
      "newStreak": 13,
      "attributeGains": {
        "strength": 2,
        "constitution": 1
      }
    },
    "achievements": [
      {
        "id": "achievement_uuid",
        "name": "Workout Warrior",
        "rarity": "RARE"
      }
    ]
  }
}
```

### **Leaderboard Endpoints**

```javascript
// GET /api/leaderboard?rank=all&timeframe=all-time&page=1&limit=50
Headers: { Authorization: "Bearer {token}" }

Response: 200
{
  "success": true,
  "data": {
    "leaderboard": [
      {
        "rank": 1,
        "userId": "uuid",
        "hunterName": "TopHunter",
        "level": 87,
        "totalXP": 125000,
        "currentRank": "S",
        "currentStreak": 45,
        "isCurrentUser": false
      },
      /* ... */
    ],
    "currentUserRank": {
      "rank": 256,
      "totalUsers": 15847
    },
    "stats": {
      "totalHunters": 15847,
      "activeToday": 3421,
      "sRankHunters": 23
    },
    "pagination": {
      "page": 1,
      "limit": 50,
      "total": 15847
    }
  }
}
```

### **Analytics Endpoints**

```javascript
// GET /api/analytics/xp-history?period=30days
Headers: { Authorization: "Bearer {token}" }

Response: 200
{
  "success": true,
  "data": {
    "history": [
      {
        "date": "2025-10-05",
        "xpGained": 450,
        "questsCompleted": 5
      },
      /* ... */
    ],
    "summary": {
      "totalXP": 8750,
      "avgDailyXP": 292,
      "bestDay": {
        "date": "2025-10-28",
        "xpGained": 850
      }
    }
  }
}
```

### **Rate Limiting**

```javascript
// Rate limits per endpoint group
Auth endpoints: 10 requests/minute
Quest operations: 100 requests/minute
Leaderboard: 30 requests/minute
Analytics: 60 requests/minute

// Response headers
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1699123456

// Error response (429)
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Please try again in 45 seconds."
  }
}
```

---

## ­ƒöÉ Authentication System

### **JWT Token Structure**

```javascript
// Access Token (7 days)
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "id": "user_uuid",
    "email": "hunter@example.com",
    "role": "user",
    "iat": 1699123456,
    "exp": 1699728256
  },
  "signature": "..."
}

// Refresh Token (30 days)
{
  "id": "user_uuid",
  "tokenId": "refresh_token_uuid",
  "iat": 1699123456,
  "exp": 1701715456
}
```

### **OAuth 2.0 Flow**

```javascript
// services/auth.service.js
class AuthService {
  async googleOAuth(code) {
    // Exchange code for tokens
    const { access_token } = await this.exchangeCodeForToken(code);
    
    // Get user profile
    const profile = await this.getGoogleProfile(access_token);
    
    // Find or create user
    let user = await prisma.user.findUnique({
      where: { email: profile.email }
    });
    
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: profile.email,
          hunterName: this.generateUniqueHunterName(profile.name),
          avatarUrl: profile.picture,
          oauthProvider: 'google',
          oauthId: profile.sub,
          isVerified: true
        }
      });
      
      // Create default attributes
      await prisma.userAttribute.create({
        data: { userId: user.id }
      });
    }
    
    // Generate JWT
    const token = this.generateToken(user);
    const refreshToken = await this.generateRefreshToken(user);
    
    return { user, token, refreshToken };
  }
  
  generateToken(user) {
    return jwt.sign(
      { id: user.id, email: user.email, role: 'user' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
  }
  
  async generateRefreshToken(user) {
    const refreshToken = await prisma.refreshToken.create({
      data: {
        userId: user.id,
        token: crypto.randomBytes(40).toString('hex'),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
      }
    });
    
    return refreshToken.token;
  }
  
  async refreshAccessToken(refreshToken) {
    const tokenRecord = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true }
    });
    
    if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
      throw new Error('Invalid or expired refresh token');
    }
    
    const newAccessToken = this.generateToken(tokenRecord.user);
    return newAccessToken;
  }
}
```

### **Password Security**

```javascript
const bcrypt = require('bcrypt');

class PasswordService {
  async hash(password) {
    // Validate password strength
    if (!this.isStrongPassword(password)) {
      throw new Error('Password does not meet requirements');
    }
    
    // Generate salt and hash
    const salt = await bcrypt.genSalt(12);
    return bcrypt.hash(password, salt);
  }
  
  async verify(password, hash) {
    return bcrypt.compare(password, hash);
  }
  
  isStrongPassword(password) {
    // Minimum 8 characters
    // At least 1 uppercase, 1 lowercase, 1 number, 1 special char
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  }
}
```

---

## ­ƒÄ« Services Layer

### **Gamification Service (Complete Implementation)**

```javascript
// services/gamification.service.js
class GamificationService {
  constructor() {
    this.XP_CURVE = 100; // Base XP for level calculation
    this.RANK_THRESHOLDS = {
      F: { xp: 0, level: 0 },
      E: { xp: 1000, level: 5 },
      D: { xp: 3000, level: 10 },
      C: { xp: 6000, level: 20 },
      B: { xp: 12000, level: 35 },
      A: { xp: 25000, level: 50 },
      S: { xp: 50000, level: 75 }
    };
  }
  
  async completeQuest(userId, questId, completionData) {
    const quest = await prisma.quest.findUnique({
      where: { id: questId },
      include: { user: { include: { attributes: true } } }
    });
    
    if (!quest || quest.userId !== userId) {
      throw new Error('Quest not found');
    }
    
    // Calculate XP
    const xpBreakdown = this.calculateQuestXP(quest, completionData, quest.user);
    
    // Calculate attribute gains
    const attributeGains = this.calculateAttributeGains(
      quest.attributes,
      quest.difficulty
    );
    
    // Create completion record
    const completion = await prisma.questCompletion.create({
      data: {
        questId,
        userId,
        timeSpent: completionData.timeSpent,
        difficultyOverride: completionData.difficultyOverride,
        baseXP: xpBreakdown.baseXP,
        difficultyMultiplier: xpBreakdown.multiplier,
        streakBonus: xpBreakdown.streakBonus,
        timeBonus: xpBreakdown.timeBonus,
        totalXP: xpBreakdown.totalXP,
        attributeGains,
        notes: completionData.notes
      }
    });
    
    // Update user progress
    const userUpdates = await this.updateUserProgress(
      userId,
      xpBreakdown.totalXP,
      attributeGains
    );
    
    // Update streak
    const newStreak = await this.updateStreak(userId);
    
    // Check achievements
    const newAchievements = await this.checkAchievements(userId);
    
    // Record daily stats
    await this.updateDailyStats(userId, xpBreakdown.totalXP, completion.completedAt);
    
    // Trigger notifications if rank/level up
    if (userUpdates.didRankUp || userUpdates.didLevelUp) {
      await this.sendProgressNotifications(userId, userUpdates);
    }
    
    return {
      completion,
      userUpdates: { ...userUpdates, newStreak },
      achievements: newAchievements
    };
  }
  
  calculateQuestXP(quest, completionData, user) {
    const difficulty = completionData.difficultyOverride || quest.difficulty;
    const baseXP = quest.baseXP;
    
    // Difficulty multipliers
    const difficultyMultipliers = {
      EASY: 0.7,
      NORMAL: 1.0,
      HARD: 1.5
    };
    
    const multiplier = difficultyMultipliers[difficulty];
    
    // Streak bonus
    const streakBonus = this.calculateStreakBonus(baseXP, user.currentStreak);
    
    // Time bonus (completed faster than estimated)
    let timeBonus = 0;
    if (completionData.timeSpent && quest.estimatedTime) {
      const efficiency = quest.estimatedTime / completionData.timeSpent;
      if (efficiency > 1.2) {
        timeBonus = Math.floor(baseXP * 0.15);
      }
    }
    
    const totalXP = Math.floor((baseXP * multiplier) + streakBonus + timeBonus);
    
    return {
      baseXP,
      multiplier,
      streakBonus,
      timeBonus,
      totalXP
    };
  }
  
  calculateStreakBonus(baseXP, streak) {
    if (streak < 3) return 0;
    if (streak < 7) return Math.floor(baseXP * 0.1);
    if (streak < 14) return Math.floor(baseXP * 0.15);
    if (streak < 30) return Math.floor(baseXP * 0.25);
    return Math.floor(baseXP * 0.4); // 30+ days = 40% bonus
  }
  
  calculateAttributeGains(questAttributes, difficulty) {
    const gains = {};
    
    const basePointsPerAttribute = {
      EASY: { min: 1, max: 2 },
      NORMAL: { min: 1, max: 3 },
      HARD: { min: 2, max: 5 }
    };
    
    const range = basePointsPerAttribute[difficulty];
    
    questAttributes.forEach(attr => {
      gains[attr] = Math.floor(
        Math.random() * (range.max - range.min + 1)
      ) + range.min;
    });
    
    return gains;
  }
  
  async updateUserProgress(userId, xpGained, attributeGains) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { attributes: true }
    });
    
    const newTotalXP = user.totalXP + xpGained;
    const oldLevel = user.level;
    const oldRank = user.currentRank;
    
    const newLevel = this.calculateLevel(newTotalXP);
    const newRank = this.calculateRank(newTotalXP, newLevel);
    
    // Update user
    await prisma.user.update({
      where: { id: userId },
      data: {
        totalXP: newTotalXP,
        level: newLevel,
        currentRank: newRank
      }
    });
    
    // Update attributes
    const attributeUpdates = {};
    Object.entries(attributeGains).forEach(([attr, gain]) => {
      attributeUpdates[attr] = {
        increment: gain
      };
    });
    
    await prisma.userAttribute.update({
      where: { userId },
      data: attributeUpdates
    });
    
    // Record attribute history
    const updatedAttributes = await prisma.userAttribute.findUnique({
      where: { userId }
    });
    
    await prisma.attributeHistory.create({
      data: {
        userId,
        strength: updatedAttributes.strength,
        intelligence: updatedAttributes.intelligence,
        constitution: updatedAttributes.constitution,
        dexterity: updatedAttributes.dexterity,
        charisma: updatedAttributes.charisma,
        luck: updatedAttributes.luck
      }
    });
    
    return {
      newLevel,
      newTotalXP,
      newRank,
      didLevelUp: newLevel > oldLevel,
      didRankUp: newRank !== oldRank,
      attributeGains
    };
  }
  
  calculateLevel(totalXP) {
    return Math.floor(Math.sqrt(totalXP / this.XP_CURVE)) + 1;
  }
  
  calculateRank(totalXP, level) {
    const ranks = ['S', 'A', 'B', 'C', 'D', 'E', 'F'];
    
    for (const rank of ranks) {
      const threshold = this.RANK_THRESHOLDS[rank];
      if (totalXP >= threshold.xp && level >= threshold.level) {
        return rank;
      }
    }
    
    return 'F';
  }
  
  async updateStreak(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Check if user completed quest yesterday
    const yesterdayCompletion = await prisma.questCompletion.findFirst({
      where: {
        userId,
        completedAt: {
          gte: yesterday,
          lt: today
        }
      }
    });
    
    let newStreak;
    if (yesterdayCompletion) {
      // Streak continues
      newStreak = user.currentStreak + 1;
    } else {
      // Streak resets
      newStreak = 1;
    }
    
    // Update max streak
    const maxStreak = Math.max(user.maxStreak, newStreak);
    
    await prisma.user.update({
      where: { id: userId },
      data: {
        currentStreak: newStreak,
        maxStreak
      }
    });
    
    return newStreak;
  }
  
  async checkAchievements(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        completions: true,
        achievements: { include: { achievement: true } }
      }
    });
    
    const allAchievements = await prisma.achievement.findMany();
    const unlockedIds = user.achievements.map(ua => ua.achievementId);
    const toCheck = allAchievements.filter(a => !unlockedIds.includes(a.id));
    
    const newlyUnlocked = [];
    
    for (const achievement of toCheck) {
      let shouldUnlock = false;
      
      switch (achievement.triggerType) {
        case 'STREAK':
          shouldUnlock = user.currentStreak >= achievement.triggerValue;
          break;
        case 'LEVEL':
          shouldUnlock = user.level >= achievement.triggerValue;
          break;
        case 'TOTAL_XP':
          shouldUnlock = user.totalXP >= achievement.triggerValue;
          break;
        case 'QUEST_COUNT':
          shouldUnlock = user.completions.length >= achievement.triggerValue;
          break;
        case 'RANK':
          const rankOrder = ['F', 'E', 'D', 'C', 'B', 'A', 'S'];
          const currentRankIndex = rankOrder.indexOf(user.currentRank);
          const requiredRankIndex = rankOrder.indexOf(achievement.triggerCondition.rank);
          shouldUnlock = currentRankIndex >= requiredRankIndex;
          break;
      }
      
      if (shouldUnlock) {
        await prisma.userAchievement.create({
          data: {
            userId: user.id,
            achievementId: achievement.id
          }
        });
        
        newlyUnlocked.push(achievement);
        
        // Create notification
        await prisma.notification.create({
          data: {
            userId: user.id,
            type: 'ACHIEVEMENT_UNLOCKED',
            title: '­ƒÅå Achievement Unlocked!',
            message: `You've earned "${achievement.name}"`,
            achievementId: achievement.id
          }
        });
      }
    }
    
    return newlyUnlocked;
  }
  
  async updateDailyStats(userId, xpGained, completedAt) {
    const date = new Date(completedAt);
    date.setHours(0, 0, 0, 0);
    
    await prisma.dailyStats.upsert({
      where: {
        userId_date: { userId, date }
      },
      update: {
        questsCompleted: { increment: 1 },
        xpGained: { increment: xpGained }
      },
      create: {
        userId,
        date,
        questsCompleted: 1,
        xpGained
      }
    });
  }
}

module.exports = new GamificationService();
```

---

*Continue reading in: `AI_ML_INTEGRATION.md`, `FRONTEND_ARCHITECTURE.md`, `DEPLOYMENT_GUIDE.md`*
