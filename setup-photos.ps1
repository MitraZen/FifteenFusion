# Photo Setup Script for Windows
# This script copies your year folders to public/photos/

Write-Host "Setting up photos for your anniversary album..." -ForegroundColor Cyan
Write-Host ""

# Create public/photos directory
$photosDir = "public\photos"
if (-not (Test-Path $photosDir)) {
    New-Item -ItemType Directory -Path $photosDir -Force | Out-Null
    Write-Host "[OK] Created $photosDir" -ForegroundColor Green
}

# Years to copy (adjust if your wedding year is different)
$years = @("2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025")

$copiedCount = 0
$skippedCount = 0

foreach ($year in $years) {
    $sourcePath = $year
    $targetPath = "$photosDir\$year"
    
    if (Test-Path $sourcePath) {
        $imageFiles = Get-ChildItem -Path $sourcePath -File | Where-Object {
            $_.Extension -match '\.(jpg|jpeg|png|JPG|JPEG|PNG)$'
        }
        
        if ($imageFiles.Count -gt 0) {
            if (-not (Test-Path $targetPath)) {
                Copy-Item -Path $sourcePath -Destination $targetPath -Recurse -Force
                $photoCount = $imageFiles.Count
                Write-Host "[OK] Copied $year ($photoCount photos)" -ForegroundColor Green
                $copiedCount++
            } else {
                Write-Host "[SKIP] Skipped $year (already exists)" -ForegroundColor Yellow
                $skippedCount++
            }
        } else {
            Write-Host "[WARN] $year folder exists but has no images" -ForegroundColor Yellow
        }
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "[OK] Setup complete!" -ForegroundColor Green
Write-Host "   Copied: $copiedCount year(s)" -ForegroundColor White
Write-Host "   Skipped: $skippedCount year(s)" -ForegroundColor White
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "   1. Open src/data/memories.ts" -ForegroundColor White
Write-Host "   2. Update imageUrl paths with your actual photo filenames" -ForegroundColor White
Write-Host "   3. Customize titles and descriptions" -ForegroundColor White
Write-Host "   4. Run: npm run dev" -ForegroundColor White
Write-Host ""

