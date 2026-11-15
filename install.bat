@echo off
setlocal
cd /d "%~dp0"
set "DEST=%LOCALAPPDATA%\Studiekaarten"
mkdir "%DEST%" 2>nul
mkdir "%DEST%\css" 2>nul
mkdir "%DEST%\js" 2>nul
copy /Y "%~dp0index.html" "%DEST%\index.html" >nul
copy /Y "%~dp0start.bat" "%DEST%\start.bat" >nul
copy /Y "%~dp0install.bat" "%DEST%\install.bat" >nul
xcopy /E /I /Y "%~dp0css" "%DEST%\css" >nul
xcopy /E /I /Y "%~dp0js" "%DEST%\js" >nul
powershell -NoProfile -ExecutionPolicy Bypass -Command "$desk=[Environment]::GetFolderPath('Desktop'); $s=(New-Object -ComObject WScript.Shell).CreateShortcut((Join-Path $desk 'Studiekaarten.lnk')); $s.TargetPath=(Join-Path $env:LOCALAPPDATA 'Studiekaarten\start.bat'); $s.WorkingDirectory=(Join-Path $env:LOCALAPPDATA 'Studiekaarten'); $s.Save()"
start "" "%DEST%\index.html"
endlocal
