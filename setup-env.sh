#!/bin/bash

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
  echo ".env.local not found. Creating from .env.example..."
  cp .env.example .env.local
  echo "Please update .env.local with your real secrets if needed."
else
  echo ".env.local already exists. No action needed."
fi