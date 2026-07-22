FROM tesseractshadow/tesseract:latest

WORKDIR /app

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy app
COPY app.py .

# Expose port and run
EXPOSE 5001
CMD ["python", "app.py"]
