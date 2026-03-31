@echo off
echo Starting QuickTask...

start "QuickTask Backend" cmd /k "cd /d %~dp0QuickTask\backend && npm run dev"
timeout /t 3 /nobreak >nul
start "QuickTask Frontend" cmd /k "cd /d %~dp0QuickTask\frontend && npm start"

echo Both servers are starting...
