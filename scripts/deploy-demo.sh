#!/bin/bash

# Deploy script for Visual JSON Flow demo
echo "🚀 Building and deploying Visual JSON Flow demo..."

# Build the project
echo "📦 Building project..."
yarn build

# Create demo directory if it doesn't exist
mkdir -p demo

# Copy built files to demo directory
echo "📁 Copying built files to demo directory..."
cp -r apps/demo/dist/* demo/

# Copy root index.html to demo directory as well
cp index.html demo/index.html

echo "✅ Demo deployment ready!"
echo "📂 Demo files are in the 'demo' directory"
echo "🌐 You can now deploy this to GitHub Pages"
