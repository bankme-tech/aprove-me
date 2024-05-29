#!/bin/sh

echo "Copying Handlebars templates to dist directory"
mkdir -p dist/mailer/templates
cp -r ./src/mailer/templates/* ./dist/mailer/templates
echo "Templates copied successfully"

# Verificação da variável de ambiente NODE_ENV
if [ -z "$NODE_ENV" ]; then
  echo "Error: NODE_ENV is not set. Please set it to 'production', 'development', or 'test'."
  exit 1
fi

case "$NODE_ENV" in
  production)
    echo "Running in production mode"
    npm run start
    ;;
  development)
    echo "Running in development mode"
    npm run start:dev
    ;;
  test)
    echo "Running in test mode"
    npm run test
    ;;
  *)
    echo "Error: Invalid NODE_ENV value. Please set it to 'production', 'development', or 'test'."
    exit 1
    ;;
esac
