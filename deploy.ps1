# deploy.ps1 - MedDetalis Deploy Script
# Usage: .\deploy.ps1 "commit message"

param(
    [string]$Message = "update: MedDetalis"
)

$git = "C:\Program Files\Git\cmd\git.exe"
$projectDir = $PSScriptRoot

Write-Host "=== MedDetalis Deploy ===" -ForegroundColor Cyan

# Build
Write-Host "`n[1/5] Building..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed!" -ForegroundColor Red
    exit 1
}
Write-Host "Build OK" -ForegroundColor Green

# Git add + commit
Write-Host "`n[2/5] Committing: $Message" -ForegroundColor Yellow
& $git add -A
& $git commit -m $Message
Write-Host "Committed" -ForegroundColor Green

# Push to GitHub
Write-Host "`n[3/5] Pushing to GitHub..." -ForegroundColor Yellow
& $git push
Write-Host "Pushed" -ForegroundColor Green

# Deploy to Vercel
Write-Host "`n[4/5] Deploying to Vercel..." -ForegroundColor Yellow
npx vercel --prod --yes
Write-Host "Deployed" -ForegroundColor Green

Write-Host "`n=== Done! ===" -ForegroundColor Cyan
Write-Host "Site: https://meddetails.vercel.app" -ForegroundColor Green
Write-Host "Repo: https://github.com/mishrashubhanshur-droid/meddetails" -ForegroundColor Green
