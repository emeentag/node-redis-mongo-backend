# Create image from:
FROM ubuntu:16.04

# Define arguments with defaults:
ARG HOST="0.0.0.0"
ARG PORT="3030"

# Set environment variables:
ENV HOST=${HOST} \
    PORT=${PORT} \
    WORK_DIRECTORY=/opt/jodel/apps/jodel-backend-challange

# Create project folder:
RUN mkdir -p ${WORK_DIRECTORY}

# Copy project resources to the image.
# Source and test folders are needed to be mounted.
WORKDIR ${WORK_DIRECTORY}
COPY . .

# Install dependencies
RUN ./docker_install_dependencies.sh ${HOST} ${PORT}

ENTRYPOINT ["./docker_run_container.sh"]
