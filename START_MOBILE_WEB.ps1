$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $projectRoot

try {
  $existing = Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction Stop
  if ($existing) {
    Write-Host "Port 3000 is already in use. Skipping restart." -ForegroundColor Yellow
    exit 0
  }
} catch {
  # Ignore lookup failures and continue starting the app.
}

Write-Host "Building app..." -ForegroundColor Cyan
npm run build

Write-Host "Starting Next.js on http://0.0.0.0:3000 ..." -ForegroundColor Cyan
Start-Process -FilePath "npm.cmd" `
  -ArgumentList @("run", "start:mobile") `
  -WorkingDirectory $projectRoot `
  -WindowStyle Hidden

Write-Host "Local app started on port 3000." -ForegroundColor Green
Write-Host "Next step: connect Tailscale and run 'tailscale serve 3000'." -ForegroundColor Yellow
