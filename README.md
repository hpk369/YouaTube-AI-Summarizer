The new flow structure for clean seperation of frontend logic and backend AI logic
Full control over prompt engineering and OpenAI token management
Easier to expand later

User opens YouTube video -> content.js extracts title + transcript ->
sends POST request to Flask backend -> Flask app calls OpenAI -> gets
summary -> Return summary JSON -> JS injects symmary into sidebar