#!/bin/bash

# ProvectaFisc - Static Server Launcher
# Double-click this file to start the application

echo "🚀 Starting ProvectaFisc - Casa de Marcat Fiscală"
echo "==============================================="
echo ""

# Check if Python 3 is available
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed or not in PATH"
    echo "Please install Python 3 to run this application"
    read -p "Press Enter to exit..."
    exit 1
fi

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
cd "$SCRIPT_DIR"

echo "📂 Working directory: $SCRIPT_DIR"
echo "🌐 Starting web server..."
echo ""

# Start the Python HTTP server
python3 serve-static.py
