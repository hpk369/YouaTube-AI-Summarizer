import openai
import os

def generate_summary(title: str, transcript: str) -> str:
  prompt = (
    f"You are a helpful assistant. Summarize the following YouTube video. \n\n"
    f"Title: {title}\n\n"
    f"Transcript: \n{transcript}\n\n"
    f"Summary:"
  )

  open.api_key = os.getenv("OPENAI_API_KEY")

  try:
    response = openai.ChatCompletion.create(
      model = "gpt-4",
      messages = [
        {"role": "system", "content": "You are an expert YouTube summarizer."},
        {"role": "user", "content": prompt}
      ],
      max_tokens = 500,
      temperature = 0.7
    )
    return response.choices[0].message.content.strip()
  except Exception as e:
    return f"Error generating summary: {str(e)}"