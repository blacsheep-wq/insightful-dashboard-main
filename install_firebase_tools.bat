
@echo off
echo Installing Firebase Tools...
call npm install -g firebase-tools
if %errorlevel% neq 0 (
    echo Failed to install Firebase Tools. Please ensure Node.js and npm are installed.
    pause
    exit /b %errorlevel%
)
echo Firebase Tools installed successfully.
echo.
echo To start the MCP server, you can use:
echo npx firebase-tools mcp
echo.
pause
