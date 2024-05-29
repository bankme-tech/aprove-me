#!/bin/bash

npx prisma generate
npx prisma migrate dev
node dist/main.js
