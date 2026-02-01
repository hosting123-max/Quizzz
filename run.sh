#!/data/data/com.termux/files/usr/bin/bash

# Kill old Python / ngrok processes
pkill -f "python3 server.py"
pkill -f ngrok

# Move to project folder
cd "$(dirname "$0")"

# Start Python server in background
echo "Starting Python server..."
python3 server.py &
PYTHON_PID=$!

sleep 2

# Start ngrok in background
echo "Starting ngrok..."
ngrok http 8000 --log=stdout &
NGROK_PID=$!

# Wait a few seconds for ngrok to initialize
sleep 5

# Fetch the correct public URL from ngrok API
PUBLIC_URL=$(curl --silent http://127.0.0.1:4040/api/tunnels | grep -Eo 'https://[a-z0-9.-]+\.ngrok-free\.app')

if [ -z "$PUBLIC_URL" ]; then
    echo "❌ Could not get ngrok URL. Check ngrok logs."
    exit 1
fi

echo ""
echo "🎉 Your quiz is live at: $PUBLIC_URL"
echo ""

# Open in Android browser
if command -v am &> /dev/null
then
    echo "Opening quiz in browser..."
    am start -a android.intent.action.VIEW -d "$PUBLIC_URL"
fi

echo "Press Ctrl+C to stop the server and ngrok."
wait $PYTHON_PID
wait $NGROK_PID
