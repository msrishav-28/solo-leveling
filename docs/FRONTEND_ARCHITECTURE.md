# ­ƒÄ¿ Frontend Architecture - Solo Leveling Habit Tracker

**Version:** 2.0  
**Last Updated:** November 4, 2025  
**Author:** M S Rishav Subhin

---

## ­ƒôæ Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Redux Store Structure](#redux-store-structure)
3. [Component Organization](#component-organization)
4. [API Service Layer](#api-service-layer)
5. [Routing & Navigation](#routing--navigation)
6. [Form Validation](#form-validation)
7. [Error Handling](#error-handling)
8. [Performance Optimization](#performance-optimization)
9. [State Management Patterns](#state-management-patterns)
10. [Testing Strategy](#testing-strategy)

---

## ­ƒÅù´©Å Architecture Overview

### **Tech Stack**
```yaml
Framework: React 18.2.0
Build Tool: Vite 5.0.0
State Management: Redux Toolkit 2.6.1
Routing: React Router 7.1.1
Styling: Tailwind CSS 3.4.6
Animations: Framer Motion 10.16.4
HTTP Client: Axios 1.6.7
Forms: React Hook Form 7.50.0
Validation: Zod 3.22.4
WebSocket: Socket.IO Client 4.5.0
Charts: Recharts 2.5.0
Icons: Lucide React 0.312.0
```

### **Project Structure (Enhanced)**
```
src/
Ôö£ÔöÇÔöÇ app/
Ôöé   Ôö£ÔöÇÔöÇ store.js                    # Redux store configuration
Ôöé   ÔööÔöÇÔöÇ hooks.js                    # Typed hooks (useAppDispatch, useAppSelector)
Ôö£ÔöÇÔöÇ features/
Ôöé   Ôö£ÔöÇÔöÇ auth/
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ authSlice.js
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ authAPI.js
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ LoginPage.jsx
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ RegisterPage.jsx
Ôöé   Ôöé   ÔööÔöÇÔöÇ components/
Ôöé   Ôöé       Ôö£ÔöÇÔöÇ OAuthButtons.jsx
Ôöé   Ôöé       Ôö£ÔöÇÔöÇ PasswordStrength.jsx
Ôöé   Ôöé       ÔööÔöÇÔöÇ EmailVerification.jsx
Ôöé   Ôö£ÔöÇÔöÇ quests/
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ questsSlice.js
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ questsAPI.js
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ QuestsPage.jsx
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ QuestCreationModal.jsx
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ QuestCompletionModal.jsx
Ôöé   Ôöé   ÔööÔöÇÔöÇ components/
Ôöé   Ôöé       Ôö£ÔöÇÔöÇ QuestCard.jsx
Ôöé   Ôöé       Ôö£ÔöÇÔöÇ QuestFilters.jsx
Ôöé   Ôöé       Ôö£ÔöÇÔöÇ QuestTemplates.jsx
Ôöé   Ôöé       ÔööÔöÇÔöÇ NLPQuestInput.jsx
Ôöé   Ôö£ÔöÇÔöÇ user/
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ userSlice.js
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ userAPI.js
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ ProfilePage.jsx
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ SettingsPage.jsx
Ôöé   Ôöé   ÔööÔöÇÔöÇ components/
Ôöé   Ôöé       Ôö£ÔöÇÔöÇ AttributeRings.jsx
Ôöé   Ôöé       Ôö£ÔöÇÔöÇ RankBadge.jsx
Ôöé   Ôöé       ÔööÔöÇÔöÇ StatsCard.jsx
Ôöé   Ôö£ÔöÇÔöÇ leaderboard/
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ leaderboardSlice.js
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ leaderboardAPI.js
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ LeaderboardPage.jsx
Ôöé   Ôöé   ÔööÔöÇÔöÇ components/
Ôöé   Ôöé       Ôö£ÔöÇÔöÇ LeaderboardTable.jsx
Ôöé   Ôöé       Ôö£ÔöÇÔöÇ RankFilters.jsx
Ôöé   Ôöé       ÔööÔöÇÔöÇ SearchBar.jsx
Ôöé   Ôö£ÔöÇÔöÇ notifications/
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ notificationsSlice.js
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ notificationsAPI.js
Ôöé   Ôöé   ÔööÔöÇÔöÇ components/
Ôöé   Ôöé       Ôö£ÔöÇÔöÇ NotificationBell.jsx
Ôöé   Ôöé       Ôö£ÔöÇÔöÇ NotificationList.jsx
Ôöé   Ôöé       ÔööÔöÇÔöÇ NotificationItem.jsx
Ôöé   ÔööÔöÇÔöÇ achievements/
Ôöé       Ôö£ÔöÇÔöÇ achievementsSlice.js
Ôöé       Ôö£ÔöÇÔöÇ achievementsAPI.js
Ôöé       ÔööÔöÇÔöÇ components/
Ôöé           Ôö£ÔöÇÔöÇ AchievementCard.jsx
Ôöé           Ôö£ÔöÇÔöÇ AchievementModal.jsx
Ôöé           ÔööÔöÇÔöÇ ProgressTracker.jsx
Ôö£ÔöÇÔöÇ services/
Ôöé   Ôö£ÔöÇÔöÇ api.js                      # Axios instance with interceptors
Ôöé   Ôö£ÔöÇÔöÇ websocket.js                # Socket.IO client
Ôöé   Ôö£ÔöÇÔöÇ storage.js                  # LocalStorage/SessionStorage wrapper
Ôöé   ÔööÔöÇÔöÇ analytics.js                # Analytics tracking
Ôö£ÔöÇÔöÇ components/
Ôöé   Ôö£ÔöÇÔöÇ ui/                         # Reusable UI components
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ Button.jsx
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ Input.jsx
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ Select.jsx
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ Modal.jsx
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ Toast.jsx
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ Spinner.jsx
Ôöé   Ôöé   ÔööÔöÇÔöÇ Skeleton.jsx
Ôöé   Ôö£ÔöÇÔöÇ layout/
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ Header.jsx
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ Sidebar.jsx
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ Footer.jsx
Ôöé   Ôöé   ÔööÔöÇÔöÇ AppLayout.jsx
Ôöé   Ôö£ÔöÇÔöÇ ErrorBoundary.jsx
Ôöé   ÔööÔöÇÔöÇ ProtectedRoute.jsx
Ôö£ÔöÇÔöÇ hooks/
Ôöé   Ôö£ÔöÇÔöÇ useAuth.js
Ôöé   Ôö£ÔöÇÔöÇ useWebSocket.js
Ôöé   Ôö£ÔöÇÔöÇ useDebounce.js
Ôöé   Ôö£ÔöÇÔöÇ useLocalStorage.js
Ôöé   Ôö£ÔöÇÔöÇ useInfiniteScroll.js
Ôöé   ÔööÔöÇÔöÇ useOptimistic.js
Ôö£ÔöÇÔöÇ utils/
Ôöé   Ôö£ÔöÇÔöÇ validators.js               # Zod schemas
Ôöé   Ôö£ÔöÇÔöÇ formatters.js               # Date, number formatting
Ôöé   Ôö£ÔöÇÔöÇ constants.js
Ôöé   Ôö£ÔöÇÔöÇ helpers.js
Ôöé   ÔööÔöÇÔöÇ cn.js                       # className utility
Ôö£ÔöÇÔöÇ styles/
Ôöé   Ôö£ÔöÇÔöÇ index.css
Ôöé   ÔööÔöÇÔöÇ tailwind.css
Ôö£ÔöÇÔöÇ types/                          # TypeScript types (if migrating)
Ôöé   ÔööÔöÇÔöÇ index.d.ts
Ôö£ÔöÇÔöÇ App.jsx
Ôö£ÔöÇÔöÇ Routes.jsx
ÔööÔöÇÔöÇ index.jsx
```

---

## ­ƒùâ´©Å Redux Store Structure

### **Store Configuration**

```javascript
// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

// Reducers
import authReducer from '../features/auth/authSlice';
import questsReducer from '../features/quests/questsSlice';
import userReducer from '../features/user/userSlice';
import leaderboardReducer from '../features/leaderboard/leaderboardSlice';
import notificationsReducer from '../features/notifications/notificationsSlice';
import achievementsReducer from '../features/achievements/achievementsSlice';

// Middleware
import { apiMiddleware } from '../services/api';
import { websocketMiddleware } from '../services/websocket';

const store = configureStore({
  reducer: {
    auth: authReducer,
    quests: questsReducer,
    user: userReducer,
    leaderboard: leaderboardReducer,
    notifications: notificationsReducer,
    achievements: achievementsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore websocket actions
        ignoredActions: ['websocket/connected', 'websocket/disconnected'],
        ignoredPaths: ['websocket.socket']
      }
    }).concat(apiMiddleware, websocketMiddleware),
  devTools: process.env.NODE_ENV !== 'production'
});

// Enable listener behavior for RTK Query
setupListeners(store.dispatch);

export default store;
```

```javascript
// app/hooks.js
import { useDispatch, useSelector } from 'react-redux';

// Typed hooks for better TypeScript support
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
```

### **Auth Slice**

```javascript
// features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authAPI from './authAPI';
import { setToken, removeToken, getToken } from '../../services/storage';

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(credentials);
      setToken(response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authAPI.register(userData);
      setToken(response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.getCurrentUser();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    removeToken();
    // Additional cleanup
  }
);

// Initial state
const initialState = {
  user: null,
  token: getToken(),
  isAuthenticated: !!getToken(),
  loading: false,
  error: null
};

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
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
        state.error = action.payload?.error?.message || 'Login failed';
      })
      
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error?.message || 'Registration failed';
      })
      
      // Fetch current user
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.isAuthenticated = true;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        removeToken();
      })
      
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  }
});

export const { clearError, updateUser } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectAuth = (state) => state.auth;
export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
```

### **Quests Slice**

```javascript
// features/quests/questsSlice.js
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import questsAPI from './questsAPI';

// Entity adapter for normalized state
const questsAdapter = createEntityAdapter({
  selectId: (quest) => quest.id,
  sortComparer: (a, b) => {
    // Sort by deadline, then by creation date
    if (a.deadline && b.deadline) {
      return new Date(a.deadline) - new Date(b.deadline);
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  }
});

// Async thunks
export const fetchQuests = createAsyncThunk(
  'quests/fetchAll',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await questsAPI.getQuests(filters);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createQuest = createAsyncThunk(
  'quests/create',
  async (questData, { rejectWithValue }) => {
    try {
      const response = await questsAPI.createQuest(questData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const completeQuest = createAsyncThunk(
  'quests/complete',
  async ({ questId, completionData }, { rejectWithValue, dispatch }) => {
    try {
      const response = await questsAPI.completeQuest(questId, completionData);
      
      // Update user stats optimistically
      dispatch(updateUser(response.data.userUpdates));
      
      // Show achievement notifications
      if (response.data.achievements?.length > 0) {
        dispatch(showAchievements(response.data.achievements));
      }
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteQuest = createAsyncThunk(
  'quests/delete',
  async (questId, { rejectWithValue }) => {
    try {
      await questsAPI.deleteQuest(questId);
      return questId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial state
const initialState = questsAdapter.getInitialState({
  loading: false,
  error: null,
  filters: {
    type: 'all',
    isActive: true
  },
  selectedQuest: null,
  completionInProgress: null
});

// Slice
const questsSlice = createSlice({
  name: 'quests',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    selectQuest: (state, action) => {
      state.selectedQuest = action.payload;
    },
    clearSelectedQuest: (state) => {
      state.selectedQuest = null;
    },
    // Optimistic update
    optimisticComplete: (state, action) => {
      const { questId } = action.payload;
      questsAdapter.updateOne(state, {
        id: questId,
        changes: { isCompleted: true }
      });
      state.completionInProgress = questId;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch quests
      .addCase(fetchQuests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuests.fulfilled, (state, action) => {
        state.loading = false;
        questsAdapter.setAll(state, action.payload.data.quests);
      })
      .addCase(fetchQuests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error?.message || 'Failed to fetch quests';
      })
      
      // Create quest
      .addCase(createQuest.pending, (state) => {
        state.loading = true;
      })
      .addCase(createQuest.fulfilled, (state, action) => {
        state.loading = false;
        questsAdapter.addOne(state, action.payload.data);
      })
      .addCase(createQuest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error?.message || 'Failed to create quest';
      })
      
      // Complete quest
      .addCase(completeQuest.pending, (state) => {
        state.loading = true;
      })
      .addCase(completeQuest.fulfilled, (state, action) => {
        state.loading = false;
        state.completionInProgress = null;
        
        // Update quest completion count
        const questId = action.meta.arg.questId;
        const quest = state.entities[questId];
        
        if (quest) {
          questsAdapter.updateOne(state, {
            id: questId,
            changes: {
              isCompleted: quest.type === 'ONE_TIME',
              completionsTotal: (quest.completionsTotal || 0) + 1
            }
          });
        }
      })
      .addCase(completeQuest.rejected, (state, action) => {
        state.loading = false;
        state.completionInProgress = null;
        state.error = action.payload?.error?.message || 'Failed to complete quest';
        
        // Revert optimistic update
        const questId = action.meta.arg.questId;
        questsAdapter.updateOne(state, {
          id: questId,
          changes: { isCompleted: false }
        });
      })
      
      // Delete quest
      .addCase(deleteQuest.fulfilled, (state, action) => {
        questsAdapter.removeOne(state, action.payload);
      });
  }
});

export const { setFilters, selectQuest, clearSelectedQuest, optimisticComplete } = questsSlice.actions;
export default questsSlice.reducer;

// Selectors
export const {
  selectAll: selectAllQuests,
  selectById: selectQuestById,
  selectIds: selectQuestIds
} = questsAdapter.getSelectors((state) => state.quests);

export const selectActiveQuests = (state) => {
  return selectAllQuests(state).filter(quest => quest.isActive && !quest.isCompleted);
};

export const selectQuestsByType = (type) => (state) => {
  return selectAllQuests(state).filter(quest => quest.type === type);
};

export const selectQuestsLoading = (state) => state.quests.loading;
export const selectQuestsError = (state) => state.quests.error;
```

### **User Slice**

```javascript
// features/user/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userAPI from './userAPI';

export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userAPI.getProfile();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserSettings = createAsyncThunk(
  'user/updateSettings',
  async (settings, { rejectWithValue }) => {
    try {
      const response = await userAPI.updateSettings(settings);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchXPHistory = createAsyncThunk(
  'user/fetchXPHistory',
  async (period = '30days', { rejectWithValue }) => {
    try {
      const response = await userAPI.getXPHistory(period);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  profile: null,
  attributes: null,
  settings: null,
  xpHistory: null,
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    updateAttributes: (state, action) => {
      state.attributes = { ...state.attributes, ...action.payload };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.data;
        state.attributes = action.payload.data.attributes;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error?.message;
      })
      
      .addCase(updateUserSettings.fulfilled, (state, action) => {
        state.settings = action.payload.data;
      })
      
      .addCase(fetchXPHistory.fulfilled, (state, action) => {
        state.xpHistory = action.payload.data;
      });
  }
});

export const { updateProfile, updateAttributes } = userSlice.actions;
export default userSlice.reducer;

// Selectors
export const selectUserProfile = (state) => state.user.profile;
export const selectUserAttributes = (state) => state.user.attributes;
export const selectUserSettings = (state) => state.user.settings;
export const selectXPHistory = (state) => state.user.xpHistory;
```

---

## ­ƒöî API Service Layer

### **Axios Instance with Interceptors**

```javascript
// services/api.js
import axios from 'axios';
import { getToken, removeToken } from './storage';
import store from '../app/store';
import { logout } from '../features/auth/authSlice';

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log request in development
    if (import.meta.env.DEV) {
      console.log(`[API] ${config.method.toUpperCase()} ${config.url}`, config.data);
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Log response in development
    if (import.meta.env.DEV) {
      console.log(`[API] Response:`, response.data);
    }
    
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      
      // Handle 401 Unauthorized
      if (status === 401) {
        removeToken();
        store.dispatch(logout());
        window.location.href = '/login';
      }
      
      // Handle 403 Forbidden
      if (status === 403) {
        // Show toast notification
        console.error('Access forbidden');
      }
      
      // Handle 500 Server Error
      if (status >= 500) {
        console.error('Server error:', data);
      }
      
      // Log error in development
      if (import.meta.env.DEV) {
        console.error(`[API] Error ${status}:`, data);
      }
    } else if (error.request) {
      // Network error
      console.error('Network error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Middleware for Redux
export const apiMiddleware = (store) => (next) => (action) => {
  // Track API calls
  if (action.type.endsWith('/pending')) {
    console.log('API call started:', action.type);
  }
  
  if (action.type.endsWith('/fulfilled')) {
    console.log('API call successful:', action.type);
  }
  
  if (action.type.endsWith('/rejected')) {
    console.error('API call failed:', action.type, action.error);
  }
  
  return next(action);
};

export default api;
```

### **Quest API Service**

```javascript
// features/quests/questsAPI.js
import api from '../../services/api';

const questsAPI = {
  getQuests: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return api.get(`/quests?${params}`);
  },
  
  getQuestById: (id) => {
    return api.get(`/quests/${id}`);
  },
  
  createQuest: (questData) => {
    return api.post('/quests', questData);
  },
  
  createQuestFromText: (text) => {
    return api.post('/quests/create-from-text', { text });
  },
  
  updateQuest: (id, updates) => {
    return api.patch(`/quests/${id}`, updates);
  },
  
  deleteQuest: (id) => {
    return api.delete(`/quests/${id}`);
  },
  
  completeQuest: (id, completionData) => {
    return api.post(`/quests/${id}/complete`, completionData);
  },
  
  getQuestRecommendations: (count = 10) => {
    return api.get(`/quests/recommendations?count=${count}`);
  }
};

export default questsAPI;
```

---

## ­ƒøú´©Å Routing & Navigation

### **Protected Routes**

```javascript
// components/ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../features/auth/authSlice';
import Spinner from './ui/Spinner';

export default function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();
  const { loading } = useSelector(state => state.auth);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }
  
  if (!isAuthenticated) {
    // Redirect to login, save attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
}
```

### **Routes Configuration**

```javascript
// Routes.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import ProtectedRoute from 'components/ProtectedRoute';
import Spinner from 'components/ui/Spinner';

// Lazy load pages
const LandingPage = lazy(() => import('pages/landing-page'));
const Dashboard = lazy(() => import('pages/dashboard'));
const LoginPage = lazy(() => import('features/auth/LoginPage'));
const RegisterPage = lazy(() => import('features/auth/RegisterPage'));
const QuestsPage = lazy(() => import('features/quests/QuestsPage'));
const ProfilePage = lazy(() => import('features/user/ProfilePage'));
const SettingsPage = lazy(() => import('features/user/SettingsPage'));
const LeaderboardPage = lazy(() => import('features/leaderboard/LeaderboardPage'));
const NotFoundPage = lazy(() => import('pages/NotFound'));

function AppRoutes() {
  return (
    <Suspense fallback={<Spinner fullScreen />}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/auth/callback" element={<OAuthCallback />} />
        
        {/* Protected routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/quests" element={
          <ProtectedRoute>
            <QuestsPage />
          </ProtectedRoute>
        } />
        
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
        
        <Route path="/settings" element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        } />
        
        <Route path="/leaderboard" element={
          <ProtectedRoute>
            <LeaderboardPage />
          </ProtectedRoute>
        } />
        
        {/* 404 */}
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
```

---

## Ô£à Form Validation with React Hook Form & Zod

### **Quest Creation Form**

```javascript
// features/quests/QuestCreationModal.jsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch } from 'react-redux';
import { createQuest } from './questsSlice';

// Validation schema
const questSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),
  description: z.string().optional(),
  type: z.enum(['DAILY', 'RECURRING', 'ONE_TIME']),
  difficulty: z.enum(['EASY', 'NORMAL', 'HARD']),
  attributes: z.array(z.string()).min(1, 'Select at least one attribute'),
  reminderTime: z.string().optional(),
  frequency: z.enum(['DAILY', 'WEEKLY', 'CUSTOM']).optional(),
  deadline: z.string().optional()
});

export default function QuestCreationModal({ onClose }) {
  const dispatch = useDispatch();
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(questSchema),
    defaultValues: {
      type: 'DAILY',
      difficulty: 'NORMAL',
      attributes: []
    }
  });
  
  const onSubmit = async (data) => {
    try {
      await dispatch(createQuest(data)).unwrap();
      onClose();
    } catch (error) {
      console.error('Failed to create quest:', error);
    }
  };
  
  const questType = watch('type');
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Quest Title
        </label>
        <input
          {...register('title')}
          className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-gray-700"
          placeholder="Enter quest title..."
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>
      
      {/* Type */}
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Quest Type
        </label>
        <select {...register('type')} className="w-full px-4 py-3 rounded-lg bg-dark-200">
          <option value="DAILY">Daily Quest</option>
          <option value="RECURRING">Recurring Quest</option>
          <option value="ONE_TIME">One-Time Quest</option>
        </select>
      </div>
      
      {/* Difficulty */}
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Difficulty
        </label>
        <div className="flex gap-4">
          {['EASY', 'NORMAL', 'HARD'].map((diff) => (
            <label key={diff} className="flex items-center">
              <input
                {...register('difficulty')}
                type="radio"
                value={diff}
                className="mr-2"
              />
              <span className={`
                px-3 py-1 rounded-full text-sm
                ${diff === 'EASY' ? 'bg-green-500/20 text-green-400' : ''}
                ${diff === 'NORMAL' ? 'bg-yellow-500/20 text-yellow-400' : ''}
                ${diff === 'HARD' ? 'bg-red-500/20 text-red-400' : ''}
              `}>
                {diff}
              </span>
            </label>
          ))}
        </div>
        {errors.difficulty && (
          <p className="mt-1 text-sm text-red-500">{errors.difficulty.message}</p>
        )}
      </div>
      
      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600"
      >
        {isSubmitting ? 'Creating...' : 'Create Quest'}
      </button>
    </form>
  );
}
```

---

## ­ƒöÑ WebSocket Integration

```javascript
// services/websocket.js
import { io } from 'socket.io-client';
import { getToken } from './storage';
import store from '../app/store';
import { addNotification } from '../features/notifications/notificationsSlice';
import { updateLeaderboard } from '../features/leaderboard/leaderboardSlice';

class WebSocketService {
  constructor() {
    this.socket = null;
    this.connected = false;
  }
  
  connect() {
    const token = getToken();
    
    if (!token) {
      console.warn('No auth token, skipping WebSocket connection');
      return;
    }
    
    this.socket = io(import.meta.env.VITE_WS_URL || 'http://localhost:3000', {
      auth: { token },
      transports: ['websocket']
    });
    
    this.setupListeners();
  }
  
  setupListeners() {
    this.socket.on('connect', () => {
      console.log('WebSocket connected');
      this.connected = true;
    });
    
    this.socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
      this.connected = false;
    });
    
    // Quest events
    this.socket.on('quest:completed', (data) => {
      console.log('Quest completed:', data);
      // Trigger celebration animation
    });
    
    // Achievement unlocked
    this.socket.on('achievement:unlocked', (achievement) => {
      store.dispatch(addNotification({
        type: 'ACHIEVEMENT_UNLOCKED',
        title: '­ƒÅå Achievement Unlocked!',
        message: achievement.name,
        data: achievement
      }));
    });
    
    // Leaderboard updates
    this.socket.on('leaderboard:updated', (data) => {
      store.dispatch(updateLeaderboard(data));
    });
    
    // Notifications
    this.socket.on('notification', (notification) => {
      store.dispatch(addNotification(notification));
    });
  }
  
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.connected = false;
    }
  }
  
  emit(event, data) {
    if (this.socket && this.connected) {
      this.socket.emit(event, data);
    }
  }
}

export default new WebSocketService();

// Redux middleware
export const websocketMiddleware = (store) => (next) => (action) => {
  // Connect on login
  if (action.type === 'auth/login/fulfilled') {
    websocketService.connect();
  }
  
  // Disconnect on logout
  if (action.type === 'auth/logout/fulfilled') {
    websocketService.disconnect();
  }
  
  return next(action);
};
```

---

*Continue reading in: `DEPLOYMENT_DEVOPS.md`, `TESTING_STRATEGY.md`, `FEATURE_SPECIFICATIONS.md`*
