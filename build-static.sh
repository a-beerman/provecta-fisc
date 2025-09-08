#!/bin/bash

# ProvectaFisc Static Build Script
# This script creates a fully static version that can be opened directly in browser

echo "🚀 Building ProvectaFisc Static Version..."

# Build the app
ng build

# Copy the browser folder to a more accessible location
cp -r www/browser www/static

echo "✅ Static build complete!"
echo ""
echo "📁 Static files are located in: www/static/"
echo "🌐 You can now open any of these files directly in your browser:"
echo "   - www/static/index.html (redirects to reports)"
echo "   - www/static/reports/index.html"
echo "   - www/static/receipts/index.html"
echo ""
echo "📝 Note: The files are fully functional without any server!"
echo "   Just double-click any HTML file to open it in your browser."
