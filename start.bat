@echo off
REM Synova AI - Windows Startup Script
REM This script starts your entire AI platform on Windows

echo 🚀 Starting Synova AI Platform...
echo =================================

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    python3 --version >nul 2>&1
    if %errorlevel% neq 0 (
        echo ❌ Python not found! Please install Python first.
        pause
        exit /b 1
    ) else (
        set PYTHON_CMD=python3
    )
) else (
    set PYTHON_CMD=python
)

echo ✅ Python found: %PYTHON_CMD%

REM Check if requirements are installed
echo 🔍 Checking dependencies...
%PYTHON_CMD% -c "import fastapi, uvicorn" >nul 2>&1
if %errorlevel% neq 0 (
    echo 📦 Installing dependencies...
    %PYTHON_CMD% -m pip install -r requirements.txt
    if %errorlevel% neq 0 (
        echo ❌ Failed to install dependencies!
        pause
        exit /b 1
    )
)

echo ✅ Dependencies ready

REM Start the backend API server
echo 🖥️ Starting AI Backend Server...
echo 📍 Backend will run at: http://localhost:8000
echo 📚 API docs available at: http://localhost:8000/docs
echo.
echo 🌐 Open your web browser and go to:
echo    • Free Tier:  file:///%CD%/terrestrial.html
echo    • Pro Tier:   file:///%CD%/aerial.html
echo    • Max Tier:   file:///%CD%/celestial.html
echo.
echo ⚡ Press Ctrl+C to stop the server
echo =================================
echo.

REM Start the API server
%PYTHON_CMD% main.py

pause