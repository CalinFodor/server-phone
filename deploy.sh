#!/bin/bash
git pull
npm install
pkill node
node server.js
