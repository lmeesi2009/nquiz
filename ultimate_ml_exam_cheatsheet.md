# Ultimate Machine Learning Coding Cheat Sheet

This comprehensive guide provides ready-to-use Python snippets for every stage of the Machine Learning pipeline, from data preprocessing to model evaluation.

---

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

---

*End of Guide — Newton Book Step-by-Step Reference*