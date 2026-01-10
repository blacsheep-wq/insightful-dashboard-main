
@echo off
echo Installing Map Dependencies...
call npm install react-simple-maps d3-scale tooltip
if %errorlevel% neq 0 (
    echo Failed to install dependencies. Please ensure Node.js and npm are installed.
    pause
    exit /b %errorlevel%
)
echo Map dependencies installed successfully.
pause
