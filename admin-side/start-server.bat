@echo off
echo Starting Glamora Admin Dashboard Server...
echo.
echo This will start a simple HTTP server for the admin dashboard.
echo After starting, you can access it at: http://127.0.0.1:5500
echo.
echo Press Ctrl+C to stop the server.
echo.

REM Check if Node.js is available
where node >nul 2>nul
if %errorlevel% == 0 (
    echo Using Node.js http-server...
    npx http-server . -p 5500 -o
) else (
    echo Node.js not found. Please install Node.js or use the batch file method.
    echo.
    echo Alternative: Use start-admin-edge.bat to open directly in Edge
    pause
    exit
)
