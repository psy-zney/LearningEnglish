@echo off
echo Building frontend for GitHub Pages...

REM Temporarily rename API directory so Next.js doesn't try to build backend routes statically
if exist src\app\api (
    rename src\app\api _api
)

REM Clear Next.js cache to avoid type errors with missing api folder
if exist .next (
    rmdir /s /q .next
)

REM Build static export
set BUILD_TARGET=export
call npm run build

REM Add .nojekyll to prevent GitHub Pages from ignoring _next folder
echo. > out\.nojekyll

REM Restore API directory
if exist src\app\_api (
    rename src\app\_api api
)

echo Build complete! The "out" folder contains the files to deploy to GitHub Pages.
pause
