
#!/bin/sh
echo "installing npm modules..."
npm install

echo "installing npm modules..."
cd "client"
npm install
cd ".."

echo "opening browser windows..."
open localhost:3000
open localhost:3000

echo "starting server..."
npm start