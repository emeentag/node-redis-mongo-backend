#!/bin/bash

echo Build is running with parameters:
echo "*********************************"
echo "Platform: ${1}"
echo "Host: ${2}"
echo "Port: ${3}"
echo "*********************************"

# Check node and npm:
node -v
npm -v

# Install node modules:
npm install