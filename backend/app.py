from flask import Flask, request, jsonify
from flask_cors import CORS
from summarizer import generate_summary
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app) # Allow cross-origin requests

@app.route("/summarize", methods=["POST"])
def summarize():
  data = request.get_json()
  title = data.get("title", "")
  transcript = data.get("transcript", "")

  if not title or not transcript:
    return jsonify({"error": "Missing title or transcript"}), 400
  
  summary = generate_summary(title, transcript)
  return jsonify({"summary": summary})

if __name__ == "__main__":
  app.run(debug=True)