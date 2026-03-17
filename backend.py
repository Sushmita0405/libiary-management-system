import pandas as pd

# Load Test Data
test_df = pd.read_csv("data_splits/test_interaction.csv")

test_user_ids = test_df["customer_id_encoded"].values
test_product_ids = test_df["product_id_encoded"].values
test_ratings = test_df["rating_normalized"].values
# Load Trained Model
from tensorflow.keras.models import load_model

model = load_model("product_recommendation_model.keras")

# Evaluate Model (IMPORTANT)
loss = model.evaluate(
    [test_user_ids, test_product_ids],
    test_ratings
)

print("Test MSE Loss:", loss)

 # Make Predictions
predictions = model.predict([test_user_ids, test_product_ids])

# Compare Actual vs Predicted
for i in range(5):
    print("User:", test_user_ids[i],
          "Product:", test_product_ids[i],
          "Actual:", test_ratings[i],
          "Predicted:", predictions[i][0])

# RMSE Calculation
import numpy as np

rmse = np.sqrt(loss)
print("RMSE:", rmse)
# Real Recommendation (Top Products)
import numpy as np

def recommend_products(user_id, num_products=5):
    product_ids = np.arange(0, num_products_total)

    user_array = np.full(len(product_ids), user_id)

    preds = model.predict([user_array, product_ids])

    top_products = product_ids[np.argsort(-preds.flatten())][:5]

    return top_products
  #
  #“I evaluate my recommendation model using MSE/RMSE on test data and also validate predictions by comparing actual vs predicted ratings. 
  #Additionally, I generate top-N recommendations to test real-world usability.”
