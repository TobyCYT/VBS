# Use a base image
FROM python:3.9-slim

# Set the working directory
WORKDIR /src

# Copy the necessary files to the working directory
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Update requirements.txt
RUN pip freeze > requirements.txt

# Copy the application code to the working directory
COPY . .

# Expose a port
EXPOSE 8000

# Define the command to run when the container starts
# CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
CMD ["python", "src/main.py"]