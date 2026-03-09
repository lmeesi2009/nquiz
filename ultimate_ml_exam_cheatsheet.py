
"""=====================================================================
FULL MACHINE LEARNING CODING CHEATSHEET (EXAM READY - COPY PASTE)
=====================================================================

-----------------------------------------------------
1. IMPORT LIBRARIES
-----------------------------------------------------
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


=====================================================================
2. LOAD DATASET
=====================================================================
df = pd.read_csv("data.csv")

df.head()
df.tail()

df.shape
df.columns
df.info()
df.describe()


=====================================================================
3. BASIC STATISTICS
=====================================================================
df["column"].mean()
df["column"].median()
df["column"].mode()[0]

df["column"].min()
df["column"].max()
df["column"].std()


=====================================================================
4. DATA PREPROCESSING
=====================================================================

Check missing values
--------------------
df.isnull().sum()

Handling missing values
-----------------------
df["column"] = df["column"].fillna(df["column"].mean())
df["column"] = df["column"].fillna(df["column"].median())
df["column"] = df["column"].fillna(df["column"].mode()[0])

Remove duplicates
-----------------
df = df.drop_duplicates()


=====================================================================
5. DATA ENCODING METHODS
=====================================================================

Label Encoding
--------------
le = LabelEncoder()

df["Gender"] = le.fit_transform(df["Gender"])

One Hot Encoding
----------------
df = pd.get_dummies(df, columns=["City"])


=====================================================================
6. FEATURE SCALING
=====================================================================

Standard Scaling
----------------
scaler = StandardScaler()

X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

Min Max Scaling
---------------
scaler = MinMaxScaler()

X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)


=====================================================================
7. FEATURE AND TARGET SPLIT
=====================================================================
X = df.drop("target", axis=1)
y = df["target"]


=====================================================================
8. TRAIN TEST SPLIT
=====================================================================
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)


=====================================================================
9. HANDLE CLASS IMBALANCE (SMOTE)
=====================================================================
smote = SMOTE(random_state=42)

X_train_resampled, y_train_resampled = smote.fit_resample(
    X_train,
    y_train
)


=====================================================================
10. LINEAR REGRESSION
=====================================================================
model = LinearRegression()

model.fit(X_train, y_train)

y_pred = model.predict(X_test)


=====================================================================
11. LOGISTIC REGRESSION
=====================================================================
log_model = LogisticRegression()

log_model.fit(X_train, y_train)

y_pred = log_model.predict(X_test)

Probability prediction
----------------------
prob = log_model.predict_proba(X_test)


=====================================================================
12. SIGMOID FUNCTION (LOGISTIC FUNCTION)
=====================================================================
def sigmoid(z):
    return 1 / (1 + np.exp(-z))

Example
-------
z = np.array([-2,-1,0,1,2])
print(sigmoid(z))


=====================================================================
13. DECISION TREE CLASSIFIER
=====================================================================
tree = DecisionTreeClassifier(
    criterion="gini",
    max_depth=5,
    random_state=42
)

tree.fit(X_train, y_train)

y_pred = tree.predict(X_test)


=====================================================================
14. DECISION TREE REGRESSION
=====================================================================
tree_reg = DecisionTreeRegressor(
    max_depth=5,
    random_state=42
)

tree_reg.fit(X_train, y_train)

y_pred = tree_reg.predict(X_test)


=====================================================================
15. FEATURE IMPORTANCE (DECISION TREE)
=====================================================================
importances = tree.feature_importances_

sorted_indices = np.argsort(importances)[::-1]

feature_importances = {}

for i in sorted_indices:
    feature_importances[X.columns[i]] = importances[i]

print(feature_importances)


=====================================================================
16. CONFUSION MATRIX
=====================================================================
cm = confusion_matrix(y_test, y_pred)

print(cm)


=====================================================================
17. CLASSIFICATION METRICS
=====================================================================

Accuracy
--------
accuracy = accuracy_score(y_test, y_pred)

Precision
---------
precision = precision_score(y_test, y_pred)

Recall
------
recall = recall_score(y_test, y_pred)

F1 Score
--------
f1 = f1_score(y_test, y_pred)


=====================================================================
18. CLASSIFICATION REPORT
=====================================================================
print(classification_report(y_test, y_pred))


=====================================================================
19. REGRESSION METRICS
=====================================================================

Mean Absolute Error
-------------------
mae = mean_absolute_error(y_test, y_pred)

Mean Squared Error
------------------
mse = mean_squared_error(y_test, y_pred)

Root Mean Squared Error
-----------------------
rmse = np.sqrt(mse)

R Squared
---------
r2 = r2_score(y_test, y_pred)


=====================================================================
20. CROSS VALIDATION
=====================================================================

scores = cross_val_score(
    model,
    X,
    y,
    cv=5
)

print(scores)
print(scores.mean())


K-Fold Cross Validation
-----------------------
kfold = KFold(n_splits=5, shuffle=True, random_state=42)

scores = cross_val_score(model, X, y, cv=kfold)


=====================================================================
21. VISUALIZATION
=====================================================================

Correlation Heatmap
-------------------
sns.heatmap(df.corr(), annot=True)
plt.show()

Feature Importance Plot
-----------------------
plt.bar(range(len(importances)), importances[sorted_indices])

plt.xticks(
    range(len(importances)),
    X.columns[sorted_indices],
    rotation=90
)

plt.title("Feature Importance")
plt.show()


=====================================================================
22. PREDICT NEW DATA
=====================================================================
new_data = [[value1, value2, value3]]

prediction = model.predict(new_data)

print(prediction)


=====================================================================
END OF FULL ML EXAM CHEATSHEET
====================================================================="""