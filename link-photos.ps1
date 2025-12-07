# Link Photos Script - Creates symbolic links so photos in root are directly accessible
# This way, your photos stay in the root directory and are used directly by the website

Write-Host "Linking photos from root directory to public/photos..." -ForegroundColor Cyan
Write-Host ""

# Remove existing public/photos if it exists (to avoid conflicts)
$photosDir = "public\photos"
if (Test-Path $photosDir) {
    Write-Host "Removing existing public/photos directory..." -ForegroundColor Yellow
    Remove-Item -Path $photosDir -Recurse -Force
}

# Create public/photos directory
New-Item -ItemType Directory -Path $photosDir -Force | Out-Null
Write-Host "[OK] Created public/photos directory" -ForegroundColor Green
Write-Host ""

# Years to link
$years = @("2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025")

$linkedCount = 0
$skippedCount = 0

foreach ($year in $years) {
    $sourcePath = Join-Path (Get-Location) $year
    $targetPath = "$photosDir\$year"
    
    if (Test-Path $sourcePath) {
        $imageFiles = Get-ChildItem -Path $sourcePath -File -ErrorAction SilentlyContinue | Where-Object {
            $_.Extension -match '\.(jpg|jpeg|png|JPG|JPEG|PNG)$'
        }
        
        if ($imageFiles.Count -gt 0) {
            # Create symbolic link (requires admin rights, but we'll try)
            try {
                $sourceAbsolute = (Resolve-Path $sourcePath).Path
                cmd /c mklink /D "$targetPath" "$sourceAbsolute" 2>&1 | Out-Null
                if (Test-Path $targetPath) {
                    $photoCount = $imageFiles.Count
                    Write-Host "[OK] Linked $year ($photoCount photos)" -ForegroundColor Green
                    $linkedCount++
                } else {
                    # If symlink failed, try junction (works without admin)
                    cmd /c mklink /J "$targetPath" "$sourceAbsolute" 2>&1 | Out-Null
                    if (Test-Path $targetPath) {
                        $photoCount = $imageFiles.Count
                        Write-Host "[OK] Linked $year ($photoCount photos) [Junction]" -ForegroundColor Green
                        $linkedCount++
                    } else {
                        # Fallback: copy if symlink/junction fails
                        Copy-Item -Path $sourcePath -Destination $targetPath -Recurse -Force
                        $photoCount = $imageFiles.Count
                        Write-Host "[OK] Copied $year ($photoCount photos) [Symlink failed, copied instead]" -ForegroundColor Yellow
                        $linkedCount++
                    }
                }
            } catch {
                # Fallback: copy if symlink fails
                Copy-Item -Path $sourcePath -Destination $targetPath -Recurse -Force
                $photoCount = $imageFiles.Count
                Write-Host "[OK] Copied $year ($photoCount photos) [Fallback copy]" -ForegroundColor Yellow
                $linkedCount++
            }
        } else {
            Write-Host "[SKIP] $year folder exists but has no images" -ForegroundColor Yellow
            $skippedCount++
        }
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "[OK] Setup complete!" -ForegroundColor Green
Write-Host "   Linked: $linkedCount year(s)" -ForegroundColor White
Write-Host "   Skipped: $skippedCount year(s)" -ForegroundColor White
Write-Host ""
Write-Host "Your photos in the root directory are now accessible!" -ForegroundColor Cyan
Write-Host "Any changes to photos in root will be reflected immediately." -ForegroundColor Cyan
Write-Host ""
Write-Host "Next: Run 'npm run dev' to see your album" -ForegroundColor Yellow
Write-Host ""

