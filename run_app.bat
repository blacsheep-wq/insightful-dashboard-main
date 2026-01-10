
@echo off
echo Starting Insightful Dashboard...

:: Start Backend in a new window
start "Insightful Backend" cmd /k "cd server && npm install && node index.js"

:: Start Frontend in a new window
start "Insightful Frontend" cmd /k "npm install && npm run dev"

echo Application execution initiated.
echo Backend running on http://localhost:3001
echo Frontend running on http://localhost:8080 (check terminal for exact port)
pause
