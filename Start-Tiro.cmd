@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Install Node.js, then run this file again.
  pause
  exit /b 1
)
if not exist "node_modules\electron\dist\electron.exe" (
  call npm ci
  if errorlevel 1 exit /b 1
)
call npm run build
if errorlevel 1 exit /b 1
call npm start

