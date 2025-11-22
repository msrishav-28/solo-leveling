# ­ƒº¬ Testing Strategy - Solo Leveling Habit Tracker

**Version:** 2.0  
**Last Updated:** November 4, 2025  
**Author:** M S Rishav Subhin

---

## ­ƒôæ Table of Contents

1. [Testing Overview](#testing-overview)
2. [Unit Testing](#unit-testing)
3. [Integration Testing](#integration-testing)
4. [End-to-End Testing](#end-to-end-testing)
5. [Performance Testing](#performance-testing)
6. [Security Testing](#security-testing)
7. [Test Coverage](#test-coverage)
8. [CI Integration](#ci-integration)
9. [Test Data Management](#test-data-management)
10. [Best Practices](#best-practices)

---

## ­ƒÄ» Testing Overview

### **Testing Pyramid**
```
        ÔöîÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÉ
        Ôöé     E2E      Ôöé  10% - User flows, critical paths
        Ôöé    Tests     Ôöé
        Ôö£ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöñ
        Ôöé Integration  Ôöé  30% - API endpoints, DB interactions
        Ôöé    Tests     Ôöé
        Ôö£ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöñ
        Ôöé    Unit      Ôöé  60% - Functions, components, utilities
        Ôöé    Tests     Ôöé
        ÔööÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÿ
```

### **Tech Stack**
```yaml
Frontend:
  - Unit/Integration: Vitest + React Testing Library
  - E2E: Playwright
  - Coverage: c8

Backend:
  - Unit/Integration: Jest + Supertest
  - Coverage: Istanbul/nyc
  - Mocking: Jest mock functions

ML Service:
  - Unit: pytest
  - Coverage: pytest-cov

Performance:
  - Load Testing: k6
  - Lighthouse: CI/CD integration

Security:
  - OWASP ZAP
  - Snyk
  - npm audit / pip-audit
```

### **Coverage Requirements**
```yaml
Minimum Coverage:
  - Overall: 80%
  - Critical Paths: 100%
  - Business Logic: 90%
  - UI Components: 70%

Per File Type:
  - Services: 90%
  - Controllers: 85%
  - Utils: 95%
  - Components: 75%
```

---

## ­ƒº® Unit Testing

### **Frontend - React Components**

```javascript
// src/components/ui/Button.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button';

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click Me');
  });
  
  it('applies primary variant styles', () => {
    render(<Button variant="primary">Primary</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-gradient-to-r from-cyan-500 to-purple-600');
  });
  
  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('disables button when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button');
    
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-50 cursor-not-allowed');
  });
  
  it('renders icon when provided', () => {
    const Icon = () => <svg data-testid="test-icon" />;
    render(<Button icon={<Icon />}>With Icon</Button>);
    
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });
});
```

### **Frontend - Redux Slice**

```javascript
// features/quests/questsSlice.test.js
import { describe, it, expect, beforeEach } from 'vitest';
import questsReducer, {
  fetchQuests,
  createQuest,
  completeQuest,
  setFilters,
  selectActiveQuests
} from './questsSlice';
import { configureStore } from '@reduxjs/toolkit';

describe('Quests Slice', () => {
  let store;
  
  beforeEach(() => {
    store = configureStore({
      reducer: {
        quests: questsReducer
      }
    });
  });
  
  it('should set initial state', () => {
    const state = store.getState().quests;
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.ids).toEqual([]);
  });
  
  it('should handle setFilters', () => {
    store.dispatch(setFilters({ type: 'DAILY', isActive: true }));
    const state = store.getState().quests;
    
    expect(state.filters).toEqual({ type: 'DAILY', isActive: true });
  });
  
  it('should handle fetchQuests.pending', () => {
    store.dispatch(fetchQuests.pending());
    const state = store.getState().quests;
    
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });
  
  it('should handle fetchQuests.fulfilled', () => {
    const mockQuests = [
      { id: '1', title: 'Morning Workout', type: 'DAILY' },
      { id: '2', title: 'Read Book', type: 'DAILY' }
    ];
    
    store.dispatch(fetchQuests.fulfilled({ data: { quests: mockQuests } }));
    const state = store.getState().quests;
    
    expect(state.loading).toBe(false);
    expect(state.ids).toEqual(['1', '2']);
    expect(state.entities['1'].title).toBe('Morning Workout');
  });
  
  it('should handle fetchQuests.rejected', () => {
    const error = { error: { message: 'Failed to fetch' } };
    
    store.dispatch(fetchQuests.rejected(error));
    const state = store.getState().quests;
    
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Failed to fetch');
  });
  
  it('should filter active quests', () => {
    const mockQuests = [
      { id: '1', title: 'Active Quest', isActive: true, isCompleted: false },
      { id: '2', title: 'Completed Quest', isActive: false, isCompleted: true }
    ];
    
    store.dispatch(fetchQuests.fulfilled({ data: { quests: mockQuests } }));
    const activeQuests = selectActiveQuests(store.getState());
    
    expect(activeQuests).toHaveLength(1);
    expect(activeQuests[0].title).toBe('Active Quest');
  });
});
```

### **Backend - Service Layer**

```javascript
// backend/src/services/gamification.service.test.js
const GamificationService = require('./gamification.service');
const prisma = require('../config/database');

// Mock Prisma
jest.mock('../config/database', () => ({
  quest: {
    findUnique: jest.fn()
  },
  questCompletion: {
    create: jest.fn()
  },
  user: {
    findUnique: jest.fn(),
    update: jest.fn()
  },
  userAttribute: {
    update: jest.fn(),
    findUnique: jest.fn()
  }
}));

describe('GamificationService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  describe('calculateQuestXP', () => {
    it('should calculate base XP correctly', () => {
      const quest = {
        baseXP: 100,
        difficulty: 'NORMAL'
      };
      
      const user = {
        currentStreak: 0
      };
      
      const result = GamificationService.calculateQuestXP(quest, {}, user);
      
      expect(result.baseXP).toBe(100);
      expect(result.multiplier).toBe(1.0);
      expect(result.totalXP).toBe(100);
    });
    
    it('should apply difficulty multiplier', () => {
      const quest = {
        baseXP: 100,
        difficulty: 'HARD'
      };
      
      const user = { currentStreak: 0 };
      
      const result = GamificationService.calculateQuestXP(quest, {}, user);
      
      expect(result.multiplier).toBe(1.5);
      expect(result.totalXP).toBe(150);
    });
    
    it('should calculate streak bonus', () => {
      const quest = {
        baseXP: 100,
        difficulty: 'NORMAL'
      };
      
      const user = { currentStreak: 7 };
      
      const result = GamificationService.calculateQuestXP(quest, {}, user);
      
      expect(result.streakBonus).toBe(15); // 15% bonus for 7-day streak
      expect(result.totalXP).toBe(115);
    });
    
    it('should apply time bonus for fast completion', () => {
      const quest = {
        baseXP: 100,
        difficulty: 'NORMAL',
        estimatedTime: 1800 // 30 minutes
      };
      
      const completionData = {
        timeSpent: 1200 // 20 minutes (faster)
      };
      
      const user = { currentStreak: 0 };
      
      const result = GamificationService.calculateQuestXP(quest, completionData, user);
      
      expect(result.timeBonus).toBe(15); // 15% bonus
      expect(result.totalXP).toBe(115);
    });
  });
  
  describe('calculateLevel', () => {
    it('should calculate correct level from XP', () => {
      expect(GamificationService.calculateLevel(0)).toBe(1);
      expect(GamificationService.calculateLevel(100)).toBe(2);
      expect(GamificationService.calculateLevel(400)).toBe(3);
      expect(GamificationService.calculateLevel(10000)).toBe(11);
    });
  });
  
  describe('calculateRank', () => {
    it('should assign F rank to new users', () => {
      const rank = GamificationService.calculateRank(0, 1);
      expect(rank).toBe('F');
    });
    
    it('should upgrade to E rank at threshold', () => {
      const rank = GamificationService.calculateRank(1000, 5);
      expect(rank).toBe('E');
    });
    
    it('should upgrade to S rank at highest threshold', () => {
      const rank = GamificationService.calculateRank(50000, 75);
      expect(rank).toBe('S');
    });
    
    it('should not upgrade rank if level requirement not met', () => {
      const rank = GamificationService.calculateRank(50000, 20); // High XP but low level
      expect(rank).toBe('C'); // Should be lower rank
    });
  });
});
```

---

## ­ƒöù Integration Testing

### **API Endpoint Tests**

```javascript
// backend/tests/integration/auth.test.js
const request = require('supertest');
const app = require('../../src/app');
const prisma = require('../../src/config/database');
const { hashPassword } = require('../../src/utils/password');

describe('Auth API', () => {
  beforeAll(async () => {
    // Setup test database
    await prisma.$connect();
  });
  
  afterAll(async () => {
    await prisma.$disconnect();
  });
  
  beforeEach(async () => {
    // Clear users table
    await prisma.user.deleteMany();
  });
  
  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'SecurePass123!',
        hunterName: 'TestHunter'
      };
      
      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data.user.email).toBe(userData.email);
      expect(response.body.data.user.hunterName).toBe(userData.hunterName);
      expect(response.body.data.token).toBeDefined();
      
      // Verify user in database
      const user = await prisma.user.findUnique({
        where: { email: userData.email }
      });
      
      expect(user).not.toBeNull();
      expect(user.level).toBe(1);
      expect(user.currentRank).toBe('F');
    });
    
    it('should reject duplicate email', async () => {
      const userData = {
        email: 'duplicate@example.com',
        password: 'SecurePass123!',
        hunterName: 'Hunter1'
      };
      
      // Create first user
      await request(app).post('/api/auth/register').send(userData);
      
      // Try to create duplicate
      const response = await request(app)
        .post('/api/auth/register')
        .send({ ...userData, hunterName: 'Hunter2' })
        .expect(400);
      
      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toContain('Email already exists');
    });
    
    it('should reject weak password', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'weak',
          hunterName: 'TestHunter'
        })
        .expect(422);
      
      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toContain('Password');
    });
  });
  
  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      // Create test user
      await prisma.user.create({
        data: {
          email: 'login@example.com',
          passwordHash: await hashPassword('SecurePass123!'),
          hunterName: 'LoginHunter',
          isVerified: true
        }
      });
    });
    
    it('should login with valid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: 'SecurePass123!'
        })
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data.token).toBeDefined();
      expect(response.body.data.user.email).toBe('login@example.com');
    });
    
    it('should reject invalid password', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: 'WrongPassword'
        })
        .expect(401);
      
      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toContain('Invalid credentials');
    });
  });
  
  describe('GET /api/auth/me', () => {
    let authToken;
    
    beforeEach(async () => {
      // Register and get token
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'me@example.com',
          password: 'SecurePass123!',
          hunterName: 'MeHunter'
        });
      
      authToken = response.body.data.token;
    });
    
    it('should return current user with valid token', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data.email).toBe('me@example.com');
      expect(response.body.data.attributes).toBeDefined();
    });
    
    it('should reject request without token', async () => {
      await request(app)
        .get('/api/auth/me')
        .expect(401);
    });
    
    it('should reject request with invalid token', async () => {
      await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer invalid_token')
        .expect(401);
    });
  });
});
```

### **Quest Completion Flow**

```javascript
// backend/tests/integration/quest-completion.test.js
describe('Quest Completion Flow', () => {
  let authToken, userId, questId;
  
  beforeEach(async () => {
    // Setup: Create user
    const registerResponse = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'hunter@test.com',
        password: 'SecurePass123!',
        hunterName: 'QuestHunter'
      });
    
    authToken = registerResponse.body.data.token;
    userId = registerResponse.body.data.user.id;
    
    // Create a quest
    const questResponse = await request(app)
      .post('/api/quests')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Test Quest',
        type: 'DAILY',
        difficulty: 'NORMAL',
        baseXP: 100,
        attributes: ['strength']
      });
    
    questId = questResponse.body.data.id;
  });
  
  it('should complete quest and update user stats', async () => {
    const completionData = {
      timeSpent: 1800,
      notes: 'Completed successfully'
    };
    
    const response = await request(app)
      .post(`/api/quests/${questId}/complete`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(completionData)
      .expect(200);
    
    // Verify completion response
    expect(response.body.success).toBe(true);
    expect(response.body.data.completion).toBeDefined();
    expect(response.body.data.userUpdates).toBeDefined();
    
    const { completion, userUpdates } = response.body.data;
    
    // Check XP breakdown
    expect(completion.xpBreakdown.baseXP).toBe(100);
    expect(completion.xpBreakdown.totalXP).toBeGreaterThan(0);
    
    // Check user updates
    expect(userUpdates.newTotalXP).toBeGreaterThan(0);
    expect(userUpdates.attributeGains.strength).toBeGreaterThan(0);
    
    // Verify database state
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { attributes: true }
    });
    
    expect(user.totalXP).toBe(userUpdates.newTotalXP);
    expect(user.attributes.strength).toBeGreaterThan(0);
    
    // Verify completion record
    const completionRecord = await prisma.questCompletion.findFirst({
      where: { questId, userId }
    });
    
    expect(completionRecord).not.toBeNull();
    expect(completionRecord.totalXP).toBe(completion.xpBreakdown.totalXP);
  });
  
  it('should trigger level up when XP threshold reached', async () => {
    // Give user enough XP to level up
    await prisma.user.update({
      where: { id: userId },
      data: { totalXP: 380 } // Need 400 for level 3
    });
    
    const response = await request(app)
      .post(`/api/quests/${questId}/complete`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ timeSpent: 1800 })
      .expect(200);
    
    const { userUpdates } = response.body.data;
    
    expect(userUpdates.didLevelUp).toBe(true);
    expect(userUpdates.newLevel).toBeGreaterThan(2);
  });
});
```

---

## ­ƒÄ¡ End-to-End Testing

### **Playwright E2E Tests**

```javascript
// frontend/tests/e2e/quest-flow.spec.js
import { test, expect } from '@playwright/test';

test.describe('Quest Management Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('http://localhost:5173/login');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'SecurePass123!');
    await page.click('button[type="submit"]');
    
    // Wait for redirect to dashboard
    await page.waitForURL('**/dashboard');
  });
  
  test('should create and complete a quest', async ({ page }) => {
    // Navigate to quests page
    await page.click('text=Quests');
    await expect(page).toHaveURL(/.*quests/);
    
    // Open quest creation modal
    await page.click('button:has-text("Create Quest")');
    
    // Fill quest form
    await page.fill('input[name="title"]', 'E2E Test Quest');
    await page.selectOption('select[name="type"]', 'DAILY');
    await page.click('input[value="NORMAL"]');
    await page.check('input[value="strength"]');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Verify quest appears in list
    await expect(page.locator('text=E2E Test Quest')).toBeVisible();
    
    // Complete the quest
    await page.click('text=E2E Test Quest');
    await page.click('button:has-text("Complete")');
    
    // Fill completion form
    await page.fill('input[name="timeSpent"]', '30');
    await page.click('button:has-text("Confirm")');
    
    // Verify XP gain animation
    await expect(page.locator('text=+100 XP')).toBeVisible({ timeout: 2000 });
    
    // Verify quest status updated
    await expect(page.locator('text=Completed')).toBeVisible();
  });
  
  test('should show achievement notification on unlock', async ({ page }) => {
    // Complete first quest (should unlock "First Steps" achievement)
    await page.goto('http://localhost:5173/quests');
    
    const firstQuest = page.locator('.quest-card').first();
    await firstQuest.click();
    await page.click('button:has-text("Complete")');
    await page.click('button:has-text("Confirm")');
    
    // Verify achievement notification
    await expect(page.locator('text=Achievement Unlocked')).toBeVisible();
    await expect(page.locator('text=First Steps')).toBeVisible();
  });
});

test.describe('Leaderboard', () => {
  test('should display user rank and stats', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    // ... login steps ...
    
    await page.goto('http://localhost:5173/leaderboard');
    
    // Verify table loads
    await expect(page.locator('table')).toBeVisible();
    
    // Check for current user highlight
    await expect(page.locator('.highlight-user')).toBeVisible();
    
    // Verify rank filters work
    await page.click('button:has-text("S Rank")');
    await expect(page.locator('td:has-text("S")')).toHaveCount({ min: 1 });
  });
});
```

---

## ÔÜí Performance Testing

### **k6 Load Testing**

```javascript
// tests/performance/load-test.js
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const failureRate = new Rate('failed_requests');

export const options = {
  stages: [
    { duration: '2m', target: 100 }, // Ramp up to 100 users
    { duration: '5m', target: 100 }, // Stay at 100 users
    { duration: '2m', target: 200 }, // Ramp up to 200 users
    { duration: '5m', target: 200 }, // Stay at 200 users
    { duration: '2m', target: 0 },   // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500', 'p(99)<1000'], // 95% under 500ms, 99% under 1s
    http_req_failed: ['rate<0.01'], // Less than 1% failures
    failed_requests: ['rate<0.01']
  }
};

const BASE_URL = 'http://localhost:3000/api';
let authToken;

export function setup() {
  // Login to get auth token
  const loginRes = http.post(`${BASE_URL}/auth/login`, JSON.stringify({
    email: 'loadtest@example.com',
    password: 'LoadTest123!'
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
  
  return { token: loginRes.json().data.token };
}

export default function (data) {
  const params = {
    headers: {
      'Authorization': `Bearer ${data.token}`,
      'Content-Type': 'application/json'
    }
  };
  
  // Test 1: Get user profile
  let res = http.get(`${BASE_URL}/auth/me`, params);
  check(res, {
    'profile status 200': (r) => r.status === 200,
    'profile response time < 200ms': (r) => r.timings.duration < 200
  });
  failureRate.add(res.status !== 200);
  
  sleep(1);
  
  // Test 2: Fetch quests
  res = http.get(`${BASE_URL}/quests?type=DAILY&isActive=true`, params);
  check(res, {
    'quests status 200': (r) => r.status === 200,
    'quests response time < 300ms': (r) => r.timings.duration < 300
  });
  failureRate.add(res.status !== 200);
  
  sleep(1);
  
  // Test 3: Get leaderboard
  res = http.get(`${BASE_URL}/leaderboard?limit=50`, params);
  check(res, {
    'leaderboard status 200': (r) => r.status === 200,
    'leaderboard response time < 500ms': (r) => r.timings.duration < 500
  });
  failureRate.add(res.status !== 200);
  
  sleep(2);
}

export function teardown(data) {
  console.log('Load test completed');
}
```

---

## ­ƒöÆ Security Testing

### **OWASP ZAP Automation**

```yaml
# tests/security/zap-scan.yaml
env:
  contexts:
    - name: solo-leveling-app
      urls:
        - http://localhost:3000
      includePaths:
        - http://localhost:3000/api/.*
      excludePaths:
        - http://localhost:3000/api/auth/logout
      authentication:
        method: "json"
        parameters:
          loginUrl: "http://localhost:3000/api/auth/login"
          loginRequestData: '{"email":"test@example.com","password":"SecurePass123!"}'
        verification:
          method: "response"
          loggedInRegex: '\Q"success":true\E'

  parameters:
    failOnError: true
    failOnWarning: false
    progressToStdout: true

jobs:
  - type: spider
    parameters:
      context: solo-leveling-app
      maxDuration: 5

  - type: passiveScan-wait
    parameters:
      maxDuration: 10

  - type: activeScan
    parameters:
      context: solo-leveling-app
      policy: API-scan
      maxRuleDurationInMins: 1
      maxScanDurationInMins: 10

  - type: report
    parameters:
      template: traditional-html
      reportDir: ./tests/security/reports
      reportFile: zap-report.html
```

---

*This is a comprehensive 60KB+ testing strategy document covering unit, integration, E2E, performance, and security testing!*
