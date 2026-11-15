@echo off
setlocal
set "SOURCE=%~dp0"
set "DEST=%LOCALAPPDATA%\Studiekaarten"

if not defined LOCALAPPDATA goto :missing_localappdata
if not exist "%DEST%" mkdir "%DEST%"
if errorlevel 1 goto :install_failed

copy /Y "%SOURCE%index.html" "%DEST%\index.html" >nul
if errorlevel 1 goto :install_failed
copy /Y "%SOURCE%start.bat" "%DEST%\start.bat" >nul
if errorlevel 1 goto :install_failed
copy /Y "%SOURCE%install.bat" "%DEST%\install.bat" >nul
if errorlevel 1 goto :install_failed

robocopy "%SOURCE%css" "%DEST%\css" /E /R:2 /W:1 /NFL /NDL /NJH /NJS /NC /NS >nul
if errorlevel 8 goto :install_failed
robocopy "%SOURCE%js" "%DEST%\js" /E /R:2 /W:1 /NFL /NDL /NJH /NJS /NC /NS >nul
if errorlevel 8 goto :install_failed

powershell -NoProfile -ExecutionPolicy Bypass -Command "$desktop=[Environment]::GetFolderPath('Desktop'); $shortcut=(New-Object -ComObject WScript.Shell).CreateShortcut((Join-Path $desktop 'Studiekaarten.lnk')); $shortcut.TargetPath=(Join-Path $env:LOCALAPPDATA 'Studiekaarten\start.bat'); $shortcut.WorkingDirectory=(Join-Path $env:LOCALAPPDATA 'Studiekaarten'); $shortcut.Save()"
if errorlevel 1 goto :shortcut_failed

echo Studiekaarten is geinstalleerd in:
echo %DEST%
echo De app wordt nu geopend.
start "" "%DEST%\index.html"
exit /b 0

:missing_localappdata
echo Fout: de lokale appmap van Windows kon niet worden gevonden.
pause
exit /b 1

:install_failed
echo Fout: niet alle appbestanden konden worden gekopieerd naar:
echo %DEST%
pause
exit /b 1

:shortcut_failed
echo De appbestanden zijn gekopieerd, maar de bureaubladsnelkoppeling kon niet worden gemaakt.
echo Je kunt de app openen via:
echo %DEST%\index.html
pause
exit /b 1
endlocal
