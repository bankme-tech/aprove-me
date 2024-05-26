#!/bin/sh

echo "Copying Handlebars templates to dist directory"
mkdir -p dist/mailer/templates
cp -r ./src/mailer/templates/* ./dist/mailer/templates
echo "Templates copied successfully"

npm run start:dev
