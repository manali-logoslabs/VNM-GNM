FROM python:3.11

# Install Tesseract and required system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    tesseract-ocr \
    libtesseract-dev \
    libleptonica-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy app
COPY app.py .

# Expose port and run
EXPOSE 5001
CMD ["python", "app.py"]
