@echo off
echo Starting Glamora Admin Dashboard...
cd /d "%~dp0"
echo Current directory: %CD%
echo Starting HTTP server on port 5500...
python -m http.server 5500
pause