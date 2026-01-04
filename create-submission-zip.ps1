# Script to create submission zip file
# Excludes node_modules and build folders

Write-Host "Creating submission zip file..." -ForegroundColor Cyan

$projectPath = $PSScriptRoot
$zipPath = Join-Path (Split-Path $projectPath) "mini-ecommerce-submission.zip"

# Remove old zip if exists
if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
    Write-Host "Removed old zip file" -ForegroundColor Yellow
}

# Files and folders to include
$includeItems = @(
    "package.json",
    "README.md",
    ".gitignore",
    "public",
    "src"
)

# Create temporary directory
$tempDir = Join-Path $env:TEMP "mini-ecommerce-temp"
if (Test-Path $tempDir) {
    Remove-Item $tempDir -Recurse -Force
}
New-Item -ItemType Directory -Path $tempDir | Out-Null

Write-Host "Copying files..." -ForegroundColor Yellow

# Copy files
foreach ($item in $includeItems) {
    $sourcePath = Join-Path $projectPath $item
    if (Test-Path $sourcePath) {
        Copy-Item -Path $sourcePath -Destination $tempDir -Recurse -Force
        Write-Host "  ✓ $item" -ForegroundColor Green
    } else {
        Write-Host "  ✗ $item NOT FOUND" -ForegroundColor Red
    }
}

# Create zip
Write-Host "`nCreating zip file..." -ForegroundColor Yellow
Compress-Archive -Path "$tempDir\*" -DestinationPath $zipPath -Force

# Cleanup
Remove-Item $tempDir -Recurse -Force

Write-Host "`n✓ Zip file created successfully!" -ForegroundColor Green
Write-Host "Location: $zipPath" -ForegroundColor Cyan
Write-Host "`nFile size: $([math]::Round((Get-Item $zipPath).Length / 1KB, 2)) KB" -ForegroundColor Yellow

