# ­ƒñû AI/ML Integration - Solo Leveling Habit Tracker

**Version:** 2.0  
**Last Updated:** November 4, 2025  
**Author:** M S Rishav Subhin

---

## ­ƒôæ Table of Contents

1. [AI/ML Overview](#aiml-overview)
2. [Quest Recommendation Engine](#quest-recommendation-engine)
3. [Habit Prediction Model](#habit-prediction-model)
4. [NLP Quest Creation](#nlp-quest-creation)
5. [Personalized Difficulty Adjustment](#personalized-difficulty-adjustment)
6. [Analytics & Insights](#analytics--insights)
7. [User Behavior Clustering](#user-behavior-clustering)
8. [Optimal Scheduling](#optimal-scheduling)
9. [Model Deployment](#model-deployment)
10. [Performance Monitoring](#performance-monitoring)

---

## ­ƒÄ» AI/ML Overview

### **Tech Stack**
```yaml
ML Framework: TensorFlow.js / scikit-learn
NLP: OpenAI GPT-4 API / Hugging Face Transformers
Vector DB: Pinecone / Weaviate
Model Serving: FastAPI (Python microservice)
Caching: Redis
Monitoring: Prometheus + Grafana
A/B Testing: LaunchDarkly
```

### **Architecture**
```
ÔöîÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÉ
Ôöé  Node.js API    Ôöé
Ôöé  (Express)      Ôöé
ÔööÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔö¼ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÿ
         Ôöé
         Ôö£ÔöÇÔöÇÔöÇ HTTP ÔöÇÔöÇÔöÇÔöÉ
         Ôöé            Ôöé
ÔöîÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔû╝ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÉ   Ôöé
Ôöé  Redis Cache    Ôöé   Ôöé
ÔööÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÿ   Ôöé
                      Ôöé
              ÔöîÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔû╝ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÉ
              Ôöé  Python ML API Ôöé
              Ôöé  (FastAPI)     Ôöé
              ÔööÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔö¼ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÿ
                      Ôöé
         ÔöîÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔö╝ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÉ
         Ôöé            Ôöé            Ôöé
ÔöîÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔû╝ÔöÇÔöÇÔöÇÔöÇÔöÉ  ÔöîÔöÇÔöÇÔöÇÔû╝ÔöÇÔöÇÔöÇÔöÇÔöÉ  ÔöîÔöÇÔöÇÔöÇÔû╝ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÉ
Ôöé TensorFlow  Ôöé  Ôöé OpenAI Ôöé  Ôöé  Pinecone  Ôöé
Ôöé   Models    Ôöé  Ôöé   API  Ôöé  Ôöé Vector DB  Ôöé
ÔööÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÿ  ÔööÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÿ  ÔööÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÿ
```

### **Use Cases Summary**

| Feature | Model Type | Priority | Complexity |
|---------|-----------|----------|------------|
| Quest Recommendations | Collaborative Filtering | High | Medium |
| Habit Prediction | LSTM Time-Series | High | High |
| NLP Quest Creation | GPT-4 Fine-tuned | Medium | Low |
| Difficulty Adjustment | Regression | Medium | Low |
| Optimal Scheduling | Reinforcement Learning | Low | High |
| User Clustering | K-Means | Low | Low |
| Churn Prediction | XGBoost | Medium | Medium |

---

## ­ƒÄ« Quest Recommendation Engine

### **Goal**
Suggest personalized quests based on user behavior, preferences, and similar users.

### **Approach: Collaborative Filtering + Content-Based**

```python
# ml-service/models/quest_recommender.py
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.decomposition import TruncatedSVD
import pandas as pd

class QuestRecommender:
    def __init__(self):
        self.svd = TruncatedSVD(n_components=50, random_state=42)
        self.user_item_matrix = None
        self.quest_features = None
        
    def train(self, completions_data, quest_data):
        """
        Train collaborative filtering model
        
        completions_data: DataFrame with columns [user_id, quest_id, rating]
        quest_data: DataFrame with quest features
        """
        # Create user-item matrix
        self.user_item_matrix = completions_data.pivot_table(
            index='user_id',
            columns='quest_id',
            values='rating',
            fill_value=0
        )
        
        # Apply SVD for dimensionality reduction
        self.user_factors = self.svd.fit_transform(self.user_item_matrix)
        self.quest_factors = self.svd.components_
        
        # Store quest features for content-based filtering
        self.quest_features = quest_data
        
    def recommend_for_user(self, user_id, top_n=10):
        """
        Get personalized quest recommendations
        """
        if user_id not in self.user_item_matrix.index:
            # New user - use content-based only
            return self._recommend_for_cold_start(user_id, top_n)
        
        # Collaborative filtering
        user_idx = self.user_item_matrix.index.get_loc(user_id)
        user_vector = self.user_factors[user_idx]
        
        # Predict ratings for all quests
        predicted_ratings = np.dot(user_vector, self.quest_factors)
        
        # Get quests user hasn't completed
        completed_quests = self.user_item_matrix.loc[user_id]
        completed_indices = completed_quests[completed_quests > 0].index
        
        # Score and rank
        quest_scores = pd.DataFrame({
            'quest_id': self.user_item_matrix.columns,
            'score': predicted_ratings
        })
        
        # Filter out completed quests
        quest_scores = quest_scores[~quest_scores['quest_id'].isin(completed_indices)]
        
        # Hybrid: combine with content-based
        content_scores = self._content_based_scores(user_id)
        quest_scores['hybrid_score'] = (
            0.7 * quest_scores['score'] + 
            0.3 * quest_scores['quest_id'].map(content_scores)
        )
        
        # Get top recommendations
        top_quests = quest_scores.nlargest(top_n, 'hybrid_score')
        
        return self._format_recommendations(top_quests)
    
    def _content_based_scores(self, user_id):
        """
        Calculate content-based similarity scores
        """
        # Get user's completed quests
        user_quests = self.user_item_matrix.loc[user_id]
        completed = user_quests[user_quests > 0].index
        
        if len(completed) == 0:
            return {}
        
        # Get features of completed quests
        completed_features = self.quest_features[
            self.quest_features['id'].isin(completed)
        ]
        
        # Calculate average feature vector
        user_profile = completed_features.select_dtypes(include=[np.number]).mean()
        
        # Calculate similarity to all quests
        all_features = self.quest_features.select_dtypes(include=[np.number])
        similarities = cosine_similarity([user_profile], all_features)[0]
        
        return dict(zip(self.quest_features['id'], similarities))
    
    def _recommend_for_cold_start(self, user_id, top_n):
        """
        Recommend quests for new users
        """
        # Use most popular quests with user's preferred attributes
        user_prefs = self._get_user_preferences(user_id)
        
        popular_quests = self.quest_features.nlargest(top_n, 'completion_count')
        
        # Filter by user preferences
        if user_prefs.get('preferred_attributes'):
            popular_quests = popular_quests[
                popular_quests['attributes'].apply(
                    lambda x: any(attr in x for attr in user_prefs['preferred_attributes'])
                )
            ]
        
        return self._format_recommendations(popular_quests)
    
    def _format_recommendations(self, quests_df):
        """
        Format recommendations with confidence scores and reasons
        """
        recommendations = []
        
        for _, quest in quests_df.iterrows():
            recommendations.append({
                'quest_id': quest.get('quest_id', quest.get('id')),
                'title': self._generate_quest_title(quest),
                'description': self._generate_quest_description(quest),
                'type': quest.get('type', 'DAILY'),
                'difficulty': quest.get('difficulty', 'NORMAL'),
                'attributes': quest.get('attributes', []),
                'confidence': float(quest.get('hybrid_score', quest.get('score', 0.5))),
                'reason': self._generate_reason(quest)
            })
        
        return recommendations
    
    def _generate_reason(self, quest):
        """
        Generate human-readable recommendation reason
        """
        score = quest.get('hybrid_score', quest.get('score', 0))
        
        if score > 0.8:
            return "Highly recommended based on your habits"
        elif score > 0.6:
            return "Popular among similar users"
        elif score > 0.4:
            return "Helps improve your weaker attributes"
        else:
            return "New challenge to explore"
```

### **API Integration**

```javascript
// services/ai.service.js
const axios = require('axios');
const redis = require('../config/redis');

class AIService {
  constructor() {
    this.mlApiUrl = process.env.ML_API_URL || 'http://localhost:8000';
  }
  
  async getQuestRecommendations(userId, count = 10) {
    const cacheKey = `recommendations:${userId}`;
    
    // Check cache first
    const cached = await redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }
    
    try {
      // Call ML microservice
      const response = await axios.post(`${this.mlApiUrl}/recommend`, {
        user_id: userId,
        top_n: count
      }, {
        timeout: 5000
      });
      
      const recommendations = response.data.recommendations;
      
      // Cache for 1 hour
      await redis.setex(cacheKey, 3600, JSON.stringify(recommendations));
      
      // Store recommendations in database
      await this.storeRecommendations(userId, recommendations);
      
      return recommendations;
    } catch (error) {
      console.error('ML API error:', error);
      
      // Fallback to simple recommendations
      return this.getFallbackRecommendations(userId, count);
    }
  }
  
  async storeRecommendations(userId, recommendations) {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days
    
    const records = recommendations.map(rec => ({
      userId,
      title: rec.title,
      description: rec.description,
      type: rec.type,
      difficulty: rec.difficulty,
      attributes: rec.attributes,
      confidence: rec.confidence,
      reason: rec.reason,
      expiresAt
    }));
    
    await prisma.questRecommendation.createMany({
      data: records,
      skipDuplicates: true
    });
  }
  
  async getFallbackRecommendations(userId, count) {
    // Simple fallback: popular quests
    const popularQuests = await prisma.quest.groupBy({
      by: ['title', 'type', 'difficulty'],
      _count: {
        id: true
      },
      orderBy: {
        _count: {
          id: 'desc'
        }
      },
      take: count
    });
    
    return popularQuests.map(q => ({
      title: q.title,
      type: q.type,
      difficulty: q.difficulty,
      confidence: 0.5,
      reason: 'Popular quest'
    }));
  }
}

module.exports = new AIService();
```

---

## ­ƒôè Habit Prediction Model

### **Goal**
Predict when users are likely to skip quests and send proactive reminders.

### **Approach: LSTM Time-Series Model**

```python
# ml-service/models/habit_predictor.py
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
import numpy as np

class HabitPredictor:
    def __init__(self, sequence_length=14):
        """
        Predict habit completion probability
        sequence_length: number of past days to consider
        """
        self.sequence_length = sequence_length
        self.model = self._build_model()
        
    def _build_model(self):
        model = Sequential([
            LSTM(128, input_shape=(self.sequence_length, 10), return_sequences=True),
            Dropout(0.2),
            LSTM(64),
            Dropout(0.2),
            Dense(32, activation='relu'),
            Dense(1, activation='sigmoid')  # Probability of completion
        ])
        
        model.compile(
            optimizer='adam',
            loss='binary_crossentropy',
            metrics=['accuracy', 'AUC']
        )
        
        return model
    
    def prepare_features(self, user_history):
        """
        user_history: DataFrame with columns:
          - date, completed, day_of_week, hour, streak, 
          - last_7_days_avg, last_14_days_avg, total_quests
        """
        features = []
        
        for i in range(len(user_history) - self.sequence_length):
            sequence = user_history.iloc[i:i+self.sequence_length]
            
            feature_vector = np.array([
                sequence['day_of_week'].values,
                sequence['hour'].values,
                sequence['completed'].values,
                sequence['streak'].values,
                sequence['last_7_days_avg'].values,
                sequence['last_14_days_avg'].values,
                sequence['total_quests'].values,
                sequence['time_since_last_completion'].values,
                sequence['is_weekend'].values,
                sequence['is_holiday'].values
            ]).T
            
            features.append(feature_vector)
        
        return np.array(features)
    
    def train(self, user_data, validation_split=0.2):
        """
        Train the model on historical user data
        """
        X = self.prepare_features(user_data)
        y = user_data['completed'].iloc[self.sequence_length:].values
        
        history = self.model.fit(
            X, y,
            epochs=50,
            batch_size=32,
            validation_split=validation_split,
            callbacks=[
                tf.keras.callbacks.EarlyStopping(patience=5, restore_best_weights=True),
                tf.keras.callbacks.ReduceLROnPlateau(factor=0.5, patience=3)
            ]
        )
        
        return history
    
    def predict_completion_probability(self, recent_history):
        """
        Predict probability of completing quest today
        """
        X = self.prepare_features(recent_history)
        
        if len(X) == 0:
            return 0.5  # Default for new users
        
        prediction = self.model.predict(X[-1:])
        return float(prediction[0][0])
    
    def predict_next_7_days(self, recent_history):
        """
        Predict completion probabilities for next 7 days
        """
        predictions = []
        
        for day in range(7):
            prob = self.predict_completion_probability(recent_history)
            predictions.append({
                'day': day + 1,
                'probability': prob,
                'risk_level': 'high' if prob < 0.3 else 'medium' if prob < 0.6 else 'low'
            })
            
            # Simulate adding this prediction to history
            # (In production, this would be actual data)
            next_row = self._simulate_next_day(recent_history, prob)
            recent_history = pd.concat([recent_history, next_row])
        
        return predictions
```

### **Churn Prediction**

```python
# ml-service/models/churn_predictor.py
from xgboost import XGBClassifier
import pandas as pd

class ChurnPredictor:
    def __init__(self):
        self.model = XGBClassifier(
            n_estimators=100,
            max_depth=5,
            learning_rate=0.1,
            random_state=42
        )
        
    def prepare_features(self, user_data):
        """
        Extract features for churn prediction
        """
        features = pd.DataFrame({
            'days_since_last_login': user_data['days_since_last_login'],
            'total_quests_completed': user_data['total_quests_completed'],
            'avg_daily_quests': user_data['avg_daily_quests'],
            'current_streak': user_data['current_streak'],
            'max_streak': user_data['max_streak'],
            'level': user_data['level'],
            'total_xp': user_data['total_xp'],
            'achievements_unlocked': user_data['achievements_unlocked'],
            'days_since_registration': user_data['days_since_registration'],
            'completion_rate': user_data['completion_rate'],
            'avg_session_duration': user_data['avg_session_duration'],
            'last_7_days_activity': user_data['last_7_days_activity'],
            'friend_count': user_data['friend_count'],
            'notification_engagement': user_data['notification_engagement']
        })
        
        return features
    
    def train(self, user_data, labels):
        """
        labels: 1 if user churned, 0 if active
        """
        X = self.prepare_features(user_data)
        self.model.fit(X, labels)
        
    def predict_churn_risk(self, user_data):
        """
        Predict churn probability for a user
        """
        X = self.prepare_features(user_data)
        proba = self.model.predict_proba(X)[0][1]
        
        return {
            'churn_risk': float(proba),
            'risk_category': self._categorize_risk(proba),
            'top_factors': self._get_top_factors(user_data)
        }
    
    def _categorize_risk(self, probability):
        if probability > 0.7:
            return 'critical'
        elif probability > 0.4:
            return 'high'
        elif probability > 0.2:
            return 'medium'
        else:
            return 'low'
    
    def _get_top_factors(self, user_data):
        """
        Identify key factors contributing to churn risk
        """
        factors = []
        
        if user_data['days_since_last_login'] > 7:
            factors.append('Long absence from platform')
        if user_data['current_streak'] == 0:
            factors.append('Lost streak momentum')
        if user_data['last_7_days_activity'] < 2:
            factors.append('Low recent activity')
        if user_data['completion_rate'] < 0.3:
            factors.append('Low quest completion rate')
        
        return factors[:3]  # Return top 3
```

---

## ­ƒôØ NLP Quest Creation

### **Goal**
Allow users to create quests using natural language.

**Example:**
- *"Remind me to work out every morning at 7am"* ÔåÆ Daily quest, 7:00 reminder
- *"I want to read for 30 minutes before bed"* ÔåÆ Daily quest, evening time
- *"Help me learn Spanish 3 times a week"* ÔåÆ Recurring quest, 3x/week

### **Approach: GPT-4 Fine-Tuning + Structured Output**

```javascript
// services/nlp.service.js
const OpenAI = require('openai');

class NLPService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
    
    this.systemPrompt = `You are a quest creation assistant for a gamified habit tracker.
Extract structured quest information from natural language input.

Output JSON with these fields:
{
  "title": "Short, action-oriented title",
  "description": "Detailed description",
  "type": "DAILY" | "RECURRING" | "ONE_TIME",
  "difficulty": "EASY" | "NORMAL" | "HARD",
  "attributes": ["strength", "intelligence", "constitution", "dexterity", "charisma", "luck"],
  "reminderTime": "HH:MM" or null,
  "frequency": "DAILY" | "WEEKLY" | "CUSTOM" | null,
  "estimatedDuration": minutes as integer,
  "deadline": "YYYY-MM-DD" or null
}

Attributes mapping:
- Physical activities ÔåÆ strength, constitution
- Learning/studying ÔåÆ intelligence
- Creative work ÔåÆ charisma
- Skill-based ÔåÆ dexterity
- Meditation/mindfulness ÔåÆ luck

Examples:
Input: "Remind me to work out every morning at 7am"
Output: {"title": "Morning Workout", "type": "DAILY", "difficulty": "NORMAL", "attributes": ["strength", "constitution"], "reminderTime": "07:00", "frequency": "DAILY", "estimatedDuration": 30}

Input: "I want to read for 30 minutes before bed"
Output: {"title": "Evening Reading", "type": "DAILY", "difficulty": "EASY", "attributes": ["intelligence"], "reminderTime": "21:00", "frequency": "DAILY", "estimatedDuration": 30}`;
  }
  
  async createQuestFromText(userInput, userId) {
    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages: [
          { role: "system", content: this.systemPrompt },
          { role: "user", content: userInput }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
        max_tokens: 500
      });
      
      const questData = JSON.parse(completion.choices[0].message.content);
      
      // Validate and enhance
      const validated = this.validateQuestData(questData);
      
      // Calculate base XP
      validated.baseXP = this.calculateBaseXP(validated.difficulty, validated.estimatedDuration);
      
      // Create quest in database
      const quest = await prisma.quest.create({
        data: {
          ...validated,
          userId,
          isAIGenerated: true,
          aiConfidence: this.calculateConfidence(completion)
        }
      });
      
      return {
        quest,
        originalInput: userInput,
        parsedData: questData
      };
      
    } catch (error) {
      console.error('NLP quest creation error:', error);
      throw new Error('Failed to parse quest from text');
    }
  }
  
  validateQuestData(data) {
    const defaults = {
      title: data.title || 'New Quest',
      description: data.description || '',
      type: ['DAILY', 'RECURRING', 'ONE_TIME'].includes(data.type) ? data.type : 'DAILY',
      difficulty: ['EASY', 'NORMAL', 'HARD'].includes(data.difficulty) ? data.difficulty : 'NORMAL',
      attributes: this.validateAttributes(data.attributes),
      reminderTime: data.reminderTime ? new Date(`1970-01-01T${data.reminderTime}`) : null,
      frequency: data.frequency,
      estimatedDuration: data.estimatedDuration || 30,
      deadline: data.deadline ? new Date(data.deadline) : null
    };
    
    return defaults;
  }
  
  validateAttributes(attrs) {
    const valid = ['strength', 'intelligence', 'constitution', 'dexterity', 'charisma', 'luck'];
    if (!Array.isArray(attrs)) return ['strength'];
    
    const filtered = attrs.filter(a => valid.includes(a));
    return filtered.length > 0 ? filtered : ['strength'];
  }
  
  calculateBaseXP(difficulty, duration) {
    const baseDifficultyXP = {
      EASY: 50,
      NORMAL: 100,
      HARD: 150
    };
    
    const durationBonus = Math.floor(duration / 10) * 10;
    
    return baseDifficultyXP[difficulty] + durationBonus;
  }
  
  calculateConfidence(completion) {
    // Simple heuristic based on response
    const response = completion.choices[0];
    
    if (response.finish_reason === 'stop') {
      return 0.9;
    }
    
    return 0.7;
  }
}

module.exports = new NLPService();
```

### **API Endpoint**

```javascript
// controllers/quest.controller.js
router.post('/quests/create-from-text', auth, async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text || text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: { message: 'Text input required' }
      });
    }
    
    const result = await nlpService.createQuestFromText(text, req.user.id);
    
    res.status(201).json({
      success: true,
      data: result
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: error.message }
    });
  }
});
```

---

## ÔÜû´©Å Personalized Difficulty Adjustment

### **Goal**
Automatically adjust quest difficulty based on user's success rate and performance.

```python
# ml-service/models/difficulty_adjuster.py
from sklearn.linear_model import LinearRegression
import numpy as np

class DifficultyAdjuster:
    def __init__(self):
        self.model = LinearRegression()
        
    def train(self, quest_data):
        """
        quest_data: DataFrame with columns:
          - difficulty_level (0=EASY, 1=NORMAL, 2=HARD)
          - user_level
          - completion_rate
          - avg_time_spent
          - attribute_total
        """
        X = quest_data[['user_level', 'attribute_total', 'completion_rate']]
        y = quest_data['difficulty_level']
        
        self.model.fit(X, y)
        
    def suggest_difficulty(self, user_profile, quest_type):
        """
        Suggest optimal difficulty for a quest
        """
        features = np.array([[
            user_profile['level'],
            user_profile['total_attributes'],
            user_profile['avg_completion_rate']
        ]])
        
        predicted_level = self.model.predict(features)[0]
        
        # Apply quest-type specific adjustments
        if quest_type == 'NEW_HABIT':
            predicted_level = max(0, predicted_level - 0.5)  # Start easier
        elif quest_type == 'SKILL_BASED':
            predicted_level += 0.3  # Slightly harder
        
        # Round and clamp
        difficulty_index = int(np.clip(np.round(predicted_level), 0, 2))
        difficulties = ['EASY', 'NORMAL', 'HARD']
        
        return {
            'suggested_difficulty': difficulties[difficulty_index],
            'confidence': self._calculate_confidence(user_profile),
            'reasoning': self._explain_suggestion(difficulty_index, user_profile)
        }
    
    def _calculate_confidence(self, profile):
        # Higher confidence if user has more data
        completions = profile.get('total_completions', 0)
        
        if completions < 10:
            return 0.5
        elif completions < 50:
            return 0.7
        else:
            return 0.9
    
    def _explain_suggestion(self, level, profile):
        reasons = []
        
        if profile['level'] > 30:
            reasons.append("High user level suggests experience")
        
        if profile['avg_completion_rate'] > 0.8:
            reasons.append("Strong completion rate")
        elif profile['avg_completion_rate'] < 0.4:
            reasons.append("Lower completion rate - suggesting easier difficulty")
        
        return " | ".join(reasons) if reasons else "Based on your profile"
```

---

## ­ƒôê Analytics & Insights

### **Goal**
Generate personalized insights and actionable recommendations.

```python
# ml-service/analytics/insights_generator.py
import pandas as pd
import numpy as np
from datetime import datetime, timedelta

class InsightsGenerator:
    def generate_weekly_insights(self, user_id, user_data):
        """
        Generate comprehensive weekly insights
        """
        insights = {
            'summary': self._generate_summary(user_data),
            'trends': self._analyze_trends(user_data),
            'recommendations': self._generate_recommendations(user_data),
            'achievements_progress': self._track_achievement_progress(user_data),
            'predictions': self._predict_next_week(user_data)
        }
        
        return insights
    
    def _generate_summary(self, data):
        week_data = data[data['date'] >= datetime.now() - timedelta(days=7)]
        
        return {
            'quests_completed': len(week_data),
            'xp_gained': week_data['xp'].sum(),
            'streak': data['current_streak'].iloc[-1],
            'most_productive_day': week_data.groupby('day_name')['xp'].sum().idxmax(),
            'most_improved_attribute': self._find_most_improved(week_data)
        }
    
    def _analyze_trends(self, data):
        # XP trend
        xp_trend = self._calculate_trend(data['xp'].tail(14))
        
        # Completion rate trend
        completion_trend = self._calculate_trend(data['completion_rate'].tail(14))
        
        return {
            'xp_trend': {
                'direction': 'up' if xp_trend > 0 else 'down',
                'percentage': abs(xp_trend),
                'message': f"Your XP gain is {'increasing' if xp_trend > 0 else 'decreasing'} by {abs(xp_trend):.1f}%"
            },
            'completion_trend': {
                'direction': 'up' if completion_trend > 0 else 'down',
                'percentage': abs(completion_trend),
                'message': f"Completion rate {'up' if completion_trend > 0 else 'down'} {abs(completion_trend):.1f}%"
            }
        }
    
    def _generate_recommendations(self, data):
        recommendations = []
        
        # Check for declining streak
        if data['current_streak'].iloc[-1] < data['max_streak'].iloc[-1] * 0.5:
            recommendations.append({
                'type': 'warning',
                'title': 'Streak Recovery',
                'message': 'Your streak is below your peak. Try completing easier quests to rebuild momentum.',
                'action': 'view_easy_quests'
            })
        
        # Check for attribute imbalance
        attrs = data[['strength', 'intelligence', 'constitution', 'dexterity', 'charisma', 'luck']].iloc[-1]
        min_attr = attrs.idxmin()
        max_attr = attrs.idxmax()
        
        if attrs[max_attr] > attrs[min_attr] * 2:
            recommendations.append({
                'type': 'suggestion',
                'title': 'Balance Your Attributes',
                'message': f'Focus on {min_attr.title()} quests to create a more balanced character.',
                'action': f'filter_quests_{min_attr}'
            })
        
        # Check for optimal quest timing
        completion_by_hour = data.groupby('hour')['completed'].mean()
        best_hour = completion_by_hour.idxmax()
        
        recommendations.append({
            'type': 'tip',
            'title': 'Optimal Quest Timing',
            'message': f'You complete {completion_by_hour[best_hour]:.0%} of quests at {best_hour}:00. Schedule important quests then.',
            'action': 'adjust_reminders'
        })
        
        return recommendations
    
    def _predict_next_week(self, data):
        # Simple linear regression for next week
        recent_xp = data['xp'].tail(14).values
        days = np.arange(len(recent_xp))
        
        slope = np.polyfit(days, recent_xp, 1)[0]
        
        predicted_next_week_xp = int(recent_xp[-7:].mean() + (slope * 7))
        
        return {
            'predicted_weekly_xp': max(0, predicted_next_week_xp),
            'predicted_level_up': self._will_level_up(data, predicted_next_week_xp),
            'predicted_rank_up': self._will_rank_up(data, predicted_next_week_xp)
        }
    
    def _calculate_trend(self, series):
        """Calculate percentage trend"""
        if len(series) < 2:
            return 0
        
        first_half = series[:len(series)//2].mean()
        second_half = series[len(series)//2:].mean()
        
        if first_half == 0:
            return 0
        
        return ((second_half - first_half) / first_half) * 100
```

---

## ­ƒÄ» Model Deployment Strategy

### **FastAPI ML Service**

```python
# ml-service/main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

from models.quest_recommender import QuestRecommender
from models.habit_predictor import HabitPredictor
from models.difficulty_adjuster import DifficultyAdjuster
from analytics.insights_generator import InsightsGenerator

app = FastAPI(title="Solo Leveling ML API", version="2.0.0")

# Load models on startup
recommender = QuestRecommender()
habit_predictor = HabitPredictor()
difficulty_adjuster = DifficultyAdjuster()
insights_gen = InsightsGenerator()

# Request models
class RecommendRequest(BaseModel):
    user_id: str
    top_n: int = 10

class HabitPredictRequest(BaseModel):
    user_id: str
    recent_history: List[dict]

class DifficultyRequest(BaseModel):
    user_profile: dict
    quest_type: str

# Endpoints
@app.post("/recommend")
async def recommend_quests(request: RecommendRequest):
    try:
        recommendations = recommender.recommend_for_user(
            request.user_id,
            request.top_n
        )
        return {"recommendations": recommendations}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict-habit")
async def predict_habit(request: HabitPredictRequest):
    try:
        prediction = habit_predictor.predict_next_7_days(request.recent_history)
        return {"predictions": prediction}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/suggest-difficulty")
async def suggest_difficulty(request: DifficultyRequest):
    try:
        suggestion = difficulty_adjuster.suggest_difficulty(
            request.user_profile,
            request.quest_type
        )
        return suggestion
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/weekly-insights/{user_id}")
async def generate_insights(user_id: str):
    try:
        # Fetch user data (mock for now)
        user_data = fetch_user_data(user_id)
        insights = insights_gen.generate_weekly_insights(user_id, user_data)
        return insights
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy", "models_loaded": True}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

### **Docker Setup**

```dockerfile
# ml-service/Dockerfile
FROM python:3.10-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

# Expose port
EXPOSE 8000

# Run application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

```yaml
# ml-service/requirements.txt
fastapi==0.109.0
uvicorn[standard]==0.27.0
tensorflow==2.15.0
scikit-learn==1.4.0
xgboost==2.0.3
pandas==2.2.0
numpy==1.26.3
openai==1.10.0
redis==5.0.1
pydantic==2.5.3
```

---

## ­ƒôè Performance Monitoring

### **Metrics to Track**

```javascript
// Prometheus metrics
const prometheus = require('prom-client');

const mlApiDuration = new prometheus.Histogram({
  name: 'ml_api_request_duration_seconds',
  help: 'ML API request duration',
  labelNames: ['endpoint', 'status']
});

const mlCacheHitRate = new prometheus.Counter({
  name: 'ml_cache_hits_total',
  help: 'ML cache hit rate',
  labelNames: ['type']
});

const recommendationAcceptanceRate = new prometheus.Gauge({
  name: 'recommendation_acceptance_rate',
  help: 'Percentage of recommendations accepted by users'
});

const modelConfidenceScore = new prometheus.Histogram({
  name: 'model_confidence_score',
  help: 'ML model confidence scores',
  buckets: [0.1, 0.3, 0.5, 0.7, 0.9, 1.0],
  labelNames: ['model_type']
});
```

### **A/B Testing Framework**

```javascript
// services/ab-testing.service.js
class ABTestingService {
  async assignVariant(userId, experimentName) {
    const hash = this.hashUserId(userId);
    const variant = hash % 2 === 0 ? 'control' : 'treatment';
    
    await redis.hset(`experiment:${experimentName}`, userId, variant);
    
    return variant;
  }
  
  async trackConversion(userId, experimentName, metric) {
    const variant = await redis.hget(`experiment:${experimentName}`, userId);
    
    await prisma.abTestEvent.create({
      data: {
        userId,
        experimentName,
        variant,
        metric,
        timestamp: new Date()
      }
    });
  }
  
  async getExperimentResults(experimentName) {
    const results = await prisma.abTestEvent.groupBy({
      by: ['variant', 'metric'],
      _count: true,
      where: { experimentName }
    });
    
    return this.calculateSignificance(results);
  }
}
```

---

*Continue reading in: `FRONTEND_ARCHITECTURE.md`, `DEPLOYMENT_DEVOPS.md`, `TESTING_STRATEGY.md`*
