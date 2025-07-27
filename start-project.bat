@echo off
echo ========================================
echo   Demarrage du projet MEAN Stack Blog
echo ========================================

REM Definir le repertoire du projet
set PROJECT_DIR=%~dp0
cd /d "%PROJECT_DIR%"

echo.
echo [1/4] Verification de MongoDB...
REM Verifier si MongoDB est deja en cours d'execution
tasklist /fi "imagename eq mongod.exe" 2>NUL | find /i /n "mongod.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo MongoDB est deja en cours d'execution.
) else (
    echo Demarrage de MongoDB...
    start "MongoDB" cmd /c "mongod --dbpath "C:\Program Files\MongoDB\Server\8.0\data"
"
    timeout /t 5 /nobreak >nul
    echo MongoDB demarre en arriere-plan.
)

echo.
echo [2/4] Installation des dependances backend (si necessaire)...
cd "%PROJECT_DIR%backend"
if not exist node_modules (
    echo Installation des packages npm pour le backend...
    call npm install
) else (
    echo Dependances backend deja installees.
)

echo.
echo [3/4] Installation des dependances frontend (si necessaire)...
cd "%PROJECT_DIR%frontend"
if not exist node_modules (
    echo Installation des packages npm pour le frontend...
    call npm install
) else (
    echo Dependances frontend deja installees.
)

echo.
echo [4/4] Demarrage des serveurs...

REM Demarrer le backend
echo Demarrage du serveur backend (Node.js)...
cd "%PROJECT_DIR%backend"
start "Backend Server" cmd /c "node server.js"

REM Attendre un peu avant de demarrer le frontend
timeout /t 3 /nobreak >nul

REM Demarrer le frontend
echo Demarrage du serveur frontend (Angular)...
cd "%PROJECT_DIR%frontend"
start "Frontend Server" cmd /c "npm start"

REM Attendre que le serveur Angular soit disponible
echo Verification de la disponibilite du serveur Angular...
:wait_angular
timeout /t 2 /nobreak >nul
curl -s http://localhost:4200 >nul 2>&1
if %errorlevel% neq 0 (
    echo Serveur Angular en cours de demarrage...
    goto wait_angular
)

REM Ouvrir le site dans le navigateur
echo Serveur Angular pret ! Ouverture du site dans le navigateur...
start http://localhost:4200

echo.
echo ========================================
echo   Projet demarre avec succes!
echo ========================================
echo.
echo Services en cours d'execution:
echo - MongoDB: Port par defaut (27017)
echo - Backend (Node.js): Port par defaut (3000 ou 5000)
echo - Frontend (Angular): http://localhost:4200
echo.
echo Appuyez sur une touche pour quitter ce script...
echo (Les serveurs continueront a fonctionner en arriere-plan)
pause >nul
