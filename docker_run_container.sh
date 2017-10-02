#!/bin/bash

# Platform can also be updated with run parameter:
if [[ ! -z ${1} ]]; then PLATFORM=${1}; fi

npm run server:${PLATFORM}