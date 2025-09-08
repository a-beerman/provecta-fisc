@echo off
title ProvectaFisc - Casa de Marcat Fiscala

echo.
echo ==============================================
echo    ProvectaFisc - Casa de Marcat Fiscala
echo ==============================================
echo.

REM Check if Python is available
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3 to run this application
    echo.
    pause
    exit /b 1
)

echo Starting web server...
echo.
echo Application will be available at: http://localhost:8080
echo.
echo Press Ctrl+C to stop the server
echo.

REM Start the Python HTTP server
python serve-static.py

pause
