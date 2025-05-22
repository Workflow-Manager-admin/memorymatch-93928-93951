#!/bin/bash
cd /home/kavia/workspace/code-generation/memorymatch-93928-93951/main_container_for_memorymatch
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

