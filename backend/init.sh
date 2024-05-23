#!/bin/sh

# Build the NestJS application
nest build

# Copy the Handlebars templates to the dist directory
cp -r src/mailer/templates dist/mailer
