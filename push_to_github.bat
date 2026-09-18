@echo off
setlocal enableextensions enabledelayedexpansion

echo ========================================================
echo         HelioSunTech - Upload Code to GitHub
echo ========================================================
echo.

:: 1. Ensure current directory is marked safe for Git (fixes drive ownership warning)
git config --global --add safe.directory "%CD:\=/%" >nul 2>&1

:: 2. Check if Git is installed
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed or not found in system PATH!
    echo Please install Git for Windows from https://git-scm.com/
    echo.
    pause
    exit /b 1
)

:: 3. Initialize Git repository if .git directory does not exist
if not exist ".git" (
    echo [INFO] Initializing Git repository...
    git init
    git branch -M main
    git remote add origin https://github.com/advocatedevbhushan-cpu/heliosuntech.git
    echo [INFO] Repository initialized and connected to GitHub.
    echo.
) else (
    :: Verify remote origin URL
    git remote get-url origin >nul 2>nul
    if %errorlevel% neq 0 (
        git remote add origin https://github.com/advocatedevbhushan-cpu/heliosuntech.git
    )
)

:: 4. Stage all new and modified files
echo [INFO] Staging all project files...
git add .

:: 5. Check if there are changes to commit
git status --porcelain | findstr /R "." >nul
if %errorlevel% neq 0 (
    echo [INFO] No new changes or files to upload.
    echo.
    pause
    exit /b 0
)

:: 6. Prompt user for commit message
echo.
set "commit_msg="
set /p "commit_msg=Enter commit message (or press ENTER for default 'Update project code'): "
if "%commit_msg%"=="" set "commit_msg=Update project code"

echo.
echo [INFO] Committing changes...
git commit -m "%commit_msg%"

:: 7. Push changes to GitHub
echo.
echo [INFO] Uploading files to https://github.com/advocatedevbhushan-cpu/heliosuntech.git ...
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================================
    echo   SUCCESS! All files uploaded directly to GitHub:
    echo   https://github.com/advocatedevbhushan-cpu/heliosuntech.git
    echo ========================================================
) else (
    echo.
    echo [NOTICE] Push failed or remote contains changes. Syncing remote...
    git pull origin main --rebase
    git push -u origin main
    
    if %errorlevel% neq 0 (
        echo.
        echo ========================================================
        echo   [ERROR] Could not push to GitHub.
        echo   1. Check your internet connection.
        echo   2. Ensure you are authenticated with GitHub on Git for Windows.
        echo ========================================================
    ) else (
        echo.
        echo ========================================================
        echo   SUCCESS! All files uploaded directly to GitHub:
        echo   https://github.com/advocatedevbhushan-cpu/heliosuntech.git
        echo ========================================================
    )
)

echo.
pause
