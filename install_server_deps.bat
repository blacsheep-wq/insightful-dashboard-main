
@echo off
echo Installing Server Dependencies...
cd server
if %errorlevel% neq 0 (
    echo "server" directory not found.
    pause
    exit /b %errorlevel%
)
call npm install
if %errorlevel% neq 0 (
    echo Failed to install dependencies. Please ensure Node.js and npm are installed.
    pause
    exit /b %errorlevel%
)
echo Server dependencies installed successfully.
pause
