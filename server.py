from http.server import SimpleHTTPRequestHandler
from socketserver import TCPServer
from pyngrok import ngrok

# ----- CONFIG -----
PORT = 8000
NGROK_AUTH_TOKEN = "2pynM7DSxuugcyWskAEN3UKEtqa_TEsqW7f4ufQfyVVgY1mU"

# Set ngrok auth token
ngrok.set_auth_token(NGROK_AUTH_TOKEN)

# Start ngrok tunnel
public_url = ngrok.connect(PORT)
print("🚀 Your quiz is live at:", public_url)

# Allow reuse of address to avoid "Address already in use" errors
class ReusableTCPServer(TCPServer):
    allow_reuse_address = True

# Start the local Python server
with ReusableTCPServer(("", PORT), SimpleHTTPRequestHandler) as httpd:
    print(f"📡 Serving at http://0.0.0.0:{PORT}")
    httpd.serve_forever()
