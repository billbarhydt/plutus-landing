import http.server, os, base64

class AuthHandler(http.server.SimpleHTTPRequestHandler):
    USERNAME = "review"
    PASSWORD = "PlutusDraft2026"
    
    def do_GET(self):
        auth = self.headers.get("Authorization")
        if auth is None or not self._check_auth(auth):
            self.send_response(401)
            self.send_header("WWW-Authenticate", 'Basic realm="Plutus Review"')
            self.end_headers()
            self.wfile.write(b"Authentication required")
            return
        super().do_GET()
    
    def _check_auth(self, auth):
        try:
            scheme, creds = auth.split(" ", 1)
            if scheme.lower() != "basic": return False
            decoded = base64.b64decode(creds).decode()
            return decoded == f"{self.USERNAME}:{self.PASSWORD}"
        except: return False

os.chdir("/Users/williambarhydt/.openclaw/workspace/plutus-landing")
server = http.server.HTTPServer(("0.0.0.0", 8889), AuthHandler)
print("Password-protected server on :8889")
server.serve_forever()
