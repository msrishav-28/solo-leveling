# ­ƒÄ« Solo Leveling Habit Tracker - Production Roadmap

**Project Status:** MVP Complete (Phase 1) Ô£à  
**Next Phase:** Full-Stack Production Application (Phase 2)  
**Timeline:** 8-12 weeks for Phase 2  
**Developer:** M S Rishav Subhin (@msrishav-28)

---

## ­ƒôè Current State Analysis

### Ô£à What's Working (Frontend MVP)
- **12 fully-designed pages** with 50+ components
- **Complete UI/UX flow** from registration ÔåÆ dashboard ÔåÆ profile
- **Design system** implementation (colors, typography, animations)
- **Responsive layouts** (mobile, tablet, desktop)
- **Client-side routing** with React Router
- **Component architecture** following best practices

### ÔÜá´©Å What's Missing (Critical Gaps)

#### 1. **No Backend / Data Persistence**
- All data is **mock/hardcoded** in component state
- No database to store users, quests, achievements
- No API to save/retrieve data
- **Quest completion doesn't persist** across page refreshes
- **User profiles are fake** - no real authentication

#### 2. **No State Management**
- Redux Toolkit installed but **not implemented**
- Data lives in individual component states
- No centralized store for user/quest data
- **Props drilling** everywhere

#### 3. **No Authentication System**
- Registration form has **no backend validation**
- No JWT tokens, sessions, or user management
- Social login buttons (Google/GitHub) **are non-functional**
- No password hashing or security

#### 4. **No Real-Time Features**
- Quest reminders **don't actually notify**
- Streak tracking **doesn't calculate** automatically
- Leaderboard is **static mock data**
- No websockets or push notifications

#### 5. **No Analytics / Gamification Engine**
- XP calculations are **hardcoded**
- Attribute growth **doesn't actually accumulate**
- Achievement triggers **are not implemented**
- Rank progression **doesn't auto-update**

#### 6. **No Testing or CI/CD**
- No unit tests, integration tests, or E2E tests
- No deployment pipeline
- No error tracking or monitoring

---

## ­ƒÅù´©Å Phase 2: Full Production Roadmap

### **Week 1-2: Backend Foundation** 

#### **1.1 Database Design**
```sql
-- PostgreSQL Schema (Recommended)

-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  hunter_name VARCHAR(50) UNIQUE NOT NULL,
  avatar_style VARCHAR(20) DEFAULT 'confident',
  level INT DEFAULT 1,
  total_xp INT DEFAULT 0,
  current_rank VARCHAR(2) DEFAULT 'F',
  current_streak INT DEFAULT 0,
  max_streak INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP,
  is_verified BOOLEAN DEFAULT FALSE,
  oauth_provider VARCHAR(50), -- 'google', 'github', null
  oauth_id VARCHAR(255)
);

-- Attributes Table
CREATE TABLE user_attributes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  strength INT DEFAULT 0,
  intelligence INT DEFAULT 0,
  constitution INT DEFAULT 0,
  dexterity INT DEFAULT 0,
  charisma INT DEFAULT 0,
  luck INT DEFAULT 0,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Quests Table
CREATE TABLE quests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(20) NOT NULL, -- 'daily', 'recurring', 'one-time'
  difficulty VARCHAR(20) DEFAULT 'normal', -- 'easy', 'normal', 'hard'
  base_xp INT NOT NULL,
  attributes JSONB, -- ['strength', 'intelligence']
  reminder_time TIME,
  frequency VARCHAR(20), -- 'daily', 'weekly', 'custom'
  deadline TIMESTAMP,
  completions_per_day INT DEFAULT 1,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Quest Completions Table
CREATE TABLE quest_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quest_id UUID REFERENCES quests(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  completed_at TIMESTAMP DEFAULT NOW(),
  time_spent INT, -- seconds
  difficulty_override VARCHAR(20),
  xp_earned INT NOT NULL,
  streak_bonus INT DEFAULT 0,
  time_bonus INT DEFAULT 0,
  notes TEXT
);

-- Achievements Table
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  rarity VARCHAR(20) NOT NULL, -- 'common', 'rare', 'epic', 'legendary'
  trigger_type VARCHAR(50) NOT NULL, -- 'streak', 'level', 'quest_count', 'attribute'
  trigger_value INT,
  xp_reward INT DEFAULT 0,
  icon VARCHAR(50)
);

-- User Achievements Table
CREATE TABLE user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- Notifications Table
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- 'quest_reminder', 'achievement', 'rank_up'
  title VARCHAR(255) NOT NULL,
  message TEXT,
  quest_id UUID REFERENCES quests(id) ON DELETE SET NULL,
  is_read BOOLEAN DEFAULT FALSE,
  scheduled_for TIMESTAMP,
  sent_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_hunter_name ON users(hunter_name);
CREATE INDEX idx_quests_user_id ON quests(user_id);
CREATE INDEX idx_quest_completions_user_id ON quest_completions(user_id);
CREATE INDEX idx_quest_completions_quest_id ON quest_completions(quest_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
```

**Alternative: MongoDB (NoSQL)**
```javascript
// User Schema
{
  _id: ObjectId,
  email: String,
  passwordHash: String,
  hunterName: String,
  avatarStyle: String,
  level: Number,
  totalXP: Number,
  currentRank: String,
  currentStreak: Number,
  maxStreak: Number,
  attributes: {
    strength: Number,
    intelligence: Number,
    constitution: Number,
    dexterity: Number,
    charisma: Number,
    luck: Number
  },
  createdAt: Date,
  lastLogin: Date,
  oauth: {
    provider: String,
    id: String
  }
}
```

#### **1.2 Backend Framework Selection**

**Option A: Node.js + Express (Recommended)**
```bash
# Tech Stack
- Express.js 4.18+ (REST API)
- PostgreSQL 15+ with Prisma ORM
- JWT for authentication
- bcrypt for password hashing
- node-cron for scheduled tasks
- socket.io for real-time features
```

**Option B: Node.js + NestJS** (Enterprise-grade)
```bash
# Tech Stack
- NestJS 10+ (TypeScript, scalable architecture)
- TypeORM or Prisma
- Passport.js for OAuth
- Bull for job queues
```

**Option C: Python + FastAPI** (Modern, fast)
```bash
# Tech Stack
- FastAPI 0.100+ (async, auto-docs)
- SQLAlchemy ORM
- Pydantic for validation
- Celery for background tasks
```

#### **1.3 API Endpoints Design**

```javascript
// Authentication
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh-token
GET    /api/auth/me
POST   /api/auth/verify-email
POST   /api/auth/reset-password
POST   /api/auth/oauth/google
POST   /api/auth/oauth/github

// Users
GET    /api/users/:id
PATCH  /api/users/:id
DELETE /api/users/:id
GET    /api/users/:id/stats
GET    /api/users/:id/achievements
PATCH  /api/users/:id/attributes

// Quests
GET    /api/quests                  // Get all user quests
POST   /api/quests                  // Create quest
GET    /api/quests/:id
PATCH  /api/quests/:id
DELETE /api/quests/:id
POST   /api/quests/:id/complete     // Complete quest
GET    /api/quests/active           // Active quests
GET    /api/quests/templates        // Quest templates

// Quest Completions
GET    /api/completions             // User's completion history
GET    /api/completions/today
GET    /api/completions/stats       // Weekly/monthly stats

// Achievements
GET    /api/achievements            // All achievements
GET    /api/achievements/unlocked   // User's unlocked achievements

// Leaderboard
GET    /api/leaderboard             // Global rankings
GET    /api/leaderboard/rank/:rank  // Filter by rank
GET    /api/leaderboard/friends     // Friends rankings

// Notifications
GET    /api/notifications
PATCH  /api/notifications/:id/read
DELETE /api/notifications/:id
POST   /api/notifications/test      // Test notification

// Analytics
GET    /api/analytics/xp-history
GET    /api/analytics/streak-history
GET    /api/analytics/attribute-growth
GET    /api/analytics/quest-completion-rate
```

---

### **Week 3-4: Authentication & User Management**

#### **2.1 JWT Authentication Flow**

```javascript
// backend/middleware/auth.js
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
```

#### **2.2 OAuth Integration**

```javascript
// Google OAuth with Passport.js
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    // Find or create user
    let user = await User.findOne({ email: profile.emails[0].value });
    if (!user) {
      user = await User.create({
        email: profile.emails[0].value,
        hunterName: profile.displayName,
        oauthProvider: 'google',
        oauthId: profile.id,
        isVerified: true
      });
    }
    return done(null, user);
  }
));
```

#### **2.3 Frontend Integration**

```javascript
// src/services/authService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const authService = {
  register: async (email, password, hunterName) => {
    const response = await axios.post(`${API_URL}/auth/register`, {
      email,
      password,
      hunterName
    });
    localStorage.setItem('token', response.data.token);
    return response.data;
  },

  login: async (email, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password
    });
    localStorage.setItem('token', response.data.token);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getCurrentUser: async () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    const response = await axios.get(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  googleLogin: () => {
    window.location.href = `${API_URL}/auth/google`;
  }
};
```

---

### **Week 5-6: Redux State Management & API Integration**

#### **3.1 Redux Store Structure**

```javascript
// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import questsReducer from './slices/questsSlice';
import userReducer from './slices/userSlice';
import notificationsReducer from './slices/notificationsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    quests: questsReducer,
    user: userReducer,
    notifications: notificationsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
```

#### **3.2 Auth Slice Example**

```javascript
// src/store/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../services/authService';

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await authService.login(email, password);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const data = await authService.register(
        userData.email,
        userData.password,
        userData.hunterName
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: false,
    error: null
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      authService.logout();
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Login failed';
      });
    // Similar for register, etc.
  }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
```

#### **3.3 Quests Slice**

```javascript
// src/store/slices/questsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { questService } from '../../services/questService';

export const fetchQuests = createAsyncThunk(
  'quests/fetchQuests',
  async (_, { rejectWithValue }) => {
    try {
      const data = await questService.getAll();
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createQuest = createAsyncThunk(
  'quests/createQuest',
  async (questData, { rejectWithValue }) => {
    try {
      const data = await questService.create(questData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const completeQuest = createAsyncThunk(
  'quests/completeQuest',
  async ({ questId, completionData }, { rejectWithValue }) => {
    try {
      const data = await questService.complete(questId, completionData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const questsSlice = createSlice({
  name: 'quests',
  initialState: {
    quests: [],
    activeQuests: [],
    completedToday: [],
    loading: false,
    error: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuests.fulfilled, (state, action) => {
        state.quests = action.payload;
        state.activeQuests = action.payload.filter(q => q.isActive);
        state.loading = false;
      })
      .addCase(createQuest.fulfilled, (state, action) => {
        state.quests.push(action.payload);
        state.activeQuests.push(action.payload);
      })
      .addCase(completeQuest.fulfilled, (state, action) => {
        state.completedToday.push(action.payload);
        // Update quest state, user XP, etc.
      });
  }
});

export default questsSlice.reducer;
```

---

### **Week 7-8: Gamification Engine & Analytics**

#### **4.1 XP Calculation System**

```javascript
// backend/services/gamificationService.js
class GamificationService {
  calculateQuestXP(quest, completionData) {
    const { baseXP } = quest;
    const { difficulty, timeSpent, estimatedTime } = completionData;
    
    // Difficulty multiplier
    const difficultyMultipliers = {
      'easy': 0.7,
      'normal': 1.0,
      'hard': 1.5
    };
    
    // Time bonus (completed faster = bonus)
    let timeBonus = 0;
    if (estimatedTime && timeSpent < estimatedTime * 0.8) {
      timeBonus = Math.floor(baseXP * 0.15);
    }
    
    // Streak bonus
    const streakBonus = this.calculateStreakBonus(baseXP, userStreak);
    
    const multiplier = difficultyMultipliers[difficulty] || 1.0;
    const totalXP = Math.floor((baseXP * multiplier) + timeBonus + streakBonus);
    
    return {
      baseXP,
      multiplier,
      timeBonus,
      streakBonus,
      totalXP
    };
  }
  
  calculateStreakBonus(baseXP, streak) {
    if (streak < 3) return 0;
    if (streak < 7) return Math.floor(baseXP * 0.1);
    if (streak < 14) return Math.floor(baseXP * 0.15);
    if (streak < 30) return Math.floor(baseXP * 0.25);
    return Math.floor(baseXP * 0.4); // 30+ days
  }
  
  async updateUserProgress(userId, xpGained, attributes) {
    const user = await User.findById(userId);
    
    // Update XP
    user.totalXP += xpGained;
    
    // Check level up
    const newLevel = this.calculateLevel(user.totalXP);
    const didLevelUp = newLevel > user.level;
    user.level = newLevel;
    
    // Check rank up
    const newRank = this.calculateRank(user.totalXP, user.level);
    const didRankUp = newRank !== user.currentRank;
    user.currentRank = newRank;
    
    // Update attributes
    for (const attr of attributes) {
      user.attributes[attr] += Math.floor(Math.random() * 3) + 1;
    }
    
    await user.save();
    
    // Check achievements
    const newAchievements = await this.checkAchievements(user);
    
    return {
      didLevelUp,
      didRankUp,
      newLevel,
      newRank,
      newAchievements
    };
  }
  
  calculateLevel(totalXP) {
    // Progressive XP curve
    return Math.floor(Math.sqrt(totalXP / 100)) + 1;
  }
  
  calculateRank(totalXP, level) {
    if (totalXP < 1000 || level < 5) return 'F';
    if (totalXP < 3000 || level < 10) return 'E';
    if (totalXP < 6000 || level < 20) return 'D';
    if (totalXP < 12000 || level < 35) return 'C';
    if (totalXP < 25000 || level < 50) return 'B';
    if (totalXP < 50000 || level < 75) return 'A';
    return 'S';
  }
  
  async checkAchievements(user) {
    const unlockedAchievements = [];
    const achievements = await Achievement.find();
    
    for (const achievement of achievements) {
      const hasAchievement = await UserAchievement.findOne({
        userId: user.id,
        achievementId: achievement.id
      });
      
      if (hasAchievement) continue;
      
      let shouldUnlock = false;
      
      switch (achievement.triggerType) {
        case 'streak':
          shouldUnlock = user.currentStreak >= achievement.triggerValue;
          break;
        case 'level':
          shouldUnlock = user.level >= achievement.triggerValue;
          break;
        case 'total_xp':
          shouldUnlock = user.totalXP >= achievement.triggerValue;
          break;
        // More trigger types...
      }
      
      if (shouldUnlock) {
        await UserAchievement.create({
          userId: user.id,
          achievementId: achievement.id
        });
        unlockedAchievements.push(achievement);
      }
    }
    
    return unlockedAchievements;
  }
}

module.exports = new GamificationService();
```

#### **4.2 Streak Tracking**

```javascript
// backend/services/streakService.js
class StreakService {
  async updateStreak(userId) {
    const user = await User.findById(userId);
    const today = new Date().setHours(0, 0, 0, 0);
    const lastCompletion = await QuestCompletion.findOne({
      userId,
      completedAt: { $gte: new Date(today - 86400000) } // Yesterday
    });
    
    if (lastCompletion) {
      // Streak continues
      user.currentStreak += 1;
      if (user.currentStreak > user.maxStreak) {
        user.maxStreak = user.currentStreak;
      }
    } else {
      // Streak broken
      user.currentStreak = 1;
    }
    
    await user.save();
    return user.currentStreak;
  }
  
  async checkStreakWarning(userId) {
    const user = await User.findById(userId);
    const today = new Date().setHours(0, 0, 0, 0);
    const todayCompletions = await QuestCompletion.find({
      userId,
      completedAt: { $gte: new Date(today) }
    });
    
    // If no completions today and it's after 8 PM
    if (todayCompletions.length === 0 && new Date().getHours() >= 20) {
      // Send streak warning notification
      await this.sendStreakWarning(user);
    }
  }
}
```

---

### **Week 9-10: Real-Time Features & Notifications**

#### **5.1 Push Notifications Setup**

```javascript
// backend/services/notificationService.js
const nodemailer = require('nodemailer');
const cron = require('node-cron');

class NotificationService {
  constructor() {
    this.emailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    
    this.initializeScheduler();
  }
  
  initializeScheduler() {
    // Check every 5 minutes for scheduled notifications
    cron.schedule('*/5 * * * *', async () => {
      await this.sendScheduledNotifications();
    });
    
    // Daily streak check at 8 PM
    cron.schedule('0 20 * * *', async () => {
      await this.checkStreakWarnings();
    });
  }
  
  async sendQuestReminder(user, quest) {
    // Browser push notification (if enabled)
    if (user.settings.browserNotifications) {
      await this.sendBrowserPush(user, {
        title: `Quest Reminder: ${quest.title}`,
        body: quest.description,
        icon: '/quest-icon.png'
      });
    }
    
    // Email notification (if enabled)
    if (user.settings.emailNotifications) {
      await this.sendEmail(user.email, {
        subject: `ÔÜö´©Å Quest Reminder: ${quest.title}`,
        html: this.getQuestReminderTemplate(quest)
      });
    }
  }
  
  async sendAchievementUnlocked(user, achievement) {
    // Create in-app notification
    await Notification.create({
      userId: user.id,
      type: 'achievement',
      title: '­ƒÅå Achievement Unlocked!',
      message: `You've earned "${achievement.name}"`,
      achievementId: achievement.id
    });
    
    // Send browser push
    await this.sendBrowserPush(user, {
      title: '­ƒÅå Achievement Unlocked!',
      body: achievement.name,
      badge: achievement.rarity
    });
  }
}
```

#### **5.2 WebSocket for Real-Time Updates**

```javascript
// backend/websocket/index.js
const socketIo = require('socket.io');

function initializeWebSocket(server) {
  const io = socketIo(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true
    }
  });
  
  io.use((socket, next) => {
    // JWT authentication
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error('Authentication error'));
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.id;
      next();
    } catch (err) {
      next(new Error('Authentication error'));
    }
  });
  
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.userId}`);
    
    // Join user's personal room
    socket.join(`user:${socket.userId}`);
    
    // Listen for quest completion
    socket.on('quest:complete', async (data) => {
      const result = await completeQuestHandler(socket.userId, data);
      
      // Send result back
      socket.emit('quest:completed', result);
      
      // If rank up, broadcast to leaderboard
      if (result.didRankUp) {
        io.emit('leaderboard:update', {
          userId: socket.userId,
          newRank: result.newRank
        });
      }
    });
    
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.userId}`);
    });
  });
  
  return io;
}
```

---

### **Week 11-12: Testing, Deployment & Monitoring**

#### **6.1 Testing Strategy**

```javascript
// __tests__/auth.test.js (Jest + Supertest)
const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

describe('Authentication', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });
  
  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'Password123!',
          hunterName: 'TestHunter'
        });
      
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user.email).toBe('test@example.com');
    });
    
    it('should not register duplicate email', async () => {
      await User.create({
        email: 'test@example.com',
        password: 'hash',
        hunterName: 'Existing'
      });
      
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'Password123!',
          hunterName: 'TestHunter'
        });
      
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toContain('already exists');
    });
  });
});

// Frontend tests (React Testing Library + Vitest)
// __tests__/components/QuestCard.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import QuestCard from '../components/QuestCard';
import { store } from '../store';

describe('QuestCard', () => {
  const mockQuest = {
    id: '1',
    title: 'Morning Workout',
    difficulty: 'hard',
    xpReward: 100
  };
  
  it('renders quest details', () => {
    render(
      <Provider store={store}>
        <QuestCard quest={mockQuest} />
      </Provider>
    );
    
    expect(screen.getByText('Morning Workout')).toBeInTheDocument();
    expect(screen.getByText('100 XP')).toBeInTheDocument();
  });
  
  it('calls onComplete when button clicked', () => {
    const handleComplete = jest.fn();
    
    render(
      <Provider store={store}>
        <QuestCard quest={mockQuest} onComplete={handleComplete} />
      </Provider>
    );
    
    fireEvent.click(screen.getByText('Complete'));
    expect(handleComplete).toHaveBeenCalledWith('1');
  });
});
```

#### **6.2 CI/CD Pipeline (GitHub Actions)**

```yaml
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: test
          POSTGRES_DB: solo_leveling_test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: |
          cd backend && npm install
          cd ../frontend && npm install
          
      - name: Run backend tests
        run: cd backend && npm test
        env:
          DATABASE_URL: postgresql://postgres:test@localhost:5432/solo_leveling_test
          
      - name: Run frontend tests
        run: cd frontend && npm test
        
      - name: Build frontend
        run: cd frontend && npm run build
  
  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Railway/Vercel
        run: |
          # Deployment commands
```

#### **6.3 Deployment Options**

**Backend Hosting:**
- **Railway.app** (Recommended) - Easy PostgreSQL + Node.js
- **Render.com** - Free tier available
- **Heroku** - Classic choice
- **AWS EC2 + RDS** - More control, higher cost

**Frontend Hosting:**
- **Vercel** (Recommended) - Perfect for React, auto-deploys
- **Netlify** - Similar to Vercel
- **Cloudflare Pages** - Fast CDN

**Database:**
- **Supabase** (Recommended) - PostgreSQL + Auth + Storage
- **PlanetScale** - MySQL, generous free tier
- **MongoDB Atlas** - If using MongoDB

#### **6.4 Monitoring & Error Tracking**

```javascript
// Sentry for error tracking
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});

// LogRocket for session replay
import LogRocket from 'logrocket';
LogRocket.init('your-app-id');

// Analytics
import ReactGA from 'react-ga4';
ReactGA.initialize('G-XXXXXXXXXX');
```

---

## ­ƒôï Feature Checklist (Phase 2)

### **Core Backend (Must-Have)**
- [ ] PostgreSQL database setup
- [ ] User authentication (JWT)
- [ ] OAuth (Google, GitHub)
- [ ] Quest CRUD API
- [ ] Quest completion tracking
- [ ] XP calculation engine
- [ ] Streak tracking system
- [ ] Achievement triggers
- [ ] Leaderboard API
- [ ] Notification scheduler

### **Frontend Integration**
- [ ] Redux store implementation
- [ ] API service layer
- [ ] Protected routes
- [ ] Real authentication flow
- [ ] Quest persistence
- [ ] Real-time leaderboard
- [ ] In-app notifications
- [ ] Error handling & toasts

### **Nice-to-Have (Phase 3)**
- [ ] Equipment system
- [ ] Guild/team features
- [ ] Quest marketplace
- [ ] Social features (friends)
- [ ] Mobile app (React Native)
- [ ] Offline mode
- [ ] Advanced analytics dashboard
- [ ] AI quest suggestions

---

## ­ƒÆ░ Cost Estimation (Monthly)

### **Free Tier (Hobby Project)**
- Frontend: Vercel (Free)
- Backend: Railway (Free $5 credit)
- Database: Supabase (Free 500MB)
- Email: SendGrid (Free 100/day)
- **Total: $0-5/month**

### **Production (Paid)**
- Frontend: Vercel Pro ($20)
- Backend: Railway Pro ($20)
- Database: Supabase Pro ($25)
- Email: SendGrid ($15)
- Monitoring: Sentry ($26)
- **Total: $106/month**

---

## ­ƒÄ» Success Metrics

- **User Retention**: 30% return after 7 days
- **Quest Completion Rate**: >60% of created quests
- **Daily Active Users**: Track growth
- **Avg Session Time**: >5 minutes
- **Streak Maintenance**: >20% users with 7+ day streaks

---

## ­ƒôÜ Tech Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 18 + Vite | UI Framework |
| **State** | Redux Toolkit | Global state |
| **Styling** | Tailwind CSS | Design system |
| **Animation** | Framer Motion | Transitions |
| **Backend** | Node.js + Express | REST API |
| **Database** | PostgreSQL + Prisma | Data persistence |
| **Auth** | JWT + Passport.js | Authentication |
| **Real-time** | Socket.IO | Live updates |
| **Queue** | Bull + Redis | Background jobs |
| **Email** | SendGrid | Notifications |
| **Storage** | AWS S3 / Supabase | File uploads |
| **Deployment** | Vercel + Railway | Hosting |
| **Monitoring** | Sentry + LogRocket | Error tracking |

---

**Ready to build the next level?** ­ƒÜÇ

*This roadmap transforms your MVP into a production-ready, scalable habit tracker with real gamification!*
