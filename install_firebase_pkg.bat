
@echo off
echo Installing Firebase package...
call npm install firebase
if %errorlevel% neq 0 (
    echo Failed to install firebase. Please ensure Node.js and npm are installed.
    pause
    exit /b %errorlevel%
)
echo Firebase package installed successfully.
pause
