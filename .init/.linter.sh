#!/bin/bash
cd /home/kavia/workspace/code-generation/quran-explorer-144686-144716/frontend_web_client
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

