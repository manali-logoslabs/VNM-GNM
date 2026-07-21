#!/bin/bash
set -e

# Install system dependencies for Tesseract OCR
apt-get update
apt-get install -y tesseract-ocr libtesseract-dev

echo "✓ Tesseract OCR installed successfully"
