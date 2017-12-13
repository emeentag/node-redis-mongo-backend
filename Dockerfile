############# PLEASE IGNORE THE FILE #############
# Coud be useful for deployment.

# Create image from:
FROM node:alpine

# Define arguments with defaults:
ARG PLATFORM="development"
ARG HOST="0.0.0.0"
ARG PORT="3030"

# Set environment variables:
ENV PLATFORM=${PLATFORM} \
    HOST=${HOST} \
    PORT=${PORT} \
    WORK_DIRECTORY=/opt/my_app/apps

# Create project folder:
RUN mkdir -p ${WORK_DIRECTORY}

# Expose port
EXPOSE 3030

# Copy project resources to the image.
# Source and test folders are needed to be mounted.
WORKDIR ${WORK_DIRECTORY}
COPY . .

# Install dependencies
#RUN ./docker_install_dependencies.sh ${HOST} ${PORT}
RUN node -v \
    && npm -v \
    && npm install

ENTRYPOINT ["npm", "run", "server:development"]