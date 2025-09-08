#!/usr/bin/env python3
"""
Simple HTTP server to serve the static files from www/browser directory.
Run with: python3 serve-static.py
Then open: http://localhost:8080
"""

import http.server
import socketserver
import os
import sys

# Change to the www/browser directory
os.chdir(os.path.join(os.path.dirname(__file__), 'www', 'browser'))

PORT = 8080

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cross-Origin-Embedder-Policy', 'require-corp')
        self.send_header('Cross-Origin-Opener-Policy', 'same-origin')
        super().end_headers()

if __name__ == "__main__":
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"Serving ProvectaFisc at http://localhost:{PORT}")
        print(f"Current directory: {os.getcwd()}")
        print("Press Ctrl+C to stop the server")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
