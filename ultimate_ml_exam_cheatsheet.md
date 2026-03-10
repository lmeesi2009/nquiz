# Ultimate Machine Learning Coding Cheat Sheet

import requests
import json

API_KEY = "gsk _bv6aoIWNeZ93DGFoyRZ6WGdyb3FYLhLERRX2Yb4X59IAGTjnRJCz"
URL = "https://api.groq.com/openai/v1/chat/completions"

SYSTEM_PROMPT = """
You are a machine learning coding assistant.

Rules for every response:

1. Return only Python code.
2. The code must be clean, readable, and properly formatted.
3. Preserve indentation and line breaks.
4. Add short comments explaining each step.
5. The code must run directly in Python or Jupyter.

Behavior rules:

• If the user asks a full machine learning task, return a complete pipeline:
  imports → data loading → preprocessing → model training → prediction → evaluation.

• If the user asks a small or specific ML question (example: "scale features", "train logistic regression"),
  return only the specific code snippet needed.

• If the user sends an ERROR message or buggy code,
  analyze the mistake and return the corrected code version.

• Always fix the bug directly in the code.
• Do not explain the error in text outside the code.
• Add a comment inside the code showing where the fix was made.

Never compress code into a single line.


Always format code like a clean Python script.
"""

def ask(question):

    payload = {
        "model": "openai/gpt-oss-120b",
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": question}
        ],
        "temperature": 0
    }

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    response = requests.post(URL, headers=headers, data=json.dumps(payload))

    result = response.json()

    return result["choices"][0]["message"]["content"]

---

to ask any question use this function


print(ask("explain full logistic regression"))


                OR

from IPython.display import Markdown


Markdown(ask("explain full logistic regression"))

           


api keys:-

hrisab
1) gsk _AF0idVsqN8Of4EUXd9w8WGdyb3FY7XMH59c3q8PqAEjzmincpplt
2) gsk _YAO0UFNe0jA6bJTdCGPXWGdyb3FY52UNm0QD8pM16XawU5lxZtP0


adi:-
1) gsk _929p2Xcx2GEgk7Ei3mfSWGdyb3FYlrhO4qOEeolCWY9FGjef5LAr
2) gsk _WrDVVe1xJfByy5wPd0lEWGdyb3FYCKfSL8cJBa5etMvxe0RibOle
3) gsk _FZV9qjwkd7UGUi3JT8h1WGdyb3FY01Ljfjmgdep8hyor2qgzYUld


rohan:-
1) gsk _PRNGNpPf3V8jC83JGL34WGdyb3FYUqlkcmoO5qHljzNQbgJngsds
2) gsk _tlbP2oGKa6guVQ55e2L1WGdyb3FYijfvxsntUq8zg3IxFxmtabbe

abishek:-
1) gsk _3gEK5dlq63QVsTqf6KJHWGdyb3FYdu3dBNVTJXxuxDfuYy7L0Umb
2) gsk _dmZqtBSrYQpa9lerxcawWGdyb3FYqONboiRU9fbmrXsLhlLGbvFV
3) gsk _FCZYeSiUHJuXk89NI0tNWGdyb3FYSRNT2D2IZmuqK5WklASf67F5

naveen:-

1) gsk _SeZnfHSDLDKzGI2AONGnWGdyb3FYsyzCQswy7ZzwtJygMgIJ9kLj
2) gsk _aMJcXIQGUskh48AQJy3UWGdyb3FYBNlcMp01VI5KkNpxBf9Qt8io
3) gsk _CrUJuztwGeYCrYGUr6BnWGdyb3FYhKVsaadyUbQt2XcmadQI10Uk
4) gsk _AyIvNjKV3A3VvLAatGgHWGdyb3FY2rG9N0mdhnRrLuBCuXB891cR


ansh :-

1) gsk _W3Vz8vG8FyagTQZCv9E1WGdyb3FYixbjWPKyTVWjKEJ29vmYAIJR
2) gsk _H2XtLooHca8yrhfto70EWGdyb3FYQpJ0i4ghy1eqjWEFGYLMvtUv
3) gsk _Osa4dsWpRdy226YuZJ7BWGdyb3FYD2XSnk68fiaH6Alnl8yrsDq6
4) gsk _PRGvuTOjnfdT1J38pmN3WGdyb3FYn6cn5DcxOmB5dOgDwRqGo09t


## 1. Environment Setup

### Import Essential Libraries
Load the core libraries for data manipulation, visualization, and machine learning.

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.model_selection import train_test_split, cross_val_score, KFold
from sklearn.preprocessing import StandardScaler, MinMaxScaler, LabelEncoder, OneHotEncoder
from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.tree import DecisionTreeClassifier, DecisionTreeRegressor
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
from sklearn.metrics import precision_score, recall_score, f1_score
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

from imblearn.over_sampling import SMOTE
```

---

## 2. Data Exploration

### Load Dataset
Read data from a CSV file and perform an initial inspection.

```python
df = pd.read_csv("data.csv")

# Inspection methods
df.head()       # View first 5 rows
df.tail()       # View last 5 rows
df.shape        # (rows, columns)
df.columns      # List column names
df.info()       # Data types and non-null counts
df.describe()   # Summary statistics
```

### Basic Statistics
Calculate key statistical measures for specific columns.

```python
# Central Tendency
df["column"].mean()
df["column"].median()
df["column"].mode()[0]

# Dispersion
df["column"].min()
df["column"].max()
df["column"].std()
```

---

## 3. Data Preprocessing & Cleaning

### Handling Missing Values
Identify and fill gaps in your data using statistical measures.

```python
# Check for nulls
df.isnull().sum()

# Imputation strategies
df["column"] = df["column"].fillna(df["column"].mean())
df["column"] = df["column"].fillna(df["column"].median())
df["column"] = df["column"].fillna(df["column"].mode()[0])
```

### Remove Duplicates
Ensure data integrity by removing redundant rows.

```python
df = df.drop_duplicates()
```

---

## 4. Feature Engineering

### Data Encoding
Convert categorical text data into numerical format for model compatibility.

#### Label Encoding
Assigns a unique integer to each category.
```python
le = LabelEncoder()
df["Gender"] = le.fit_transform(df["Gender"])
```

#### One-Hot Encoding
Creates binary columns for each category (use for non-ordinal data).
```python
df = pd.get_dummies(df, columns=["City"])
```

### Feature Scaling
Normalize or standardize numerical features to ensure they contribute equally to the model.

#### Standard Scaling (Z-score normalization)
```python
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)
```

#### Min-Max Scaling (Range normalization)
```python
scaler = MinMaxScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)
```

---

## 5. Model Preparation

### Feature and Target Split
Separate independent variables ($X$) from the dependent variable ($y$).

```python
X = df.drop("target", axis=1)
y = df["target"]
```

### Train-Test Split
Divide data into training and testing sets to evaluate model performance on unseen data.

```python
X_train, X_test, y_train, y_test = train_test_split(
    X, 
    y, 
    test_size=0.2, 
    random_state=42
)
```

### Handle Class Imbalance (SMOTE)
Synthetic Minority Over-sampling Technique to balance skewed classes in training data.

```python
smote = SMOTE(random_state=42)
X_train_resampled, y_train_resampled = smote.fit_resample(
    X_train, 
    y_train
)
```

---

## 6. Supervised Learning Algorithms

### Linear Regression
Used for predicting continuous numerical values.

```python
model = LinearRegression()
model.fit(X_train, y_train)
y_pred = model.predict(X_test)
```

### Logistic Regression
Used for predicting the probability of categorical outcomes (e.g., classifying tumor as Malignant or Benign).

**When to use:** Binary or multi-class classification tasks.

```python
from sklearn.datasets import load_breast_cancer

# Load dataset
data = load_breast_cancer()
X = pd.DataFrame(data.data, columns=data.feature_names)
y = pd.Series(data.target, name="target")

# Split and Train
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.1, random_state=42)
log_model = LogisticRegression()
log_model.fit(X_train, y_train)

# Predict categories or probabilities
y_pred = log_model.predict(X_test)
prob = log_model.predict_proba(X_test)
```

### Decision Tree Classifier
Learns non-linear relationships by splitting data into branches based on feature thresholds.

**When to use:** When you need an interpretable model that handles both numerical and categorical data.

```python
tree = DecisionTreeClassifier(random_state=42)
tree.fit(X_train, y_train)
y_pred = tree.predict(X_test)

# Model accuracy score
score = tree.score(X_test, y_test)
```

### Decision Tree Regression
Applies tree-based logic for continuous value prediction.

```python
tree_reg = DecisionTreeRegressor(
    max_depth=5, 
    random_state=42
)
tree_reg.fit(X_train, y_train)
y_pred = tree_reg.predict(X_test)
```

### Sigmoid Function
The core mathematical function behind Logistic Regression updates.

```python
def sigmoid(z):
    return 1 / (1 + np.exp(-z))

# Example usage
z = np.array([-2, -1, 0, 1, 2])
print(sigmoid(z))
```

---

## 7. Neural Networks & Deep Learning

### Basics of Artifical Neural Networks (ANN)
Inspired by biological neurons, ANNs consist of layers of interconnected nodes (neurons).

**Key Concepts:**
- **Layers:** Input, Hidden, and Output layers.
- **Weights & Biases:** Parameters learned during training.
- **Activation Functions:** 
    - `ReLU`: Used in hidden layers to introduce non-linearity.
    - `Sigmoid`: Used in output layer for binary classification (probabilities 0-1).
    - `Softmax`: Used in output layer for multi-class classification.

### Keras Implementation
Using `tensorflow.keras` for building and training models.

**When to use:** Complex, non-linear patterns where traditional algorithms (LR, DT) underperform.

> [!IMPORTANT]
> **Scaling is Mandatory:** Neural Networks are sensitive to feature scales. Always use `StandardScaler`.

```python
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
from tensorflow.keras.optimizers import Adam
from sklearn.preprocessing import StandardScaler

# 1. Scaling
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# 2. Build Model
model = Sequential([
    # Input + Hidden Layer 1 (16 neurons)
    Dense(16, activation='relu', input_shape=(X_train.shape[1],)),
    # Hidden Layer 2
    Dense(8, activation='relu'),
    # Output Layer (Binary Classification)
    Dense(1, activation='sigmoid')
])

# 3. Compile
model.compile(
    optimizer=Adam(learning_rate=0.01),
    loss='binary_crossentropy',
    metrics=['accuracy']
)

# 4. Train
history = model.fit(
    X_train_scaled, y_train,
    validation_data=(X_test_scaled, y_test),
    epochs=50,
    batch_size=32,
    verbose=0
)

# 5. Predict
y_prob = model.predict(X_test_scaled)
y_pred = (y_prob > 0.5).astype("int32")
```

---

## 8. Model Evaluation & Validation

### Classification Metrics
Evaluation tools for discrete target variables.

```python
# Confusion Matrix
cm = confusion_matrix(y_test, y_pred)
print(cm)

# Individual Metrics
accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred)
recall = recall_score(y_test, y_pred)
f1 = f1_score(y_test, y_pred)

# Comprehensive Report
print(classification_report(y_test, y_pred))
```

### Regression Metrics
Evaluation tools for continuous target variables.

```python
mae = mean_absolute_error(y_test, y_pred) # Mean Absolute Error
mse = mean_squared_error(y_test, y_pred)   # Mean Squared Error
rmse = np.sqrt(mse)                      # Root Mean Squared Error
r2 = r2_score(y_test, y_pred)            # R-Squared (Variance Explained)
```

### Cross-Validation
Validating model stability across different subsets of data.

```python
# Simple Cross-Validation
scores = cross_val_score(model, X, y, cv=5)
print(f"Mean Score: {scores.mean()}")

# K-Fold Cross Validation
kfold = KFold(n_splits=5, shuffle=True, random_state=42)
scores = cross_val_score(model, X, y, cv=kfold)
```

---

## 9. Natural Language Processing (NLP)

### Text Preprocessing Pipeline
Text must be cleaned and converted to numbers before a model can process it.

1. **Lowercasing**: `text.lower()`
2. **Punctuation Removal**: `text.translate(str.maketrans('', '', string.punctuation))`
3. **Tokenization**: Splitting sentences into words using `word_tokenize`.
4. **Stopword Removal**: Removing common words like 'the', 'is' that carry little meaning.
5. **Lemmatization**: Reducing words to their root form (e.g., 'running' -> 'run').
6. **Vectorization**: Converting text to numerical matrices (e.g., `CountVectorizer`).

```python
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize
from sklearn.feature_extraction.text import CountVectorizer

# Preprocessing Example
def preprocess_text(text):
    # Lower & Punctuation
    text = text.lower().translate(str.maketrans('', '', string.punctuation))
    # Tokenize
    tokens = word_tokenize(text)
    # Stopwords & Lemmatize
    lemmatizer = WordNetLemmatizer()
    stop_words = set(stopwords.words('english'))
    clean_tokens = [lemmatizer.lemmatize(w) for w in tokens if w not in stop_words]
    return " ".join(clean_tokens)

# Vectorization (Bag of Words)
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(df['processed_text'])
```

### Sentiment Analysis with Deep Learning
Processing sequences of text using Embedding layers and padding.

- **Padding**: Standardizing sequence lengths so all inputs have the same shape.
- **Embeddings**: Representing words in a dense vector space where similar words are closer together.

```python
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.layers import Embedding, GlobalAveragePooling1D

# 1. Padding Sequences
X_padded = pad_sequences(sequences, maxlen=100)

# 2. Model Structure
model = Sequential([
    # Embedding layer (vocab size, vector dim, input len)
    Embedding(input_dim=10000, output_dim=16, input_length=100),
    GlobalAveragePooling1D(),
    Dense(16, activation='relu'),
    Dense(1, activation='sigmoid')
])
```

---

## 10. Advanced Sequence Modeling

### ANN vs. RNN
Comparing static vs. temporal pattern recognition.

- **ANN (Flattened)**: Treats the entire input sequence as one big feature vector. Loses word order context.
- **RNN (Sequential)**: Processes tokens one-by-side, maintaining a hidden state (memory) of previous tokens.

```python
from tensorflow.keras.layers import SimpleRNN, LSTM, Flatten

# ANN Approach (Static)
ann_model = Sequential([
    Embedding(input_dim=100, output_dim=8, input_length=6),
    Flatten(),
    Dense(1, activation='sigmoid')
])

# RNN Approach (Sequential)
rnn_model = Sequential([
    Embedding(input_dim=100, output_dim=8, input_length=6),
    SimpleRNN(16), # Maintains temporal state
    Dense(1, activation='sigmoid')
])
```

### Transformers & Attention
Transformers replace recurrence (RNNs) with **Self-Attention**, allowing the model to focus on different parts of a sentence simultaneously.

**Key features:**
- Parallel processing (faster than RNNs).
- Better at long-range dependencies.
- Basis for BERT, GPT, and Claude.

```python
from transformers import pipeline

# Easy usage with Hugging Face pipelines
classifier = pipeline("sentiment-analysis")
result = classifier("The gameplay was phenomenal but the story was weak.")

print(result) 
# Output: [{'label': 'POSITIVE', 'score': 0.999}]
```

---

## 11. Interpretability & Visualization

### Feature Importance
Identify which features contribute most to the model's predictive power.

```python
# Extract and sort importance levels
importances = tree.feature_importances_
imp_df = pd.DataFrame({'Feature': X.columns, 'Importance': importances})
imp_df = imp_df.sort_values('Importance', ascending=False)
print(imp_df.head())
```

### Tree Visualization
Generate a visual representation of the decision hierarchy.

```python
from sklearn.tree import export_graphviz
import graphviz

# Export to DOT format
export_graphviz(
    tree, 
    out_file="tree.dot", 
    feature_names=data.feature_names, 
    filled=True
)

# Render the tree
with open("tree.dot") as f:
    dot_graph = f.read()
graphviz.Source(dot_graph)
```

### Key Visualizations
Visualizing data relationships and model parameters.

```python
# Correlation Heatmap
sns.heatmap(df.corr(), annot=True)
plt.show()

# Feature Importance Plot
plt.bar(range(len(importances)), importances[sorted_indices])
plt.xticks(range(len(importances)), X.columns[sorted_indices], rotation=90)
plt.title("Feature Importance")
plt.show()
```

---

## 12. Deployment & Inference

### Predict on New Data
Applying your trained model to unseen samples.

```python
new_data = [[value1, value2, value3]]
prediction = model.predict(new_data)
print(f"Prediction: {prediction}")
```

---
**End of Machine Learning Exam Cheat Sheet**

---

## Lecture 2: Data Preprocessing & Missing Values

### 1. Identifying Missing Values
| Method | Description |
|---|---|
| `df.info()` | Summary of non-null counts and data types |
| `df.isnull().sum()` | Total missing values per column |

### 2. Handling Missing Values
* **Deletion:** `df.dropna()` (Use only if data is sufficient)
* **Imputation:**
  * **Mean:** `df['col'].fillna(df['col'].mean())` (Best for normal distribution)
  * **Median:** `df['col'].fillna(df['col'].median())` (Robust to outliers - BEST)
  * **Mode:** `df['col'].fillna(df['col'].mode()[0])` (Categorical data)

### 3. Outlier Detection (IQR Method)
Outliers can skew results. We use the Interquartile Range (IQR).
```python
Q1 = df['Income'].quantile(0.25)
Q3 = df['Income'].quantile(0.75)
IQR = Q3 - Q1
lower_limit = Q1 - 1.5 * IQR
upper_limit = Q3 + 1.5 * IQR

# Remove outliers while keeping missing values (optional)
df_filtered = df[(df['Income'] >= lower_limit) & (df['Income'] <= upper_limit)]
```

### 4. Feature Scaling
Required when features have different ranges (e.g., Age 0-100, Income 10k-1M) to prevent dominance.
* **Standardization:** Scales data to mean=0 and std=1.
```python
from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
# Fit and transform
df[['Age', 'Income']] = scaler.fit_transform(df[['Age', 'Income']])
```

### 5. Categorical Encoding
* **Label/Integer Encoding:** Assigns a number (0, 1, 2) to categories. (Problem: May imply mathematical ranking).
* **One-Hot Encoding:** Creates binary columns for each category. (Ensures neutrality).
```python
# One-Hot Encoding using Pandas
df_encoded = pd.get_dummies(df, columns=['City'], dtype=int)
```

---
---

## Lecture 3: Linear Regression & OLS

### 1. Introduction to Linear Regression
- **Purpose**: A supervised learning technique used to predict a continuous numerical value.
- **Equation**: $y = mx + c$
    - $y$: Target Variable (Dependent)
    - $x$: Feature (Independent)
    - $m$: Slope (Impact of x on y)
    - $c$: Intercept (Value of y when x=0)

### 2. Manual OLS Calculation (Ordinary Least Squares)
OLS minimizes the **Residuals** (difference between actual and predicted values).

```python
# Calculate Means
x_mean = x.mean()
y_mean = y.mean()

# Calculate Slope (m)
# Formula: Sum((x - x_mean) * (y - y_mean)) / Sum((x - x_mean)^2)
numerator = ((x - x_mean) * (y - y_mean)).sum()
denominator = ((x - x_mean) ** 2).sum()
m = numerator / denominator

# Calculate Intercept (c)
c = y_mean - m * x_mean

# Final Equation
print(f"Price = {m:.4f} * House Size + {c:.2f}")

# Prediction
y_p = m * x + c
```

### 3. Error Metrics & Residuals
- **Residual (Error)**: $Actual - Predicted$
- **Sum of Squared Errors (SSE)**: Goal is to minimize this value.
- **Mean Squared Error (MSE)**: Average of squared residuals. Low MSE = High Accuracy.

```python
# Sum of Squared Errors
sse = ((y - y_p)**2).sum()

# Mean Squared Error
mse = ((y - y_p)**2).mean()
```

### 4. Regression using Scikit-Learn
```python
from sklearn.linear_model import LinearRegression

# Initialize and train
model = LinearRegression()
model.fit(X, y) # X must be 2D

# Extract parameters
m = model.coef_[0]
c = model.intercept_

# Evaluation on Train/Test
from sklearn.model_selection import train_test_split
xtrain, xtest, ytrain, ytest = train_test_split(X, y, train_size=0.75)

model.fit(xtrain, ytrain)
ytestP = model.predict(xtest)
test_mse = ((ytest - ytestP)**2).mean()
```

### 5. Categorical Data in Regression
If features are text (e.g., 'Yes'/'No'), use `LabelEncoder` before training.
```python
from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()
df['Activity'] = le.fit_transform(df['Activity'])
```

---

---

## Lecture 4: Logistic Regression

### 1. Introduction
- **Purpose**: A supervised learning technique used for **Classification** (predicting categories, e.g., Yes/No, Pass/Fail).
- **Key Idea**: Predicts the **Probability** (0 to 1) that an instance belongs to a class.
- **Sigmoid Function (S-Curve)**: Squashes any real-valued number into a range between 0 and 1.
    - Formula: $P = \frac{1}{1 + e^{-z}}$ where $z = mx + c$.

### 2. Core Concepts
- **Decision Boundary**: A threshold (usually 0.5) that separates classes. 
    - If $P \ge 0.5$, predict Class 1.
    - If $P < 0.5$, predict Class 0.

### 3. Implementation with Scikit-Learn
```python
from sklearn.linear_model import LogisticRegression

# 1. Initialize and Train
model = LogisticRegression()
model.fit(X_train, y_train)

# 2. Predict Classes
y_pred = model.predict(X_test)

# 3. Predict Probabilities (returns [Prob(0), Prob(1)])
y_prob = model.predict_proba(X_test)
```

### 4. Case Study: Customer Churn
**Data Preparation Workflow**:
1. **Cleaning**: Fill missing categorical values with a placeholder like 'Unknown'.
    `df['col'] = df['col'].fillna('Unknown')`
2. **Encoding**:
    - **Mapping**: For ordinal data or binary (e.g., {'No':0, 'Yes':1}).
    - **One-Hot Encoding**: For nominal categories (e.g., `pd.get_dummies(df['method'])`).
3. **Training**: `model.fit(xtrain, ytrain)`

---

## Lecture 5: Model Evaluation

### 1. The Accuracy Paradox
Simple accuracy can be misleading in **imbalanced datasets** (e.g., a disease affecting only 1% of people). A model predicting "Healthy" for everyone will be 99% accurate but useless.

### 2. Classification Metrics: Confusion Matrix
| | Predicted: NO | Predicted: YES |
|---|---|---|
| **Actual: NO** | True Negative (TN) | False Positive (FP) |
| **Actual: YES** | False Negative (FN) | True Positive (TP) |

- **Type I Error (False Positive)**: "False Alarm" (Predicting YES when it's NO).
- **Type II Error (False Negative)**: "Missed Danger" (Predicting NO when it's YES).

**Metrics from Confusion Matrix**:
- **Accuracy**: $\frac{TN + TP}{Total}$
- **Precision**: $\frac{TP}{TP + FP}$ (Accuracy of positive predictions)
- **Recall (Sensitivity)**: $\frac{TP}{TP + FN}$ (Ability to find all positive instances)
- **F1-Score**: Harmonic mean of Precision and Recall.

```python
from sklearn.metrics import confusion_matrix, classification_report, accuracy_score

print(accuracy_score(y_true, y_pred))
print(confusion_matrix(y_true, y_pred))
print(classification_report(y_true, y_pred)) # Shows Precision, Recall, F1
```

### 3. Regression Metrics (Predicting Numbers)
- **Mean Absolute Error (MAE)**: Average absolute difference. Robust to outliers.
- **Mean Squared Error (MSE)**: Average squared difference. Heavily punishes large errors.
- **Root Mean Squared Error (RMSE)**: Square root of MSE. Returns error to original units (e.g., dollars).
- **R-Squared ($R^2$)**: "Fitness Score" (0 to 1). Tells how much variance is explained by the model compared to guessing the average.

### 4. Bias vs. Variance
- **High Bias (Underfitting)**: Model is too simple. Performs poorly on both Train & Test data.
- **High Variance (Overfitting)**: Model is too complex (memorizes noise). Performs great on Train but poorly on Test.

### 5. Model Validation: K-Fold Cross Validation
Splits data into K parts (folds). Trains K times, each time using a different fold as the test set. Ensures the model isn't just lucky on a specific split.

```python
from sklearn.model_selection import cross_val_score
model = LogisticRegression()
scores = cross_val_score(model, X, y, cv=5)
print(f"Average Accuracy: {scores.mean()}")
```

---

---

## Lecture 8: Decision Trees & Neural Networks (MLP)

### 1. Decision Trees
- **Concept**: A tree-like model where nodes represent tests on attributes, branches represent outcomes, and leaves represent labels.
- **Workflow**:
    1. Flatten images if necessary (e.g., MNIST 28x28 -> 784).
    2. Normalize data (0 to 1).
- **Implementation**:
```python
from sklearn.tree import DecisionTreeClassifier
model_dt = DecisionTreeClassifier()
model_dt.fit(X_train_flat, y_train)
y_pred = model_dt.predict(X_test_flat)
```

### 2. Neural Networks (Multi-Layer Perceptron - MLP)
- **Concept**: A network of interconnected "neurons" (layers) that learn complex patterns.
- **Components**:
    - **Input Layer**: Takes features.
    - **Hidden Layers**: Dense layers with activation functions (e.g., **ReLU**).
    - **Output Layer**: Final prediction. Use **Softmax** for multi-class classification.
- **Implementation (4-Step Process)**:
    1. **Data Definition**: Prepare features and labels (one-hot encode labels for multi-class).
    2. **Model Definition**: Use `Sequential` model with `Dense` layers.
    3. **Compile**: Choose Optimizer (e.g., **Adam**, **SGD**), Loss (**Categorical Crossentropy** or **MSE**), and Metrics.
    4. **Train**: Use `model.fit()`.

```python
from keras import models, layers
from tensorflow.keras.utils import to_categorical

# 1. One-Hot Encode Labels
y_train_encoded = to_categorical(y_train)

# 2. Build Model
model = models.Sequential([
    layers.Input(shape=(784,)),
    layers.Dense(64, activation='relu'),
    layers.Dense(32, activation='relu'),
    layers.Dense(10, activation='softmax')
])

# 3. Compile
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# 4. Train
model.fit(X_train_flat, y_train_encoded, epochs=10)
```

### 3. Key Neural Network Terms
- **Flattening**: Converting multidimensional data (images) into 1D (vector).
- **Activation Functions**:
    - **ReLU**: Most common for hidden layers.
    - **Softmax**: Used in output layers for multi-class classification (outputs probabilities).
- **Loss Functions**:
    - **Categorical Crossentropy**: For multi-class classification with one-hot labels.
    - **MSE**: For regression problems.
- **Metrics**: **Accuracy** is the primary metric for classification.

---

---

## Lecture 9: NLP Basics (Text Preprocessing)

### 1. Noise Removal
- **Lowercase**: `text.lower()`
- **Remove Punctuation**:
```python
import string
translator = str.maketrans('', '', string.punctuation)
clean_text = text.translate(translator)
```

### 2. Tokenization
- **Simple Split**: `text.split()` (Splits by spaces).
- **BERT Tokenizer**: Smart tokenizer that breaks words into sub-words (tokens). Handles complex vocabulary better.
```python
from transformers import AutoTokenizer
tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
tokens = tokenizer.tokenize("text here")
```

### 3. Stop Word Removal
- **Concept**: Removing common words with little meaning (e.g., "is", "the", "at").
```python
import nltk
from nltk.corpus import stopwords
nltk.download('stopwords')
stop_words = set(stopwords.words('english'))
tokens = [w for w in tokens if w not in stop_words]
```

### 4. Stemming vs. Lemmatization
- **Stemming**: Chops off suffixes (fast, but insensitive).
- **Lemmatization**: Returns the actual root word (dictionary-based, accurate).
```python
from nltk.stem import PorterStemmer, WordNetLemmatizer
stemmer = PorterStemmer()
lemmatizer = WordNetLemmatizer()

stemmer.stem("deliveries") # -> "deliveri"
lemmatizer.lemmatize("deliveries") # -> "delivery"
```

### 5. Vectorization (Method A: Bag of Words)
- **Concept**: Counting word frequencies in a corpus.
```python
from sklearn.feature_extraction.text import CountVectorizer
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(corpus)
vocab = vectorizer.get_feature_names_out()
```

### 6. Vectorization (Method B: Embeddings)
- **Concept**: Dense vectors representing meaning (numbers that capture relationships like King/Queen).
```python
from sentence_transformers import SentenceTransformer
model = SentenceTransformer('all-MiniLM-L6-v2')
embeddings = model.encode(["words", "sentences"])
```

### 7. Padding
- **Concept**: Ensuring all input sequences have the same length for deep learning models.
```python
from tensorflow.keras.preprocessing.sequence import pad_sequences
# padding='post' adds zeros at the end
padded = pad_sequences(sequences, padding='post')
```

---

---

## Lecture 10: NLP Hands-on (Practical Implementation)

This lecture reinforces the preprocessing steps with practical examples on datasets.

### 1. Hands-on Preprocessing
- **Workflow**:
    1. Lowercase text.
    2. Remove noise using `str.maketrans`.
    3. Tokenize with BERT or simple split.
    4. Remove Stop Words using `nltk`.
    5. Stem/Lemmatize to find root words.
    6. Vectorize using `CountVectorizer` or `SentenceTransformer`.

### 2. Keras Tokenizer vs. BERT
- **Keras Tokenizer**: Good for manual control over word indices and padding.
- **BERT Tokenizer**: Best for capturing semantic meaning and handling unknown words (OOV) via sub-word tokens.

### 3. Practical Code (Bag of Words with DataFrame)
```python
from sklearn.feature_extraction.text import CountVectorizer
import pandas as pd

corpus = ["Win free money", "Win huge money", "The deliveries were delayed"]
vectorizer = CountVectorizer()
sent_vector = vectorizer.fit_transform(corpus)

# Visualize as Table
df = pd.DataFrame(sent_vector.toarray(), columns=vectorizer.get_feature_names_out())
print(df)
```

---

---

## Lecture 11: RNN (Recurrent Neural Networks)

### 1. RNN Equation (The Hidden State)
- **Concept**: RNNs maintain a "memory" (hidden state) to process sequential data.
- **Formula**: $h_t = \tanh(W_h \cdot h_{t-1} + W_x \cdot x_t + b)$
    - $h_t$: Current hidden state.
    - $h_{t-1}$: Previous hidden state.
    - $x_t$: Current input.
    - $W_h, W_x$: Weight matrices.
    - $b$: Bias.
    - $\tanh$: Activation function.

### 2. RNN Model Architecture (Sentiment Analysis)
- **Layers**:
    1. **Embedding Layer**: Converts word indices into dense vectors of fixed size.
    2. **SimpleRNN Layer**: processes sequence step-by-step.
    3. **Dense Layer**: Final output (e.g., sigmoid for binary classification).

```python
from keras.models import Sequential
from keras.layers import Dense, SimpleRNN, Embedding

model = Sequential([
    # input_dim: vocab size, output_dim: embedding vector size
    Embedding(input_dim=100, output_dim=8), 
    SimpleRNN(16),
    Dense(1, activation='sigmoid') # Binary decision (0 or 1)
])

model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
```

### 3. Key Concepts
- **Sequential Data**: Data where order matters (text, time-series).
- **Hidden State**: Stores info about previous steps in the sequence.
- **Vanishing Gradient**: A common issue in simple RNNs where long-term dependencies are lost (solved by LSTM/GRU).

---

---

## Lecture 12: LLM Architecture & Applications

This lecture focuses on practical applications of Large Language Models (LLMs) using the Hugging Face `transformers` library.

### 1. Hugging Face Pipelines
- **Concept**: High-level API to perform NLP tasks with pre-trained models.
- **Tasks**:
    - **Sentiment Analysis**: `pipeline("sentiment-analysis")`
    - **Summarization**: `pipeline("summarization")`
    - **Translation**: `pipeline("translation_xx_to_yy")`

### 2. Machine Translation
- **Example (EN to HI)**:
```python
from transformers import pipeline
translator = pipeline('translation_en_to_hi', model='Helsinki-NLP/opus-mt-en-hi')
result = translator("Machine learning is fascinating.")
# Output: [{'translation_text': 'मशीन सीखने रोमांचक है।'}]
```

### 3. Text Summarization
- **Extractive**: Picks key sentences from the original text.
- **Abstractive**: Generates new sentences (like T5/BART).
- **Models**:
    - **T5**: Text-To-Text Transfer Transformer (every task is text-to-text).
    - **BART**: Encoder-Decoder model pre-trained by denoising.

```python
summarizer = pipeline('summarization', model='facebook/bart-large-cnn')
summary = summarizer(long_text, min_length=30, max_length=150)
```

### 4. Key Models to Remember
| Model | Architecture | Primary Use Case |
| :--- | :--- | :--- |
| **BERT** | Encoder-only | Text Classification, NER, QA |
| **GPT** | Decoder-only | Text Generation |
| **T5 / BART** | Encoder-Decoder | Translation, Summarization |

---
# Newton Book — Step-by-Step Data Science Guide

> **Powered by Edison** | Newton Book is an interactive web-based tool for data analysis, research, and teaching.

---

## Table of Contents

1. [Linear Regression — California Housing](#1-linear-regression--california-housing)
2. [Logistic Regression — Snake Presence Prediction](#2-logistic-regression--snake-presence-prediction)
3. [Data Preprocessing — Customer Dataset](#3-data-preprocessing--customer-dataset)
4. [Medical Diagnosis — Disease Risk Prediction](#4-medical-diagnosis--disease-risk-prediction)
5. [Hotel Booking — EDA & Analysis](#5-hotel-booking--eda--analysis)
6. [NumPy Exercises](#6-numpy-exercises)
7. [Pandas — Employee Data Analysis](#7-pandas--employee-data-analysis)
8. [Linear Regression — House Price Prediction](#8-linear-regression--house-price-prediction)
9. [Linear Regression — Employee Salary Prediction](#9-linear-regression--employee-salary-prediction)
10. [Decision Tree — Breast Cancer Classification](#10-decision-tree--breast-cancer-classification)
11. [Neural Network from Scratch — XOR Problem](#11-neural-network-from-scratch--xor-problem)
12. [Logistic Regression — Loan Approval](#12-logistic-regression--loan-approval)
13. [Decision Tree — Iris Classification](#13-decision-tree--iris-classification)
14. [Custom Neural Network — Activation Functions Comparison](#14-custom-neural-network--activation-functions-comparison)

---

## 1. Linear Regression — California Housing

### Step 1: Install & Import Libraries
```python
!pip install matplotlib -q
!pip install scikit-learn -q

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler
from sklearn.datasets import fetch_california_housing

np.set_printoptions(precision=2)
```

### Step 2: Load the Dataset
```python
california_housing = fetch_california_housing(as_frame=True)
df = california_housing.frame
df.head()
```
> **Output:** DataFrame with columns: `MedInc`, `HouseAge`, `AveRooms`, `AveBedrms`, `Population`, `AveOccup`, `Latitude`, `Longitude`, `MedHouseVal`

### Step 3: Prepare Features & Target
```python
# Drop unused columns; keep only AveRooms, AveBedrms, HouseAge
X_train = df.drop(['MedInc', 'Population', 'AveOccup', 'Latitude', 'Longitude', 'MedHouseVal'], axis=1)
y_train = df['MedHouseVal']

X_features = ['AveRooms', 'AveBedrms', 'HouseAge']
```

### Step 4: Train Linear Regression Model
```python
linear_model = LinearRegression()
linear_model.fit(X_train, y_train)
```

### Step 5: Inspect Coefficients & Intercept
```python
w = linear_model.coef_     # array([ 0.02,  0.34, -1.59])
b = linear_model.intercept_ # 1.5234...
print("Weights:", w)
print("Bias:", b)
```

---

## 2. Logistic Regression — Snake Presence Prediction

### Step 1: Install & Import Libraries
```python
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, log_loss
from sklearn.datasets import make_classification
```

### Step 2: Generate Synthetic Dataset
```python
# Predict snake presence based on Temperature & Humidity
X, y = make_classification(
    n_samples=2000, n_features=2, n_informative=2,
    n_redundant=0, n_clusters_per_class=1,
    class_sep=0.8, random_state=42
)

df = pd.DataFrame(X, columns=['Temperature', 'Humidity'])
df['Snake_Presence'] = y
```

### Step 3: Split Dataset
```python
X = df[["Temperature", "Humidity"]]
y = df['Snake_Presence']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
```

### Step 4: Feature Scaling
```python
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled  = scaler.transform(X_test)
```

### Step 5: Train Logistic Regression Model
```python
model = LogisticRegression()
model.fit(X_train_scaled, y_train)
```

### Step 6: Make Predictions
```python
y_pred = model.predict(X_test_scaled)
y_prob = model.predict_proba(X_test_scaled)
```

### Step 7: Evaluate Model
```python
accuracy = accuracy_score(y_test, y_pred)
# Output: 0.8925

log_likelihood = -log_loss(y_test, y_prob)
# Output: -0.3483
```

---

## 3. Data Preprocessing — Customer Dataset

### Step 1: Import Libraries
```python
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
```

### Step 2: Load & Explore Data
```python
df = pd.read_csv('ques_data.csv')
print(df.head())
print(df.info())
```

### Step 3: Drop Useless Columns & Remove Duplicates
```python
df.drop('CustomerID', axis=1, inplace=True)

df.drop_duplicates(inplace=True)
df.reset_index(drop=True, inplace=True)
```

### Step 4: Handle Missing Values
```python
# Numerical columns → fill with median
numerical_cols = df.select_dtypes(include=np.number).columns.tolist()
if 'Has_Subscription' in numerical_cols:
    numerical_cols.remove('Has_Subscription')

for col in numerical_cols:
    df[col].fillna(df[col].median(), inplace=True)

# Categorical columns → fill with mode
categorical_cols = df.select_dtypes(include='object').columns.tolist()
for col in categorical_cols:
    df[col].fillna(df[col].mode()[0], inplace=True)
```

### Step 5: Handle Outliers (IQR Method)
```python
outlier_columns = ['Age', 'Monthly_Spend']

for col in outlier_columns:
    q1 = df[col].quantile(0.25)
    q3 = df[col].quantile(0.75)
    iqr = q3 - q1
    lower = q1 - 1.5 * iqr
    upper = q3 + 1.5 * iqr

    df[col] = df[col].clip(lower, upper)
    df[col] = np.maximum(0, df[col])  # No negative values
```

### Step 6: Encode Categorical Features (One-Hot Encoding)
```python
df = pd.get_dummies(df, columns=['Product_Category'])
```

### Step 7: Standardize Numerical Features
```python
features_to_standardize = ['Age', 'Monthly_Spend']
scaler = StandardScaler()
df[features_to_standardize] = scaler.fit_transform(df[features_to_standardize])
```

### Step 8: Verify Scaling
```python
# Values should be within -5 to 5 after standardization
print((df['Age'].min() >= -5) and (df['Age'].max() <= 5))           # True
print((df['Monthly_Spend'].min() >= -5) and (df['Monthly_Spend'].max() <= 5))  # True
```

---

## 4. Medical Diagnosis — Disease Risk Prediction

### Step 1: Install & Import Libraries
```python
!pip install scikit-learn imbalanced-learn

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from imblearn.over_sampling import SMOTE
import warnings
warnings.filterwarnings("ignore")
```

### Step 2: Load Dataset
```python
df = pd.read_csv("medical_diagnosis_data.csv")
print(df.head())
df.info()
```

### Step 3: Remove Duplicates
```python
print("Duplicates before:", df.duplicated().sum())
df.drop_duplicates(inplace=True)
```

### Step 4: Handle Missing Values
```python
# Numerical columns → median
for col in ['Age', 'Blood_Pressure', 'Cholesterol_Level']:
    df[col].fillna(df[col].median(), inplace=True)

# Categorical columns → mode
for col in ['Gender']:
    df[col].fillna(df[col].mode()[0], inplace=True)
```

### Step 5: Handle Outliers (95th Percentile Cap)
```python
for col in ['Blood_Pressure', 'Cholesterol_Level']:
    p95 = df[col].quantile(0.95)
    df[col] = df[col].clip(upper=p95)
```

### Step 6: Encode Categorical Variables
```python
le_gender = LabelEncoder()
le_smoker = LabelEncoder()

df['Gender'] = le_gender.fit_transform(df['Gender'])
df['Smoker'] = le_smoker.fit_transform(df['Smoker'])
```

### Step 7: Train-Test Split (Stratified)
```python
X = df.drop(['PatientID', 'Has_Disease'], axis=1)
y = df['Has_Disease']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)
```

### Step 8: Handle Class Imbalance with SMOTE
```python
smote = SMOTE(random_state=42)
X_train_resampled, y_train_resampled = smote.fit_resample(X_train, y_train)

print(y_train_resampled.value_counts())
# Both classes now have equal representation
```

---

## 5. Hotel Booking — EDA & Analysis

### Step 1: Install & Import
```python
!pip install numpy pandas

import numpy as np
import pandas as pd
import os
```

### Step 2: Load Dataset
```python
dataset_url = os.getenv("dataset_url", "https://d3dyfaf3iutrxo.cloudfront.net/general/upload/850f3751ca744d9a8b9be28698778246.csv")
data = pd.read_csv(dataset_url)
data.columns = data.columns.str.strip()

data.head()
data.describe()
data.info()
```

### Step 3: Check Duplicates
```python
def check_duplicate(df):
    return df.duplicated().sum()

result = check_duplicate(data)
```

### Step 4: Revenue Analysis
```python
def get_revenue_generated_mean(df):
    return df['revenue_generated'].mean()

result2 = get_revenue_generated_mean(data)
```

### Step 5: Null Value Percentage
```python
def percentage_null_values(df):
    return (df.isnull().sum().sum() / (df.shape[0] * df.shape[1])) * 100

result3 = percentage_null_values(data)
```

### Step 6: Most Popular Room Category
```python
def max_room_booking_category(df):
    return df['room_category'].value_counts().idxmax()

result4 = max_room_booking_category(data)
```

### Step 7: Cancellation Count
```python
def cancellation_count(df):
    return (df['booking_status'] == 'Cancelled').sum()

result5 = cancellation_count(data)
```

---

## 6. NumPy Exercises

### Exercise 1: Expense Tracker
```python
import numpy as np

expenses = list(map(float, input().split()))
expenses_array = np.array(expenses)

total_expenses       = np.sum(expenses_array)
average_daily_expense = np.mean(expenses_array)
day_highest_expense  = np.argmax(expenses_array) + 1  # 1-indexed

print(total_expenses)
print(average_daily_expense)
print(day_highest_expense)
```

### Exercise 2: Boolean Masking (Values Between 10 and 20)
```python
import numpy as np

nums = np.array(list(map(int, input().split())))
result_arr = (nums > 10) & (nums < 20)

print(result_arr)
```

### Exercise 3: Vector Operations
```python
import numpy as np

v1 = np.array(list(map(int, input().split())))
v2 = np.array(list(map(int, input().split())))

sum_vec   = v1 + v2
diff_vec  = v1 - v2
cross_vec = np.cross(v1, v2)

print(sum_vec)
print(diff_vec)
print(cross_vec)
```

---

## 7. Pandas — Employee Data Analysis

### Step 1: Create DataFrame
```python
import pandas as pd
import json

data = {
    'Employee_ID': [1, 2, 3, 4, 5, 6],
    'Name': ['Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank'],
    'Department': ['HR', 'Engineering', 'HR', 'Engineering', 'Marketing', 'HR'],
    'Salary': [50000, 60000, 55000, 70000, 65000, 52000],
    'Years_At_Company': [3, 5, 2, 7, 4, 1]
}
employee_data = pd.DataFrame(data)
```

### Step 2: Salary Statistics
```python
salary_range  = max(employee_data['Salary']) - min(employee_data['Salary'])  # 20000
median_salary = employee_data['Salary'].median()                               # 57500.0
```

### Step 3: Department Headcount
```python
department_counts = employee_data['Department'].value_counts()
department_counts.to_json()
# {"HR":3,"Engineering":2,"Marketing":1}
```

---

## 8. Linear Regression — House Price Prediction

### Step 1: Install & Import
```python
!pip install pandas numpy scikit-learn matplotlib seaborn

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score, mean_squared_error
import matplotlib.pyplot as plt
import seaborn as sns
```

### Step 2: Generate Synthetic Dataset
```python
np.random.seed(42)
num_samples = 500

sqft      = np.random.normal(1500, 400, num_samples).astype(int)
bedrooms  = np.random.randint(1, 6, num_samples)
bathrooms = np.random.randint(1, 4, num_samples)
age       = np.random.randint(0, 50, num_samples)
location  = np.random.choice(['Urban', 'Suburban', 'Rural'], num_samples)

base_price = 100000
price = (base_price + (sqft * 150) + (bedrooms * 20000) +
         (bathrooms * 15000) - (age * 1000) +
         np.random.normal(0, 30000, num_samples))

price = np.where(location == 'Urban', price * 1.4,
        np.where(location == 'Suburban', price * 1.1, price))

data = pd.DataFrame({
    'SquareFeet': sqft, 'Bedrooms': bedrooms, 'Bathrooms': bathrooms,
    'Age': age, 'Location': location, 'Price': price
})
```

### Step 3: Encode & Split
```python
data = pd.get_dummies(data, columns=['Location'], prefix='', prefix_sep='')

X = data.drop('Price', axis=1)
y = data['Price']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
```

### Step 4: Train & Predict
```python
model = LinearRegression()
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
```

### Step 5: Evaluate
```python
r2_val = r2_score(y_test, y_pred)   # 0.8814
mse    = mean_squared_error(y_test, y_pred)
rmse   = mse ** 0.5

print(f"R² Score: {r2_val:.4f}")
print(f"MSE: {mse:.2f}")
print(f"RMSE: {rmse:.2f}")
```

### Step 6: Visualize
```python
plt.figure(figsize=(12, 4))

# Actual vs Predicted
plt.subplot(1, 2, 1)
plt.scatter(y_test, y_pred, alpha=0.6, edgecolors='k')
plt.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()], 'r--', lw=2)
plt.xlabel('Actual Prices')
plt.ylabel('Predicted Prices')
plt.title('Actual vs Predicted Prices')

# Correlation Heatmap
plt.subplot(1, 2, 2)
numeric_data = data.select_dtypes(include=['number'])
sns.heatmap(numeric_data.corr(), annot=True, fmt='.2f', cmap='coolwarm', square=True)
plt.title('Feature Correlation Heatmap')

plt.tight_layout()
plt.show()
```

### Step 7: Predict New House
```python
new_house = pd.DataFrame([{
    'SquareFeet': 1800, 'Bedrooms': 3, 'Bathrooms': 2,
    'Age': 5, 'Urban': 1, 'Suburban': 0, 'Rural': 0
}], columns=X_train.columns)

predicted_price = model.predict(new_house)[0]
print(f"Predicted Price: ${predicted_price:,.2f}")
```

---

## 9. Linear Regression — Employee Salary Prediction

### Step 1: Install & Import
```python
!pip install pandas numpy scikit-learn matplotlib

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
import os
```

### Step 2: Load & Encode Dataset
```python
dataset_url = os.getenv("dataset_url", "<csv_url_here>")
employeesalary = pd.read_csv(dataset_url)

# One-hot encoding for categorical columns
employeesalary_encoded = pd.get_dummies(employeesalary, drop_first=True)
```

### Step 3: Define Features & Target
```python
X = employeesalary_encoded.drop('Salary', axis=1)
y = employeesalary_encoded['Salary']
```

### Step 4: Split Data
```python
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
```

### Step 5: Train Model
```python
model = LinearRegression()
model.fit(X_train, y_train)
```

### Step 6: Predict & Evaluate
```python
y_pred    = model.predict(X_test)
residuals = y_test - y_pred
mse       = mean_squared_error(y_test, y_pred)

print("Coefficients:", model.coef_)
print("MSE:", mse)
```

### Step 7: Predict for a Specific Person
```python
example_data = pd.DataFrame({
    'Experience': [3], 'Age': [28],
    'Education_Master': [1], 'Location_Urban': [1],
    'Job_Title_Engineer': [1], 'Gender_Male': [0]
})
example_data = example_data.reindex(columns=X_train.columns, fill_value=0)

predicted_salary = model.predict(example_data)[0]
print(f"Predicted Salary: {predicted_salary:.2f}")
```

---

## 10. Decision Tree — Breast Cancer Classification

### Step 1: Import Libraries
```python
!pip install scikit-learn

from sklearn.datasets import load_breast_cancer
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import numpy as np
import pandas as pd
import json
```

### Step 2: Load Dataset
```python
cancer = load_breast_cancer()
X = pd.DataFrame(cancer.data, columns=cancer.feature_names)
y = cancer.target
```

### Step 3: Split Data
```python
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=0
)
```

### Step 4: Train Classifier
```python
classifier = DecisionTreeClassifier(random_state=42)
classifier.fit(X_train, y_train)
```

### Step 5: Evaluate
```python
predictions = classifier.predict(X_test)
accuracy    = accuracy_score(y_test, predictions)
print(f"Accuracy: {accuracy:.4f}")
```

### Step 6: Feature Importances
```python
importances    = classifier.feature_importances_
sorted_indices = np.argsort(importances)[::-1]

feature_importances = {}
for i in sorted_indices:
    feature_importances[X.columns[i]] = importances[i]

print(json.dumps(feature_importances, indent=2))
```

---

## 11. Neural Network from Scratch — XOR Problem

### Step 1: Import & Define Dataset
```python
import numpy as np

X = np.array([[0,0],[0,1],[1,0],[1,1]])
y = np.array([[0],[1],[1],[0]])   # XOR labels
```

### Step 2: Define Activation & Loss Functions
```python
def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def sigmoid_deriv(x):
    return x * (1 - x)

def binary_cross_entropy(y_true, y_pred):
    return -np.mean(
        y_true * np.log(y_pred + 1e-7) +
        (1 - y_true) * np.log(1 - y_pred + 1e-7)
    )
```

### Step 3: Initialize Weights
```python
np.random.seed(123)

input_dim  = 2
hidden_dim = 3
output_dim = 1
lr         = 0.5
epochs     = 20000

W1 = np.random.randn(input_dim, hidden_dim) * 0.5
b1 = np.zeros((1, hidden_dim))
W2 = np.random.randn(hidden_dim, output_dim) * 0.5
b2 = np.zeros((1, output_dim))
```

### Step 4: Training Loop
```python
for epoch in range(epochs):
    # Forward pass
    z1 = np.dot(X, W1) + b1
    a1 = sigmoid(z1)
    z2 = np.dot(a1, W2) + b2
    a2 = sigmoid(z2)

    # Loss
    loss = binary_cross_entropy(y, a2)

    # Backpropagation
    dz2 = a2 - y
    dW2 = np.dot(a1.T, dz2) / len(X)
    db2 = np.sum(dz2, axis=0, keepdims=True) / len(X)

    da1 = np.dot(dz2, W2.T)
    dz1 = da1 * sigmoid_deriv(a1)
    dW1 = np.dot(X.T, dz1) / len(X)
    db1 = np.sum(dz1, axis=0, keepdims=True) / len(X)

    # Update parameters
    W2 -= lr * dW2;  b2 -= lr * db2
    W1 -= lr * dW1;  b1 -= lr * db1

    if (epoch + 1) % 5000 == 0:
        print(f"Epoch {epoch+1}/{epochs} | Loss: {loss:.6f}")
```

### Step 5: Evaluate
```python
final_preds = (a2 > 0.5).astype(int)
print("Predictions:", final_preds.flatten().tolist())
print("True Labels:", y.flatten().tolist())
```

---

## 12. Logistic Regression — Loan Approval

### Step 1: Import Libraries
```python
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import confusion_matrix, accuracy_score
import matplotlib.pyplot as plt
import seaborn as sns
```

### Step 2: Generate Synthetic Data
```python
np.random.seed(42)
num_samples = 500

age      = np.random.randint(18, 70, num_samples)
income   = np.random.normal(50000, 15000, num_samples).astype(int)
region   = np.random.choice(['Nairobi', 'Mombasa', 'Kisumu', 'Eldoret'], num_samples)
education = np.random.choice(['Primary', 'Secondary', 'Tertiary'], num_samples)
loan_approval = np.random.choice([0, 1], num_samples, p=[0.4, 0.6])

data = pd.DataFrame({
    'Age': age, 'Income': income,
    'Region': region, 'Education': education,
    'LoanApproval': loan_approval
})
```

### Step 3: Preprocessing
```python
data = pd.get_dummies(data, columns=['Region', 'Education'], drop_first=False)

X = data.drop('LoanApproval', axis=1)
y = data['LoanApproval']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
```

### Step 4: Train Model
```python
model = LogisticRegression(max_iter=1000, random_state=42)
model.fit(X_train, y_train)
```

### Step 5: Predict & Evaluate
```python
y_pred = model.predict(X_test)
cm     = confusion_matrix(y_test, y_pred)
acc    = accuracy_score(y_test, y_pred)

print(f"Accuracy: {acc:.4f}")
```

### Step 6: Visualize Confusion Matrix
```python
plt.figure(figsize=(8, 6))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
plt.title('Confusion Matrix')
plt.ylabel('True Label')
plt.xlabel('Predicted Label')
plt.show()
```

---

## 13. Decision Tree — Iris Classification

### Step 1: Import Libraries
```python
from sklearn.datasets import load_iris
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
```

### Step 2: Load Data & Split
```python
iris = load_iris()
X, y = iris.data, iris.target

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
```

### Step 3: Train & Evaluate
```python
model = DecisionTreeClassifier(random_state=42)
model.fit(X_train, y_train)

y_pred   = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)

print(f"Accuracy: {accuracy:.4f}")
```

---

## 14. Custom Neural Network — Activation Functions Comparison

### Step 1: Import & Load Data
```python
import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from sklearn.neural_network import MLPClassifier
from sklearn.metrics import accuracy_score

def load_data():
    X, y = make_classification(
        n_samples=1000, n_features=4, n_informative=3,
        n_redundant=0, random_state=42
    )
    X = MinMaxScaler().fit_transform(X)
    y = y.reshape(-1, 1)
    return train_test_split(X, y, test_size=0.2, random_state=42)
```

### Step 2: Activation Functions Class
```python
class ActivationFunctions:
    def __init__(self, activation='sigmoid'):
        self.activation = activation

    def activate(self, x):
        if self.activation == 'sigmoid': return 1 / (1 + np.exp(-x))
        elif self.activation == 'tanh':  return np.tanh(x)
        elif self.activation == 'relu':  return np.maximum(0, x)

    def derivative(self, x):
        if self.activation == 'sigmoid':
            s = self.activate(x); return s * (1 - s)
        elif self.activation == 'tanh':  return 1 - np.tanh(x) ** 2
        elif self.activation == 'relu':  return (x > 0).astype(float)
```

### Step 3: Custom Neural Network Class
```python
class CustomNeuralNetwork:
    def __init__(self, input_dim, hidden_dim, activation='sigmoid', learning_rate=0.1):
        self.learning_rate = learning_rate
        self.activation_fn = ActivationFunctions(activation)
        np.random.seed(42)
        self.W1 = np.random.randn(input_dim, hidden_dim) * 0.01
        self.b1 = np.zeros((1, hidden_dim))
        self.W2 = np.random.randn(hidden_dim, 1) * 0.01
        self.b2 = np.zeros((1, 1))

    def forward(self, X):
        self.z1 = np.dot(X, self.W1) + self.b1
        self.a1 = self.activation_fn.activate(self.z1)
        self.z2 = np.dot(self.a1, self.W2) + self.b2
        self.a2 = 1 / (1 + np.exp(-self.z2))
        return self.a2

    def compute_loss(self, y_true, y_pred):
        return -np.mean(
            y_true * np.log(y_pred + 1e-8) +
            (1 - y_true) * np.log(1 - y_pred + 1e-8)
        )

    def backward(self, X, y):
        m = X.shape[0]
        dz2 = self.a2 - y
        dW2 = (1/m) * np.dot(self.a1.T, dz2)
        db2 = (1/m) * np.sum(dz2, axis=0, keepdims=True)
        da1 = np.dot(dz2, self.W2.T)
        dz1 = da1 * self.activation_fn.derivative(self.z1)
        dW1 = (1/m) * np.dot(X.T, dz1)
        db1 = (1/m) * np.sum(dz1, axis=0, keepdims=True)
        self.W1 -= self.learning_rate * dW1; self.b1 -= self.learning_rate * db1
        self.W2 -= self.learning_rate * dW2; self.b2 -= self.learning_rate * db2

    def fit(self, X, y, epochs=1000):
        losses = []
        for _ in range(epochs):
            y_pred = self.forward(X)
            losses.append(self.compute_loss(y, y_pred))
            self.backward(X, y)
        self.losses = losses
        return losses

    def predict(self, X):
        return (self.forward(X) > 0.5).astype(int).flatten()
```

### Step 4: Train & Compare with Sklearn MLP
```python
def train_and_compare(X_train, X_test, y_train, y_test, activation='sigmoid'):
    model = CustomNeuralNetwork(input_dim=X_train.shape[1], hidden_dim=6, activation=activation)
    losses = model.fit(X_train, y_train, epochs=1000)
    custom_acc = accuracy_score(y_test, model.predict(X_test))

    sk_act = 'logistic' if activation == 'sigmoid' else activation
    sk_model = MLPClassifier(hidden_layer_sizes=(6,), activation=sk_act, max_iter=1000)
    sk_model.fit(X_train, y_train.ravel())
    sklearn_acc = accuracy_score(y_test, sk_model.predict(X_test))

    return losses, custom_acc, sklearn_acc
```

### Step 5: Plot Loss Curve
```python
def plot_loss(losses, activation):
    plt.figure(figsize=(10, 5))
    plt.plot(losses, label=f'Loss ({activation})')
    plt.xlabel('Epoch'); plt.ylabel('Loss')
    plt.title(f'Training Loss vs Epoch ({activation})')
    plt.legend(); plt.grid(True)
    plt.show()
```

### Step 6: Run All Three Activations
```python
X_train, X_test, y_train, y_test = load_data()

# Sigmoid
losses_s, acc_s, acc_sk_s = train_and_compare(X_train, X_test, y_train, y_test, 'sigmoid')
plot_loss(losses_s, 'sigmoid')
print(f"Sigmoid — Custom: {acc_s:.4f} | Sklearn: {acc_sk_s:.4f}")

# Tanh
losses_t, acc_t, acc_sk_t = train_and_compare(X_train, X_test, y_train, y_test, 'tanh')
plot_loss(losses_t, 'tanh')
print(f"Tanh — Custom: {acc_t:.4f} | Sklearn: {acc_sk_t:.4f}")

# ReLU
losses_r, acc_r, acc_sk_r = train_and_compare(X_train, X_test, y_train, y_test, 'relu')
plot_loss(losses_r, 'relu')
print(f"ReLU — Custom: {acc_r:.4f} | Sklearn: {acc_sk_r:.4f}")
```
# ML Visualizations — Matplotlib & Seaborn Complete Guide

> All important plots, graphs, and diagrams used in Machine Learning questions

---

## Table of Contents

1. [Data Exploration Plots](#1-data-exploration-plots)
2. [Distribution Plots](#2-distribution-plots)
3. [Correlation & Heatmaps](#3-correlation--heatmaps)
4. [Linear Regression Plots](#4-linear-regression-plots)
5. [Logistic Regression Plots](#5-logistic-regression-plots)
6. [Classification & Decision Boundary](#6-classification--decision-boundary)
7. [Confusion Matrix](#7-confusion-matrix)
8. [Decision Tree Visualization](#8-decision-tree-visualization)
9. [Neural Network — Loss Curve](#9-neural-network--loss-curve)
10. [Feature Importance Plot](#10-feature-importance-plot)
11. [ROC Curve & AUC](#11-roc-curve--auc)
12. [Precision-Recall Curve](#12-precision-recall-curve)
13. [Clustering — K-Means Plots](#13-clustering--k-means-plots)
14. [Elbow Method — Optimal K](#14-elbow-method--optimal-k)
15. [PCA — Dimensionality Reduction Plot](#15-pca--dimensionality-reduction-plot)
16. [Residual Plot](#16-residual-plot)
17. [Learning Curve](#17-learning-curve)
18. [Validation Curve](#18-validation-curve)
19. [Box Plot — Outlier Detection](#19-box-plot--outlier-detection)
20. [Pair Plot](#20-pair-plot)

---

## Setup (Always Run First)

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.datasets import (load_iris, load_breast_cancer,
                               make_classification, make_regression,
                               make_blobs)
from sklearn.model_selection import train_test_split, learning_curve, validation_curve
from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.tree import DecisionTreeClassifier, plot_tree
from sklearn.ensemble import RandomForestClassifier
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
from sklearn.metrics import (confusion_matrix, roc_curve, auc,
                              precision_recall_curve, r2_score)
from sklearn.preprocessing import StandardScaler

# Global style settings
plt.rcParams['figure.figsize'] = (8, 5)
plt.rcParams['axes.titlesize'] = 14
plt.rcParams['axes.labelsize'] = 12
sns.set_style("whitegrid")
```

---

## 1. Data Exploration Plots

### 1.1 Bar Chart — Category Counts

```python
import pandas as pd
import matplotlib.pyplot as plt

# Example: Department-wise employee count
data = {'Department': ['HR', 'Engineering', 'HR', 'Engineering', 'Marketing', 'HR']}
df = pd.DataFrame(data)

counts = df['Department'].value_counts()

plt.figure(figsize=(7, 4))
counts.plot(kind='bar', color='steelblue', edgecolor='black')
plt.title('Employee Count by Department')
plt.xlabel('Department')
plt.ylabel('Count')
plt.xticks(rotation=0)
plt.tight_layout()
plt.show()
```

---

### 1.2 Pie Chart — Class Distribution

```python
labels = ['No Disease', 'Has Disease']
sizes  = [350, 150]
colors = ['#66b3ff', '#ff9999']

plt.figure(figsize=(6, 6))
plt.pie(sizes, labels=labels, colors=colors,
        autopct='%1.1f%%', startangle=140, explode=(0, 0.05))
plt.title('Disease Class Distribution')
plt.tight_layout()
plt.show()
```

---

### 1.3 Count Plot (Seaborn)

```python
from sklearn.datasets import load_iris
import seaborn as sns

iris = load_iris(as_frame=True)
df = iris.frame
df['target_name'] = df['target'].map({0:'setosa', 1:'versicolor', 2:'virginica'})

plt.figure(figsize=(7, 4))
sns.countplot(x='target_name', data=df, palette='Set2', edgecolor='black')
plt.title('Class Distribution — Iris Dataset')
plt.xlabel('Species')
plt.ylabel('Count')
plt.tight_layout()
plt.show()
```

---

## 2. Distribution Plots

### 2.1 Histogram — Single Feature

```python
from sklearn.datasets import fetch_california_housing

housing = fetch_california_housing(as_frame=True)
df = housing.frame

plt.figure(figsize=(7, 4))
plt.hist(df['MedHouseVal'], bins=40, color='coral', edgecolor='black', alpha=0.8)
plt.title('Distribution of Median House Value')
plt.xlabel('Median House Value')
plt.ylabel('Frequency')
plt.tight_layout()
plt.show()
```

---

### 2.2 KDE Plot — Density Curve

```python
plt.figure(figsize=(7, 4))
sns.kdeplot(df['MedInc'], fill=True, color='steelblue', alpha=0.6)
plt.title('KDE — Median Income')
plt.xlabel('Median Income')
plt.ylabel('Density')
plt.tight_layout()
plt.show()
```

---

### 2.3 Histogram + KDE (Combined)

```python
plt.figure(figsize=(7, 4))
sns.histplot(df['HouseAge'], bins=30, kde=True, color='mediumseagreen')
plt.title('House Age — Histogram with KDE')
plt.xlabel('House Age')
plt.ylabel('Count')
plt.tight_layout()
plt.show()
```

---

## 3. Correlation & Heatmaps

### 3.1 Correlation Heatmap

```python
from sklearn.datasets import load_iris

iris = load_iris(as_frame=True)
df = iris.frame

plt.figure(figsize=(7, 5))
corr = df.corr()
sns.heatmap(corr, annot=True, fmt='.2f', cmap='coolwarm',
            square=True, linewidths=0.5, cbar_kws={"shrink": 0.8})
plt.title('Feature Correlation Heatmap')
plt.tight_layout()
plt.show()
```

---

### 3.2 Heatmap — Confusion Matrix Style (General)

```python
matrix_data = np.array([[50, 5], [3, 42]])

plt.figure(figsize=(5, 4))
sns.heatmap(matrix_data, annot=True, fmt='d', cmap='Blues',
            xticklabels=['Predicted 0', 'Predicted 1'],
            yticklabels=['Actual 0', 'Actual 1'])
plt.title('Custom Heatmap')
plt.tight_layout()
plt.show()
```

---

## 4. Linear Regression Plots

### 4.1 Actual vs Predicted (Scatter Plot)

```python
from sklearn.datasets import make_regression
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

X, y = make_regression(n_samples=300, n_features=1, noise=20, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = LinearRegression()
model.fit(X_train, y_train)
y_pred = model.predict(X_test)

plt.figure(figsize=(7, 5))
plt.scatter(y_test, y_pred, alpha=0.6, color='steelblue', edgecolors='k')
plt.plot([y_test.min(), y_test.max()],
         [y_test.min(), y_test.max()], 'r--', lw=2, label='Perfect Fit')
plt.xlabel('Actual Values')
plt.ylabel('Predicted Values')
plt.title('Actual vs Predicted — Linear Regression')
plt.legend()
plt.tight_layout()
plt.show()
```

---

### 4.2 Regression Line Plot

```python
X_flat = X.flatten()
y_line = model.predict(X)

plt.figure(figsize=(7, 5))
plt.scatter(X_flat, y, alpha=0.4, color='gray', label='Data Points')
plt.plot(sorted(X_flat), sorted(y_line), color='red', lw=2, label='Regression Line')
plt.xlabel('Feature')
plt.ylabel('Target')
plt.title('Linear Regression Line')
plt.legend()
plt.tight_layout()
plt.show()
```

---

### 4.3 Residuals Plot

```python
residuals = y_test - y_pred

plt.figure(figsize=(7, 4))
plt.scatter(y_pred, residuals, alpha=0.6, color='purple', edgecolors='k')
plt.axhline(0, color='red', linestyle='--', lw=2)
plt.xlabel('Predicted Values')
plt.ylabel('Residuals')
plt.title('Residuals vs Predicted Values')
plt.tight_layout()
plt.show()
```

---

## 5. Logistic Regression Plots

### 5.1 Sigmoid Curve

```python
z = np.linspace(-10, 10, 300)
sigmoid = 1 / (1 + np.exp(-z))

plt.figure(figsize=(7, 4))
plt.plot(z, sigmoid, color='steelblue', lw=2)
plt.axhline(0.5, color='red', linestyle='--', label='Threshold = 0.5')
plt.axvline(0, color='gray', linestyle='--', alpha=0.5)
plt.xlabel('z (Linear Combination)')
plt.ylabel('Probability')
plt.title('Sigmoid Activation Function')
plt.legend()
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()
```

---

### 5.2 Probability Distribution of Predictions

```python
from sklearn.datasets import make_classification
from sklearn.linear_model import LogisticRegression

X, y = make_classification(n_samples=500, n_features=2, n_redundant=0,
                            n_informative=2, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = LogisticRegression()
model.fit(X_train, y_train)
y_prob = model.predict_proba(X_test)[:, 1]

plt.figure(figsize=(7, 4))
plt.hist(y_prob[y_test == 0], bins=20, alpha=0.6, color='blue', label='Class 0')
plt.hist(y_prob[y_test == 1], bins=20, alpha=0.6, color='red',  label='Class 1')
plt.axvline(0.5, color='black', linestyle='--', label='Threshold')
plt.xlabel('Predicted Probability')
plt.ylabel('Count')
plt.title('Predicted Probability Distribution')
plt.legend()
plt.tight_layout()
plt.show()
```

---

## 6. Classification & Decision Boundary

### 6.1 Decision Boundary Plot (2D Features)

```python
from sklearn.linear_model import LogisticRegression
from sklearn.datasets import make_classification

X, y = make_classification(n_samples=300, n_features=2, n_redundant=0,
                            n_informative=2, n_clusters_per_class=1, random_state=42)

model = LogisticRegression()
model.fit(X, y)

# Create mesh grid
x_min, x_max = X[:, 0].min() - 1, X[:, 0].max() + 1
y_min, y_max = X[:, 1].min() - 1, X[:, 1].max() + 1
xx, yy = np.meshgrid(np.linspace(x_min, x_max, 300),
                     np.linspace(y_min, y_max, 300))
Z = model.predict(np.c_[xx.ravel(), yy.ravel()]).reshape(xx.shape)

plt.figure(figsize=(8, 5))
plt.contourf(xx, yy, Z, alpha=0.3, cmap='RdBu')
plt.scatter(X[:, 0], X[:, 1], c=y, cmap='RdBu', edgecolors='k', alpha=0.7)
plt.xlabel('Feature 1')
plt.ylabel('Feature 2')
plt.title('Decision Boundary — Logistic Regression')
plt.tight_layout()
plt.show()
```

---

### 6.2 Decision Boundary — Decision Tree

```python
from sklearn.tree import DecisionTreeClassifier

model_dt = DecisionTreeClassifier(max_depth=3, random_state=42)
model_dt.fit(X, y)

Z_dt = model_dt.predict(np.c_[xx.ravel(), yy.ravel()]).reshape(xx.shape)

plt.figure(figsize=(8, 5))
plt.contourf(xx, yy, Z_dt, alpha=0.3, cmap='coolwarm')
plt.scatter(X[:, 0], X[:, 1], c=y, cmap='coolwarm', edgecolors='k', alpha=0.7)
plt.xlabel('Feature 1')
plt.ylabel('Feature 2')
plt.title('Decision Boundary — Decision Tree')
plt.tight_layout()
plt.show()
```

---

## 7. Confusion Matrix

### 7.1 Basic Confusion Matrix Heatmap

```python
from sklearn.metrics import confusion_matrix
from sklearn.datasets import load_breast_cancer
from sklearn.tree import DecisionTreeClassifier

cancer = load_breast_cancer()
X_train, X_test, y_train, y_test = train_test_split(
    cancer.data, cancer.target, test_size=0.3, random_state=42)

clf = DecisionTreeClassifier(random_state=42)
clf.fit(X_train, y_train)
y_pred = clf.predict(X_test)

cm = confusion_matrix(y_test, y_pred)

plt.figure(figsize=(6, 5))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
            xticklabels=['Malignant', 'Benign'],
            yticklabels=['Malignant', 'Benign'])
plt.title('Confusion Matrix — Breast Cancer')
plt.ylabel('True Label')
plt.xlabel('Predicted Label')
plt.tight_layout()
plt.show()
```

---

### 7.2 Normalized Confusion Matrix

```python
cm_norm = cm.astype('float') / cm.sum(axis=1)[:, np.newaxis]

plt.figure(figsize=(6, 5))
sns.heatmap(cm_norm, annot=True, fmt='.2f', cmap='YlOrRd',
            xticklabels=['Malignant', 'Benign'],
            yticklabels=['Malignant', 'Benign'])
plt.title('Normalized Confusion Matrix')
plt.ylabel('True Label')
plt.xlabel('Predicted Label')
plt.tight_layout()
plt.show()
```

---

## 8. Decision Tree Visualization

### 8.1 Plot Decision Tree Structure

```python
from sklearn.tree import plot_tree
from sklearn.datasets import load_iris

iris = load_iris()
X_train, X_test, y_train, y_test = train_test_split(
    iris.data, iris.target, test_size=0.3, random_state=42)

dt = DecisionTreeClassifier(max_depth=3, random_state=42)
dt.fit(X_train, y_train)

plt.figure(figsize=(16, 6))
plot_tree(dt,
          feature_names=iris.feature_names,
          class_names=iris.target_names,
          filled=True, rounded=True, fontsize=10)
plt.title('Decision Tree — Iris Dataset')
plt.tight_layout()
plt.show()
```

---

## 9. Neural Network — Loss Curve

### 9.1 Training Loss vs Epoch

```python
# Simulated loss values (replace with real losses from training loop)
epochs = list(range(1, 21))
train_loss = [0.693, 0.65, 0.60, 0.55, 0.50, 0.46, 0.42, 0.38,
              0.35, 0.32, 0.29, 0.27, 0.25, 0.23, 0.21, 0.20,
              0.19, 0.18, 0.17, 0.16]

plt.figure(figsize=(8, 4))
plt.plot(epochs, train_loss, marker='o', color='steelblue',
         linewidth=2, markersize=5, label='Training Loss')
plt.xlabel('Epoch')
plt.ylabel('Loss (Binary Cross-Entropy)')
plt.title('Training Loss vs Epoch')
plt.legend()
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()
```

---

### 9.2 Train vs Validation Loss (Overfitting Check)

```python
train_loss = [0.65, 0.55, 0.45, 0.38, 0.30, 0.25, 0.21, 0.18, 0.16, 0.14]
val_loss   = [0.67, 0.58, 0.50, 0.45, 0.42, 0.43, 0.45, 0.48, 0.51, 0.55]
epochs     = list(range(1, 11))

plt.figure(figsize=(8, 4))
plt.plot(epochs, train_loss, 'b-o', label='Train Loss')
plt.plot(epochs, val_loss,   'r-o', label='Validation Loss')
plt.axvline(x=5, color='green', linestyle='--', label='Best Epoch')
plt.xlabel('Epoch')
plt.ylabel('Loss')
plt.title('Train vs Validation Loss')
plt.legend()
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()
```

---

## 10. Feature Importance Plot

### 10.1 Bar Chart — Feature Importances (Random Forest)

```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_iris

iris = load_iris()
X_train, X_test, y_train, y_test = train_test_split(
    iris.data, iris.target, test_size=0.3, random_state=42)

rf = RandomForestClassifier(n_estimators=100, random_state=42)
rf.fit(X_train, y_train)

importances    = rf.feature_importances_
feature_names  = iris.feature_names
sorted_idx     = np.argsort(importances)[::-1]

plt.figure(figsize=(8, 4))
plt.bar(range(len(importances)),
        importances[sorted_idx],
        color='teal', edgecolor='black')
plt.xticks(range(len(importances)),
           [feature_names[i] for i in sorted_idx], rotation=30)
plt.xlabel('Feature')
plt.ylabel('Importance Score')
plt.title('Feature Importance — Random Forest')
plt.tight_layout()
plt.show()
```

---

### 10.2 Horizontal Bar — Linear Regression Coefficients

```python
from sklearn.datasets import make_regression
from sklearn.linear_model import LinearRegression

feature_names = ['SquareFeet', 'Bedrooms', 'Bathrooms', 'Age', 'Urban', 'Suburban', 'Rural']
coefficients  = [182.1, 23096.6, 16908.6, -1238.9, 88185.2, -28423.7, -59761.5]

colors = ['green' if c > 0 else 'red' for c in coefficients]

plt.figure(figsize=(8, 5))
plt.barh(feature_names, coefficients, color=colors, edgecolor='black')
plt.axvline(0, color='black', linewidth=0.8)
plt.xlabel('Coefficient Value')
plt.title('Linear Regression Coefficients')
plt.tight_layout()
plt.show()
```

---

## 11. ROC Curve & AUC

```python
from sklearn.metrics import roc_curve, auc
from sklearn.linear_model import LogisticRegression
from sklearn.datasets import load_breast_cancer

cancer = load_breast_cancer()
X_train, X_test, y_train, y_test = train_test_split(
    cancer.data, cancer.target, test_size=0.3, random_state=42)

model = LogisticRegression(max_iter=10000)
model.fit(X_train, y_train)
y_prob = model.predict_proba(X_test)[:, 1]

fpr, tpr, _ = roc_curve(y_test, y_prob)
roc_auc     = auc(fpr, tpr)

plt.figure(figsize=(7, 5))
plt.plot(fpr, tpr, color='darkorange', lw=2,
         label=f'ROC Curve (AUC = {roc_auc:.2f})')
plt.plot([0, 1], [0, 1], color='navy', linestyle='--', label='Random Classifier')
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.title('ROC Curve — Logistic Regression')
plt.legend(loc='lower right')
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()
```

---

## 12. Precision-Recall Curve

```python
from sklearn.metrics import precision_recall_curve

precision, recall, _ = precision_recall_curve(y_test, y_prob)

plt.figure(figsize=(7, 5))
plt.plot(recall, precision, color='purple', lw=2)
plt.xlabel('Recall')
plt.ylabel('Precision')
plt.title('Precision-Recall Curve')
plt.fill_between(recall, precision, alpha=0.1, color='purple')
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()
```

---

## 13. Clustering — K-Means Plots

### 13.1 Scatter Plot — Cluster Assignment

```python
from sklearn.cluster import KMeans
from sklearn.datasets import make_blobs

X_blob, _ = make_blobs(n_samples=300, centers=3,
                        cluster_std=0.8, random_state=42)

kmeans = KMeans(n_clusters=3, random_state=42, n_init=10)
labels = kmeans.fit_predict(X_blob)
centers = kmeans.cluster_centers_

plt.figure(figsize=(7, 5))
scatter = plt.scatter(X_blob[:, 0], X_blob[:, 1],
                      c=labels, cmap='Set1', alpha=0.7, edgecolors='k', s=50)
plt.scatter(centers[:, 0], centers[:, 1],
            c='black', marker='X', s=200, zorder=5, label='Centroids')
plt.title('K-Means Clustering (k=3)')
plt.xlabel('Feature 1')
plt.ylabel('Feature 2')
plt.legend()
plt.colorbar(scatter, label='Cluster')
plt.tight_layout()
plt.show()
```

---

## 14. Elbow Method — Optimal K

```python
inertia = []
K_range = range(1, 11)

for k in K_range:
    km = KMeans(n_clusters=k, random_state=42, n_init=10)
    km.fit(X_blob)
    inertia.append(km.inertia_)

plt.figure(figsize=(7, 4))
plt.plot(K_range, inertia, 'bo-', linewidth=2, markersize=8)
plt.axvline(x=3, color='red', linestyle='--', label='Optimal k=3')
plt.xlabel('Number of Clusters (k)')
plt.ylabel('Inertia (WCSS)')
plt.title('Elbow Method — Optimal Number of Clusters')
plt.legend()
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()
```

---

## 15. PCA — Dimensionality Reduction Plot

### 15.1 PCA Scatter (2 Components)

```python
from sklearn.decomposition import PCA
from sklearn.datasets import load_iris
from sklearn.preprocessing import StandardScaler

iris = load_iris()
X_scaled = StandardScaler().fit_transform(iris.data)

pca = PCA(n_components=2)
X_pca = pca.fit_transform(X_scaled)

plt.figure(figsize=(7, 5))
colors = ['red', 'green', 'blue']
for i, (color, name) in enumerate(zip(colors, iris.target_names)):
    plt.scatter(X_pca[iris.target == i, 0],
                X_pca[iris.target == i, 1],
                c=color, label=name, alpha=0.7, edgecolors='k')
plt.xlabel(f'PC1 ({pca.explained_variance_ratio_[0]*100:.1f}% variance)')
plt.ylabel(f'PC2 ({pca.explained_variance_ratio_[1]*100:.1f}% variance)')
plt.title('PCA — Iris Dataset (2 Components)')
plt.legend()
plt.tight_layout()
plt.show()
```

---

### 15.2 Explained Variance (Scree Plot)

```python
pca_full = PCA().fit(X_scaled)
explained = pca_full.explained_variance_ratio_
cumulative = np.cumsum(explained)

plt.figure(figsize=(7, 4))
plt.bar(range(1, len(explained)+1), explained,
        alpha=0.7, color='steelblue', label='Individual')
plt.plot(range(1, len(cumulative)+1), cumulative,
         'r-o', label='Cumulative')
plt.axhline(0.95, color='green', linestyle='--', label='95% Threshold')
plt.xlabel('Principal Component')
plt.ylabel('Explained Variance Ratio')
plt.title('Scree Plot — PCA')
plt.legend()
plt.tight_layout()
plt.show()
```

---

## 16. Residual Plot

```python
from sklearn.datasets import make_regression
from sklearn.linear_model import LinearRegression

X, y = make_regression(n_samples=200, n_features=1, noise=25, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = LinearRegression().fit(X_train, y_train)
y_pred = model.predict(X_test)
residuals = y_test - y_pred

fig, axes = plt.subplots(1, 2, figsize=(12, 4))

# Residuals vs Predicted
axes[0].scatter(y_pred, residuals, alpha=0.6, color='coral', edgecolors='k')
axes[0].axhline(0, color='red', linestyle='--', lw=2)
axes[0].set_xlabel('Predicted Values')
axes[0].set_ylabel('Residuals')
axes[0].set_title('Residuals vs Predicted')

# Residuals Distribution
axes[1].hist(residuals, bins=20, color='steelblue', edgecolor='black', alpha=0.8)
axes[1].axvline(0, color='red', linestyle='--', lw=2)
axes[1].set_xlabel('Residuals')
axes[1].set_ylabel('Frequency')
axes[1].set_title('Residuals Distribution')

plt.tight_layout()
plt.show()
```

---

## 17. Learning Curve

```python
from sklearn.model_selection import learning_curve
from sklearn.tree import DecisionTreeClassifier
from sklearn.datasets import load_breast_cancer

cancer = load_breast_cancer()
X, y = cancer.data, cancer.target

train_sizes, train_scores, val_scores = learning_curve(
    DecisionTreeClassifier(random_state=42), X, y,
    cv=5, n_jobs=-1, train_sizes=np.linspace(0.1, 1.0, 10),
    scoring='accuracy'
)

train_mean = train_scores.mean(axis=1)
train_std  = train_scores.std(axis=1)
val_mean   = val_scores.mean(axis=1)
val_std    = val_scores.std(axis=1)

plt.figure(figsize=(8, 5))
plt.plot(train_sizes, train_mean, 'b-o', label='Train Accuracy')
plt.fill_between(train_sizes, train_mean - train_std,
                              train_mean + train_std, alpha=0.15, color='blue')
plt.plot(train_sizes, val_mean, 'r-o', label='Validation Accuracy')
plt.fill_between(train_sizes, val_mean - val_std,
                              val_mean + val_std, alpha=0.15, color='red')
plt.xlabel('Training Size')
plt.ylabel('Accuracy')
plt.title('Learning Curve — Decision Tree')
plt.legend()
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()
```

---

## 18. Validation Curve

```python
from sklearn.model_selection import validation_curve

param_range = [1, 2, 3, 4, 5, 6, 8, 10, 15, 20]

train_scores, val_scores = validation_curve(
    DecisionTreeClassifier(random_state=42), X, y,
    param_name='max_depth', param_range=param_range,
    cv=5, scoring='accuracy'
)

train_mean = train_scores.mean(axis=1)
val_mean   = val_scores.mean(axis=1)

plt.figure(figsize=(8, 5))
plt.plot(param_range, train_mean, 'b-o', label='Train Accuracy')
plt.plot(param_range, val_mean,   'r-o', label='Validation Accuracy')
plt.xlabel('Max Depth')
plt.ylabel('Accuracy')
plt.title('Validation Curve — Decision Tree (max_depth)')
plt.legend()
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()
```

---

## 19. Box Plot — Outlier Detection

### 19.1 Single Column Box Plot

```python
import numpy as np
import matplotlib.pyplot as plt

data = np.concatenate([np.random.normal(50, 10, 100), [5, 95, 100]])  # with outliers

plt.figure(figsize=(5, 5))
plt.boxplot(data, patch_artist=True,
            boxprops=dict(facecolor='lightblue', color='navy'),
            medianprops=dict(color='red', linewidth=2),
            whiskerprops=dict(color='navy'),
            flierprops=dict(marker='o', color='red', markersize=8))
plt.title('Box Plot — Outlier Detection')
plt.ylabel('Value')
plt.tight_layout()
plt.show()
```

---

### 19.2 Multiple Features Box Plot (Seaborn)

```python
from sklearn.datasets import load_iris

iris = load_iris(as_frame=True)
df = iris.frame
df['species'] = df['target'].map({0:'setosa', 1:'versicolor', 2:'virginica'})

plt.figure(figsize=(10, 5))
sns.boxplot(data=df, x='species', y='sepal length (cm)',
            palette='Set2', width=0.5)
plt.title('Sepal Length by Species')
plt.xlabel('Species')
plt.ylabel('Sepal Length (cm)')
plt.tight_layout()
plt.show()
```

---

## 20. Pair Plot

```python
from sklearn.datasets import load_iris
import seaborn as sns

iris = load_iris(as_frame=True)
df = iris.frame
df['species'] = df['target'].map({0:'setosa', 1:'versicolor', 2:'virginica'})

# Drop numeric target before plotting
df_plot = df.drop('target', axis=1)

pair_grid = sns.pairplot(df_plot, hue='species', palette='Set1',
                          diag_kind='kde', plot_kws={'alpha': 0.6})
pair_grid.figure.suptitle('Pair Plot — Iris Dataset', y=1.02, fontsize=14)
plt.tight_layout()
plt.show()
```

---

## Quick Reference Table

| Plot | When to Use | Key Function |
|------|-------------|-------------|
| Histogram | Feature distribution | `plt.hist()` / `sns.histplot()` |
| KDE Plot | Smooth density curve | `sns.kdeplot()` |
| Bar Chart | Category counts | `plt.bar()` / `sns.countplot()` |
| Box Plot | Outlier detection | `plt.boxplot()` / `sns.boxplot()` |
| Scatter Plot | Two-variable relationship | `plt.scatter()` |
| Pair Plot | All feature pairs | `sns.pairplot()` |
| Heatmap | Correlation matrix | `sns.heatmap()` |
| Confusion Matrix | Classification evaluation | `sns.heatmap(confusion_matrix())` |
| ROC Curve | Binary classifier performance | `roc_curve()` + `plt.plot()` |
| Precision-Recall | Imbalanced class evaluation | `precision_recall_curve()` |
| Regression Line | Linear fit | `plt.plot()` |
| Actual vs Predicted | Regression evaluation | `plt.scatter()` |
| Residuals Plot | Regression error analysis | `plt.scatter()` |
| Loss Curve | Neural network training | `plt.plot(losses)` |
| Feature Importance | Tree model insight | `plt.bar(importances)` |
| Decision Boundary | Classifier visualization | `plt.contourf()` |
| Learning Curve | Bias-variance check | `learning_curve()` |
| Validation Curve | Hyperparameter tuning | `validation_curve()` |
| Elbow Method | K-Means optimal k | `plt.plot(inertia)` |
| PCA Scatter | Dimensionality reduction | `PCA()` + `plt.scatter()` |
| Scree Plot | PCA variance explained | `plt.bar(explained_variance)` |
| Decision Tree Diagram | Tree structure | `plot_tree()` |

---

*End of ML Matplotlib & Seaborn Visualization Guide*
---

*End of Guide — Newton Book Step-by-Step Reference*





# NumPy & Pandas — Complete ML Formula & Code Reference

> All important NumPy and Pandas operations, formulas, and code snippets for Machine Learning questions

---

## Table of Contents

### NumPy
1. [Array Creation](#1-array-creation)
2. [Array Properties & Inspection](#2-array-properties--inspection)
3. [Array Indexing & Slicing](#3-array-indexing--slicing)
4. [Array Reshaping & Manipulation](#4-array-reshaping--manipulation)
5. [Mathematical Operations](#5-mathematical-operations)
6. [Statistical Functions](#6-statistical-functions)
7. [Boolean Masking & Filtering](#7-boolean-masking--filtering)
8. [Linear Algebra](#8-linear-algebra)
9. [Random Module](#9-random-module)
10. [Broadcasting](#10-broadcasting)

### Pandas
11. [DataFrame & Series Creation](#11-dataframe--series-creation)
12. [Loading & Saving Data](#12-loading--saving-data)
13. [Inspection & Info](#13-inspection--info)
14. [Selecting & Filtering](#14-selecting--filtering)
15. [Data Cleaning](#15-data-cleaning)
16. [Handling Missing Values](#16-handling-missing-values)
17. [Handling Duplicates](#17-handling-duplicates)
18. [Outlier Detection & Handling](#18-outlier-detection--handling)
19. [Aggregation & GroupBy](#19-aggregation--groupby)
20. [Sorting & Ranking](#20-sorting--ranking)
21. [String Operations](#21-string-operations)
22. [Encoding Categorical Data](#22-encoding-categorical-data)
23. [Merging & Joining](#23-merging--joining)
24. [Feature Engineering](#24-feature-engineering)
25. [ML-Specific Pandas Patterns](#25-ml-specific-pandas-patterns)

---

## ─── NUMPY ───

---

## 1. Array Creation

```python
import numpy as np

# From list
a = np.array([1, 2, 3, 4, 5])
b = np.array([[1, 2, 3], [4, 5, 6]])        # 2D array

# Zeros, Ones, Full
np.zeros((3, 4))                             # 3x4 array of 0s
np.ones((2, 3))                              # 2x3 array of 1s
np.full((3, 3), 7)                           # 3x3 array filled with 7

# Identity matrix
np.eye(4)                                    # 4x4 identity matrix
np.identity(3)                               # same as eye

# Range-based
np.arange(0, 10, 2)                          # [0, 2, 4, 6, 8]
np.arange(5)                                 # [0, 1, 2, 3, 4]

# Evenly spaced
np.linspace(0, 1, 5)                         # [0.0, 0.25, 0.5, 0.75, 1.0]
np.linspace(0, 100, 10)                      # 10 points from 0 to 100

# Empty (uninitialized)
np.empty((2, 3))

# Diagonal matrix
np.diag([1, 2, 3])                           # 3x3 diagonal matrix

# From range with dtype
np.arange(1, 6, dtype=float)                 # [1., 2., 3., 4., 5.]
```

---

## 2. Array Properties & Inspection

```python
a = np.array([[1, 2, 3], [4, 5, 6]])

a.shape        # (2, 3)       → rows, columns
a.ndim         # 2            → number of dimensions
a.size         # 6            → total elements
a.dtype        # dtype('int64')
a.itemsize     # 8            → bytes per element
a.nbytes       # 48           → total bytes

# Type conversion
a.astype(float)
a.astype(np.float32)
a.astype(str)

# Check type
type(a)                    # <class 'numpy.ndarray'>
isinstance(a, np.ndarray)  # True
```

---

## 3. Array Indexing & Slicing

```python
a = np.array([10, 20, 30, 40, 50])

# Basic indexing
a[0]         # 10   (first)
a[-1]        # 50   (last)
a[1:4]       # [20, 30, 40]
a[:3]        # [10, 20, 30]
a[2:]        # [30, 40, 50]
a[::2]       # [10, 30, 50]  (every 2nd)
a[::-1]      # [50, 40, 30, 20, 10]  (reversed)

# 2D indexing
b = np.array([[1,2,3],[4,5,6],[7,8,9]])

b[0, 1]      # 2      (row 0, col 1)
b[1, :]      # [4,5,6] (entire row 1)
b[:, 2]      # [3,6,9] (entire col 2)
b[0:2, 1:3]  # [[2,3],[5,6]] (submatrix)

# Fancy indexing
idx = [0, 2]
a[idx]       # [10, 30]

b[[0, 2], :]          # rows 0 and 2
b[:, [0, 2]]          # cols 0 and 2
b[[0,1], [1,2]]       # b[0,1] and b[1,2] → [2, 6]
```

---

## 4. Array Reshaping & Manipulation

```python
a = np.arange(12)

# Reshape
a.reshape(3, 4)           # 3 rows, 4 cols
a.reshape(2, 2, 3)        # 3D
a.reshape(-1, 3)          # auto-calculate rows
a.reshape(4, -1)          # auto-calculate cols

# Flatten & Ravel
a.reshape(3,4).flatten()  # copy → 1D
a.reshape(3,4).ravel()    # view → 1D (faster)

# Transpose
b = np.array([[1,2,3],[4,5,6]])
b.T                        # shape (3,2)
np.transpose(b)            # same

# Concatenate
x = np.array([1, 2, 3])
y = np.array([4, 5, 6])
np.concatenate([x, y])              # [1,2,3,4,5,6]
np.concatenate([b, b], axis=0)      # stack vertically
np.concatenate([b, b], axis=1)      # stack horizontally

# Stack
np.vstack([x, y])                   # [[1,2,3],[4,5,6]]
np.hstack([x, y])                   # [1,2,3,4,5,6]
np.stack([x, y], axis=0)            # same as vstack
np.stack([x, y], axis=1)            # column-wise

# Split
np.split(np.arange(9), 3)           # 3 equal parts
np.array_split(np.arange(10), 3)    # unequal ok

# Insert / Delete
np.insert(x, 1, 99)                 # insert 99 at index 1
np.delete(x, 1)                     # delete index 1

# Expand / Squeeze dims
a = np.array([1, 2, 3])
np.expand_dims(a, axis=0)           # shape (1, 3)
np.expand_dims(a, axis=1)           # shape (3, 1)

b = np.array([[[1,2,3]]])           # shape (1,1,3)
np.squeeze(b)                       # shape (3,)
```

---

## 5. Mathematical Operations

```python
a = np.array([1, 2, 3, 4])
b = np.array([10, 20, 30, 40])

# Element-wise arithmetic
a + b          # [11, 22, 33, 44]
a - b          # [-9,-18,-27,-36]
a * b          # [10,40,90,160]
a / b          # [0.1, 0.1, 0.1, 0.1]
a ** 2         # [1, 4, 9, 16]
a % 3          # [1, 2, 0, 1]
a // 2         # [0, 1, 1, 2]

# Universal functions (ufuncs)
np.sqrt(a)           # [1.  , 1.41, 1.73, 2.  ]
np.exp(a)            # e^a
np.log(a)            # natural log
np.log2(a)
np.log10(a)
np.abs(np.array([-1, -2, 3]))    # [1, 2, 3]
np.ceil(np.array([1.2, 2.7]))    # [2., 3.]
np.floor(np.array([1.9, 2.1]))   # [1., 2.]
np.round(np.array([1.456, 2.789]), 2)  # [1.46, 2.79]

# Aggregation along axis
m = np.array([[1,2,3],[4,5,6]])
np.sum(m)              # 21
np.sum(m, axis=0)      # [5, 7, 9]   (column-wise)
np.sum(m, axis=1)      # [6, 15]     (row-wise)
np.prod(m)             # 720
np.cumsum(a)           # [1, 3, 6, 10]
np.diff(a)             # [1, 1, 1]

# Dot product & matrix multiply
np.dot(a, b)                     # scalar dot product
np.dot(m, m.T)                   # matrix multiply
m @ m.T                          # same with @ operator
```

---

## 6. Statistical Functions

```python
a = np.array([4, 7, 2, 9, 1, 5, 8, 3, 6])

np.mean(a)           # mean           → 5.0
np.median(a)         # median         → 5.0
np.std(a)            # std deviation  → 2.581
np.var(a)            # variance       → 6.666
np.min(a)            # 1
np.max(a)            # 9
np.sum(a)            # 45
np.ptp(a)            # range (max-min) → 8

# Index of min/max
np.argmin(a)         # index of min → 4
np.argmax(a)         # index of max → 3

# Percentile & Quantile
np.percentile(a, 25)          # Q1
np.percentile(a, 50)          # Q2 / median
np.percentile(a, 75)          # Q3
np.percentile(a, [25, 50, 75])  # all at once
np.quantile(a, 0.25)          # same as percentile but 0-1 scale

# Sorting
np.sort(a)                     # sorted copy
np.argsort(a)                  # sorted indices
np.argsort(a)[::-1]            # descending sort indices

# Unique values
np.unique(np.array([1,2,2,3,3,3]))          # [1, 2, 3]
np.unique(np.array([1,2,2,3]), return_counts=True)  # values + counts

# Weighted average
weights = np.array([1, 2, 3, 4])
np.average(np.array([1,2,3,4]), weights=weights)  # weighted mean

# Clip values
np.clip(a, 3, 7)              # values clipped between 3 and 7

# Normalize (0 to 1)
(a - a.min()) / (a.max() - a.min())

# Standardize (Z-score)
(a - a.mean()) / a.std()
```

---

## 7. Boolean Masking & Filtering

```python
a = np.array([5, 12, 3, 18, 7, 21, 2, 14])

# Boolean conditions
a > 10                          # [F, T, F, T, F, T, F, T]
a == 7                          # [F, F, F, F, T, F, F, F]
(a > 5) & (a < 15)              # AND
(a < 4) | (a > 18)              # OR
~(a > 10)                       # NOT

# Filter with mask
a[a > 10]                       # [12, 18, 21, 14]
a[(a > 5) & (a < 15)]           # [12, 7, 14]

# np.where — conditional replacement
np.where(a > 10, 1, 0)          # replace >10 with 1, else 0
np.where(a > 10, a, 0)          # keep value if >10, else 0
np.where(a > 10, 'high', 'low') # string labels

# Count matches
np.sum(a > 10)                  # 4
np.count_nonzero(a > 10)        # 4

# any / all
np.any(a > 20)                  # True
np.all(a > 0)                   # True

# Select using indices
idx = np.where(a > 10)          # returns tuple of indices
a[idx]                          # same as a[a > 10]
```

---

## 8. Linear Algebra

```python
A = np.array([[2, 1], [5, 3]])
B = np.array([[1, 0], [0, 1]])

# Matrix operations
np.dot(A, B)                    # matrix multiply
A @ B                           # same
np.linalg.matrix_power(A, 3)    # A^3

# Determinant
np.linalg.det(A)                # det(A)

# Inverse
np.linalg.inv(A)                # A^(-1)

# Transpose
A.T

# Eigenvalues & Eigenvectors
eigenvalues, eigenvectors = np.linalg.eig(A)

# Singular Value Decomposition (SVD)
U, S, Vt = np.linalg.svd(A)

# Solve linear system Ax = b
b = np.array([4, 7])
x = np.linalg.solve(A, b)

# Norm
np.linalg.norm(A)               # Frobenius norm
np.linalg.norm(A, ord=1)        # L1 norm
np.linalg.norm(A, ord=2)        # L2 norm

# Rank
np.linalg.matrix_rank(A)

# Cross product (vectors)
v1 = np.array([1, 2, 3])
v2 = np.array([4, 5, 6])
np.cross(v1, v2)

# Dot product (vectors)
np.dot(v1, v2)                  # scalar
```

---

## 9. Random Module

```python
np.random.seed(42)              # reproducibility — always set this in ML

# Integers
np.random.randint(0, 10)        # single int in [0,10)
np.random.randint(1, 6, size=5) # array of 5 ints
np.random.randint(0, 2, (3,3))  # 3x3 matrix of 0s and 1s

# Floats
np.random.rand(3, 4)            # uniform [0,1) shape (3,4)
np.random.random(5)             # uniform [0,1) 1D
np.random.uniform(5, 10, 100)   # uniform [5,10)

# Normal distribution
np.random.randn(3, 3)           # standard normal (mean=0, std=1)
np.random.normal(50, 10, 1000)  # mean=50, std=10, 1000 samples

# Other distributions
np.random.binomial(10, 0.5, 100)          # binomial
np.random.poisson(3, 50)                  # poisson
np.random.exponential(scale=2.0, size=50) # exponential

# Random choice
np.random.choice([1, 2, 3, 4, 5])         # single random pick
np.random.choice([1,2,3,4,5], size=3)     # 3 picks with replacement
np.random.choice([1,2,3,4,5], size=3, replace=False)  # no replacement
np.random.choice(['a','b','c'], size=10, p=[0.5,0.3,0.2])  # with prob

# Shuffle
arr = np.array([1, 2, 3, 4, 5])
np.random.shuffle(arr)          # in-place shuffle
np.random.permutation(arr)      # returns new shuffled array
```

---

## 10. Broadcasting

```python
# Broadcasting rules:
# Dimensions are compared right-to-left
# Sizes must be equal OR one of them must be 1

a = np.array([[1], [2], [3]])   # shape (3,1)
b = np.array([10, 20, 30])      # shape (3,)  → treated as (1,3)

a + b   # shape (3,3)
# [[11,21,31],
#  [12,22,32],
#  [13,23,33]]

# Common ML use cases
X = np.random.randn(100, 5)     # 100 samples, 5 features
mean = X.mean(axis=0)           # shape (5,) — feature means
std  = X.std(axis=0)            # shape (5,) — feature stds

X_normalized = (X - mean) / std # broadcasts (5,) across (100,5)

# Adding bias term
weights = np.array([0.5, 1.2, -0.3])
bias    = 2.0
output  = X[:, :3] @ weights + bias  # shape (100,)
```

---

## ─── PANDAS ───

---

## 11. DataFrame & Series Creation

```python
import pandas as pd
import numpy as np

# Series
s = pd.Series([10, 20, 30, 40])
s = pd.Series([10, 20, 30], index=['a', 'b', 'c'])
s = pd.Series({'x': 1, 'y': 2, 'z': 3})

# DataFrame from dict
df = pd.DataFrame({
    'Name':   ['Alice', 'Bob', 'Charlie'],
    'Age':    [25, 30, 35],
    'Salary': [50000, 60000, 70000]
})

# DataFrame from list of dicts
df = pd.DataFrame([
    {'Name': 'Alice', 'Age': 25},
    {'Name': 'Bob',   'Age': 30}
])

# DataFrame from NumPy array
data = np.random.randint(0, 100, (5, 3))
df = pd.DataFrame(data, columns=['A', 'B', 'C'])

# DataFrame with custom index
df = pd.DataFrame({'X': [1,2,3]}, index=['r1','r2','r3'])

# Empty DataFrame
df_empty = pd.DataFrame(columns=['A', 'B', 'C'])
```

---

## 12. Loading & Saving Data

```python
# CSV
df = pd.read_csv('file.csv')
df = pd.read_csv('file.csv', index_col=0)           # first col as index
df = pd.read_csv('file.csv', header=None)           # no header
df = pd.read_csv('file.csv', usecols=['A','B'])     # specific columns
df = pd.read_csv('file.csv', nrows=100)             # first 100 rows
df = pd.read_csv('file.csv', skiprows=2)            # skip first 2 rows
df = pd.read_csv('file.csv', na_values=['NA','?'])  # custom NA markers
df = pd.read_csv('file.csv', dtype={'col': float})  # force dtype

# Save CSV
df.to_csv('output.csv', index=False)
df.to_csv('output.csv', columns=['A','B'])

# Excel
df = pd.read_excel('file.xlsx', sheet_name='Sheet1')
df.to_excel('output.xlsx', index=False)

# JSON
df = pd.read_json('file.json')
df.to_json('output.json')

# From URL
df = pd.read_csv('https://example.com/data.csv')

# From environment variable (Newton Book pattern)
import os
url = os.getenv("dataset_url", "default_url.csv")
df  = pd.read_csv(url)
```

---

## 13. Inspection & Info

```python
df.head()              # first 5 rows
df.head(10)            # first 10 rows
df.tail()              # last 5 rows
df.tail(3)             # last 3 rows
df.sample(5)           # 5 random rows
df.sample(frac=0.1)    # 10% random sample

df.shape               # (rows, cols)
df.shape[0]            # number of rows
df.shape[1]            # number of columns

df.info()              # dtypes, non-null counts, memory
df.describe()          # stats for numerical cols
df.describe(include='all')       # include categorical too
df.describe(include='object')    # only categorical

df.dtypes              # dtype of each column
df.columns             # column names (Index object)
df.columns.tolist()    # as Python list
df.index               # row index

df.nunique()           # unique value count per column
df.nunique(axis=1)     # unique per row
df['col'].nunique()    # unique count of one column
df['col'].unique()     # unique values of one column
df['col'].value_counts()           # frequency count
df['col'].value_counts(normalize=True)  # as proportions
df['col'].value_counts(dropna=False)    # include NaN

# Memory
df.memory_usage(deep=True)
```

---

## 14. Selecting & Filtering

```python
# Select columns
df['Age']                        # Series
df[['Name', 'Age']]              # DataFrame (list of cols)

# Select rows — loc (label-based)
df.loc[0]                        # row by index label
df.loc[0:3]                      # rows 0 to 3 (inclusive)
df.loc[0, 'Age']                 # single value
df.loc[0:2, 'Name':'Age']        # row and column slices

# Select rows — iloc (integer position)
df.iloc[0]                       # first row
df.iloc[0:3]                     # rows 0,1,2
df.iloc[0, 1]                    # row 0, col 1
df.iloc[:, 0:2]                  # all rows, first 2 cols
df.iloc[-1]                      # last row
df.iloc[[0, 2, 4]]               # rows 0, 2, 4

# Boolean filtering
df[df['Age'] > 25]
df[df['Department'] == 'HR']
df[(df['Age'] > 25) & (df['Salary'] > 50000)]    # AND
df[(df['Age'] < 25) | (df['Age'] > 35)]          # OR
df[~(df['Age'] == 30)]                           # NOT

# isin — filter by list
df[df['Department'].isin(['HR', 'Engineering'])]
df[~df['Department'].isin(['Marketing'])]        # exclude

# between
df[df['Age'].between(25, 35)]                    # inclusive

# query (SQL-like)
df.query('Age > 25 and Salary > 50000')
df.query('Department == "HR"')

# where (keep matching, NaN otherwise)
df.where(df['Age'] > 25)

# Select numeric / object columns
df.select_dtypes(include='number')
df.select_dtypes(include='object')
df.select_dtypes(exclude='object')
```

---

## 15. Data Cleaning

```python
# Rename columns
df.rename(columns={'old_name': 'new_name'}, inplace=True)
df.columns = ['A', 'B', 'C']                    # rename all at once
df.columns = df.columns.str.strip()             # remove whitespace
df.columns = df.columns.str.lower()             # lowercase
df.columns = df.columns.str.replace(' ', '_')   # spaces → underscores

# Drop columns
df.drop('col1', axis=1, inplace=True)
df.drop(['col1','col2'], axis=1, inplace=True)

# Drop rows
df.drop(0, axis=0, inplace=True)                # drop row index 0
df.drop([0, 1, 2], axis=0, inplace=True)        # drop multiple rows

# Reset index
df.reset_index(drop=True, inplace=True)         # drop=True removes old index

# Change dtype
df['Age']    = df['Age'].astype(int)
df['Salary'] = df['Salary'].astype(float)
df['Date']   = pd.to_datetime(df['Date'])

# Strip whitespace from string columns
df['Name'] = df['Name'].str.strip()

# Replace values
df['col'].replace('old', 'new', inplace=True)
df.replace({'col': {'old': 'new'}})
df['col'].replace([1, 2], [10, 20])             # multiple replacements
```

---

## 16. Handling Missing Values

```python
# Detect missing values
df.isnull()                           # bool DataFrame
df.isnull().sum()                     # count per column
df.isnull().sum().sum()               # total missing
df.isnull().mean() * 100              # % missing per column
df.notnull()                          # opposite

# Drop missing
df.dropna()                           # drop rows with ANY NaN
df.dropna(how='all')                  # drop rows where ALL are NaN
df.dropna(subset=['Age', 'Salary'])   # drop where specific cols are NaN
df.dropna(axis=1)                     # drop columns with NaN
df.dropna(thresh=3)                   # keep rows with at least 3 non-NaN

# Fill missing — numerical
df['Age'].fillna(df['Age'].mean(),   inplace=True)   # fill with mean
df['Age'].fillna(df['Age'].median(), inplace=True)   # fill with median
df['Age'].fillna(0, inplace=True)                    # fill with 0
df['Age'].fillna(method='ffill', inplace=True)       # forward fill
df['Age'].fillna(method='bfill', inplace=True)       # backward fill

# Fill missing — categorical
df['Gender'].fillna(df['Gender'].mode()[0], inplace=True)  # fill with mode

# Fill all columns at once (ML pattern)
num_cols = df.select_dtypes(include=np.number).columns
cat_cols = df.select_dtypes(include='object').columns

for col in num_cols:
    df[col].fillna(df[col].median(), inplace=True)

for col in cat_cols:
    df[col].fillna(df[col].mode()[0], inplace=True)

# Verify
df.isnull().sum()                     # should all be 0
```

---

## 17. Handling Duplicates

```python
# Check duplicates
df.duplicated().sum()                  # count of duplicate rows
df.duplicated(keep='first').sum()      # count (keep first occurrence)
df[df.duplicated()]                    # view duplicate rows
df[df.duplicated(keep=False)]          # view ALL duplicates

# Drop duplicates
df.drop_duplicates(inplace=True)
df.drop_duplicates(subset=['Name', 'Age'])  # based on specific cols
df.drop_duplicates(keep='last')             # keep last occurrence
df.drop_duplicates(keep=False)              # drop ALL duplicates

# Reset index after dropping
df.reset_index(drop=True, inplace=True)
```

---

## 18. Outlier Detection & Handling

```python
# IQR Method (standard ML approach)
col = 'Age'
Q1  = df[col].quantile(0.25)
Q3  = df[col].quantile(0.75)
IQR = Q3 - Q1
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR

# View outliers
outliers = df[(df[col] < lower_bound) | (df[col] > upper_bound)]

# Cap outliers (Winsorization)
df[col] = df[col].clip(lower=lower_bound, upper=upper_bound)

# Cap with np.maximum / np.minimum
df[col] = np.maximum(df[col], lower_bound)  # floor
df[col] = np.minimum(df[col], upper_bound)  # ceiling

# Percentile-based capping (e.g., 95th)
p95 = df[col].quantile(0.95)
p05 = df[col].quantile(0.05)
df[col] = df[col].clip(lower=p05, upper=p95)

# Z-score method
z_scores = (df[col] - df[col].mean()) / df[col].std()
df_clean = df[np.abs(z_scores) < 3]    # keep within 3 std devs

# Apply IQR to multiple columns (ML loop pattern)
for col in ['Age', 'Monthly_Spend', 'Salary']:
    Q1  = df[col].quantile(0.25)
    Q3  = df[col].quantile(0.75)
    IQR = Q3 - Q1
    df[col] = df[col].clip(lower=Q1 - 1.5*IQR,
                            upper=Q3 + 1.5*IQR)
    df[col] = np.maximum(0, df[col])   # no negatives
```

---

## 19. Aggregation & GroupBy

```python
# Basic aggregations
df['Salary'].sum()
df['Salary'].mean()
df['Salary'].median()
df['Salary'].min()
df['Salary'].max()
df['Salary'].std()
df['Salary'].var()
df['Salary'].count()        # non-null count
df['Salary'].cumsum()       # cumulative sum
df['Salary'].pct_change()   # % change row-to-row

# GroupBy — single column
df.groupby('Department')['Salary'].mean()
df.groupby('Department')['Salary'].sum()
df.groupby('Department')['Salary'].count()
df.groupby('Department')['Salary'].max()
df.groupby('Department').agg({'Salary': 'mean', 'Age': 'min'})

# GroupBy — multiple operations
df.groupby('Department')['Salary'].agg(['mean', 'min', 'max', 'std'])

# GroupBy — multiple keys
df.groupby(['Department', 'Gender'])['Salary'].mean()

# apply custom function
df.groupby('Department')['Salary'].apply(lambda x: x.max() - x.min())

# Transform — returns same-shape DataFrame
df['Salary_normalized'] = df.groupby('Department')['Salary'].transform(
    lambda x: (x - x.mean()) / x.std()
)

# pivot table
pd.pivot_table(df, values='Salary',
               index='Department', columns='Gender',
               aggfunc='mean', fill_value=0)

# Cross-tabulation
pd.crosstab(df['Department'], df['Gender'])
pd.crosstab(df['Department'], df['Gender'], normalize='index')  # as %
```

---

## 20. Sorting & Ranking

```python
# Sort by column
df.sort_values('Salary')
df.sort_values('Salary', ascending=False)
df.sort_values(['Department', 'Salary'], ascending=[True, False])
df.sort_values('Salary', inplace=True)

# Sort by index
df.sort_index()
df.sort_index(ascending=False)

# Rank
df['Salary'].rank()                         # default average
df['Salary'].rank(method='min')
df['Salary'].rank(ascending=False)          # highest = rank 1
df['Salary'].rank(pct=True)                 # percentile rank (0-1)

# Top / Bottom N
df.nlargest(5, 'Salary')                    # top 5 by Salary
df.nsmallest(3, 'Age')                      # bottom 3 by Age
df['Salary'].nlargest(5)                    # top 5 values
```

---

## 21. String Operations

```python
# Access string methods via .str
df['Name'].str.upper()
df['Name'].str.lower()
df['Name'].str.title()
df['Name'].str.strip()
df['Name'].str.len()
df['Name'].str.replace('old', 'new')
df['Name'].str.contains('Al')              # bool Series
df['Name'].str.startswith('A')
df['Name'].str.endswith('e')
df['Name'].str.split(' ')                  # split into list
df['Name'].str.split(' ', expand=True)     # split into columns
df['Name'].str[0]                          # first character
df['Name'].str[:3]                         # first 3 chars
df['Name'].str.count('a')                  # count occurrences

# Useful patterns in ML
df.columns = df.columns.str.strip().str.lower().str.replace(' ', '_')
df['col'] = df['col'].str.strip()
df[df['Name'].str.contains('Engineer', na=False)]
```

---

## 22. Encoding Categorical Data

```python
from sklearn.preprocessing import LabelEncoder

# Label Encoding (ordinal / binary)
le = LabelEncoder()
df['Gender_encoded'] = le.fit_transform(df['Gender'])
# Reverse: le.inverse_transform([0, 1])

# Separate encoders per column (important in ML!)
le_gender = LabelEncoder()
le_smoker = LabelEncoder()
df['Gender'] = le_gender.fit_transform(df['Gender'])
df['Smoker'] = le_smoker.fit_transform(df['Smoker'])

# One-Hot Encoding — pd.get_dummies
df = pd.get_dummies(df, columns=['Product_Category'])
df = pd.get_dummies(df, columns=['Region', 'Education'], drop_first=False)
df = pd.get_dummies(df, columns=['Location'], prefix='', prefix_sep='')
df = pd.get_dummies(df, columns=['City'], drop_first=True)  # avoid dummy trap

# One-Hot Encoding — sklearn
from sklearn.preprocessing import OneHotEncoder
ohe = OneHotEncoder(sparse=False, drop='first')
encoded = ohe.fit_transform(df[['Category']])

# Ordinal Encoding
from sklearn.preprocessing import OrdinalEncoder
oe = OrdinalEncoder(categories=[['Low','Medium','High']])
df['Level_encoded'] = oe.fit_transform(df[['Level']])

# Map manually
df['Gender'] = df['Gender'].map({'Male': 1, 'Female': 0})
df['Size']   = df['Size'].map({'Small': 0, 'Medium': 1, 'Large': 2})
```

---

## 23. Merging & Joining

```python
df1 = pd.DataFrame({'ID': [1,2,3], 'Name': ['A','B','C']})
df2 = pd.DataFrame({'ID': [2,3,4], 'Score': [85,90,78]})

# Merge (SQL join)
pd.merge(df1, df2, on='ID')                     # inner join
pd.merge(df1, df2, on='ID', how='left')         # left join
pd.merge(df1, df2, on='ID', how='right')        # right join
pd.merge(df1, df2, on='ID', how='outer')        # full outer join
pd.merge(df1, df2, left_on='ID', right_on='id') # different col names

# Concat — stack rows
pd.concat([df1, df2])                           # stack vertically
pd.concat([df1, df2], ignore_index=True)        # reset index
pd.concat([df1, df2], axis=1)                   # stack horizontally

# Join (on index)
df1.join(df2.set_index('ID'), on='ID')

# Append (deprecated in newer pandas → use concat)
pd.concat([df1, pd.DataFrame({'ID':[4],'Name':['D']})])
```

---

## 24. Feature Engineering

```python
# New column from calculation
df['BMI'] = df['Weight'] / (df['Height'] ** 2)
df['Revenue_per_Year'] = df['Revenue'] / df['Years']
df['Age_Squared'] = df['Age'] ** 2

# Bin / Bucketize
df['Age_Group'] = pd.cut(df['Age'], bins=[0,18,35,60,100],
                          labels=['Teen','Young','Mid','Senior'])

df['Income_Band'] = pd.qcut(df['Income'], q=4,
                             labels=['Low','Medium','High','Very High'])

# Interaction feature
df['Age_Income'] = df['Age'] * df['Income']

# Date features
df['Date'] = pd.to_datetime(df['Date'])
df['Year']       = df['Date'].dt.year
df['Month']      = df['Date'].dt.month
df['Day']        = df['Date'].dt.day
df['DayOfWeek']  = df['Date'].dt.dayofweek   # 0=Monday
df['IsWeekend']  = df['DayOfWeek'].isin([5,6]).astype(int)

# Apply function to column
df['Name_len'] = df['Name'].apply(len)
df['Salary_log'] = df['Salary'].apply(np.log1p)  # log transform

# Apply to multiple columns
df[['A','B']] = df[['A','B']].apply(lambda x: (x - x.mean()) / x.std())

# Map a function
df['Grade'] = df['Score'].map(lambda x: 'Pass' if x >= 50 else 'Fail')
```

---

## 25. ML-Specific Pandas Patterns

### 25.1 Full Preprocessing Pipeline (ML Pattern)

```python
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.model_selection import train_test_split

df = pd.read_csv('data.csv')

# Step 1: Drop irrelevant columns
df.drop(['ID', 'CustomerID'], axis=1, inplace=True)

# Step 2: Remove duplicates
df.drop_duplicates(inplace=True)
df.reset_index(drop=True, inplace=True)

# Step 3: Handle missing values
num_cols = df.select_dtypes(include=np.number).columns.tolist()
cat_cols = df.select_dtypes(include='object').columns.tolist()

if 'Target' in num_cols: num_cols.remove('Target')

for col in num_cols:
    df[col].fillna(df[col].median(), inplace=True)
for col in cat_cols:
    df[col].fillna(df[col].mode()[0], inplace=True)

# Step 4: Remove outliers
for col in num_cols:
    Q1, Q3 = df[col].quantile(0.25), df[col].quantile(0.75)
    IQR = Q3 - Q1
    df[col] = df[col].clip(Q1 - 1.5*IQR, Q3 + 1.5*IQR)

# Step 5: Encode categorical
df = pd.get_dummies(df, columns=cat_cols, drop_first=True)

# Step 6: Split features and target
X = df.drop('Target', axis=1)
y = df['Target']

# Step 7: Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# Step 8: Feature scaling
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled  = scaler.transform(X_test)   # NEVER fit on test set
```

---

### 25.2 Scaling Methods Comparison

```python
from sklearn.preprocessing import (StandardScaler, MinMaxScaler,
                                    RobustScaler, Normalizer)

# StandardScaler — mean=0, std=1 (best for most ML)
sc = StandardScaler()
X_standard = sc.fit_transform(X_train)

# MinMaxScaler — scales to [0, 1] (good for neural networks)
mm = MinMaxScaler()
X_minmax = mm.fit_transform(X_train)

# RobustScaler — uses IQR (best when outliers present)
rb = RobustScaler()
X_robust = rb.fit_transform(X_train)

# Apply only to specific columns (important!)
cols_to_scale = ['Age', 'Salary', 'Monthly_Spend']
scaler = StandardScaler()
df[cols_to_scale] = scaler.fit_transform(df[cols_to_scale])
```

---

### 25.3 Train-Test Split Patterns

```python
from sklearn.model_selection import train_test_split

# Basic split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Stratified split (classification — preserves class ratio)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# Train/Validation/Test split
X_train, X_temp, y_train, y_temp = train_test_split(
    X, y, test_size=0.3, random_state=42)
X_val, X_test, y_val, y_test = train_test_split(
    X_temp, y_temp, test_size=0.5, random_state=42)
# Result: 70% train, 15% val, 15% test

# Check class distribution after split
print(y_train.value_counts())
print(y_test.value_counts())
```

---

### 25.4 Important Aggregation Formulas for ML Questions

```python
# --- Duplicate count ---
df.duplicated().sum()

# --- Null percentage ---
(df.isnull().sum().sum() / (df.shape[0] * df.shape[1])) * 100

# --- Most frequent category ---
df['col'].value_counts().idxmax()

# --- Least frequent category ---
df['col'].value_counts().idxmin()

# --- Cancellation / condition count ---
(df['status'] == 'Cancelled').sum()

# --- Revenue / column mean ---
df['revenue'].mean()

# --- Salary range ---
df['Salary'].max() - df['Salary'].min()

# --- Salary median ---
df['Salary'].median()

# --- Department-wise count as dict ---
df['Department'].value_counts().to_dict()

# --- Null per column as dict ---
df.isnull().sum().to_dict()

# --- Class balance check ---
df['target'].value_counts(normalize=True) * 100
```

---

### 25.5 Quick Cheat Sheet — NumPy vs Pandas

| Task | NumPy | Pandas |
|------|-------|--------|
| Mean | `np.mean(arr)` | `df['col'].mean()` |
| Median | `np.median(arr)` | `df['col'].median()` |
| Std Dev | `np.std(arr)` | `df['col'].std()` |
| Min / Max | `np.min(arr)` | `df['col'].min()` |
| Sum | `np.sum(arr)` | `df['col'].sum()` |
| Sort | `np.sort(arr)` | `df.sort_values('col')` |
| Unique | `np.unique(arr)` | `df['col'].unique()` |
| Count unique | — | `df['col'].nunique()` |
| Shape | `arr.shape` | `df.shape` |
| Filter | `arr[arr > 5]` | `df[df['col'] > 5]` |
| Replace | `np.where(cond, x, y)` | `df['col'].replace()` |
| Missing | — | `df.isnull().sum()` |
| Fill missing | — | `df.fillna()` |
| Correlation | `np.corrcoef(x,y)` | `df.corr()` |
| Reshape | `arr.reshape(m,n)` | `df.pivot()` |
| Concatenate | `np.concatenate()` | `pd.concat()` |
| Group stats | — | `df.groupby().agg()` |
| Clip / Cap | `np.clip(arr, lo, hi)` | `df['col'].clip(lo, hi)` |
| Normalize | `(x-x.min())/(x.max()-x.min())` | `MinMaxScaler` |
| Standardize | `(x-x.mean())/x.std()` | `StandardScaler` |

---

*End of NumPy & Pandas ML Reference Guide*