#!/bin/bash

# Replace these variables with your Bitbucket repository SSH URL and directory name
REPO_SSH_URL="git@bitbucket.org:yourusername/your-repo.git"
CLONE_DIR="your-repo"
IMAGE_NAME="fdn_soft_template_image"

# Clone the repository using SSH
echo "Cloning repository using SSH..."
git clone $REPO_SSH_URL $CLONE_DIR

# Change directory to the cloned repository
cd $CLONE_DIR

# Update the code (if needed)

# Rebuild Docker image
echo "Building Docker image..."
docker build -t $IMAGE_NAME .

# Remove the existing container (if applicable)
echo "Stopping and removing existing container..."
docker stop $IMAGE_NAME
docker rm $IMAGE_NAME

# Run a new container with the updated image
echo "Running a new container with the updated image..."
docker run -d -p 3000:3000 --name $IMAGE_NAME $IMAGE_NAME

echo "Deployment completed."
