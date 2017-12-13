
#!/bin/sh
echo "installing npm modules..."
npm install

echo "installing npm modules..."
cd "client"
npm install

echo "bundling files..."
npm run webpack
cd ".."

echo "opening browser windows..."
open http://localhost:3000
open http://localhost:3000

echo "starting server..."
npm start