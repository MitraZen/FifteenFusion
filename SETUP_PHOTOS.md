# 📸 Setting Up Your Photos

Your photos are organized in year folders (2009-2025). Here's how to set them up for the website:

## Quick Setup (Windows)

### Option 1: Copy Photos (Recommended)

1. **Create the public folder structure:**
   ```powershell
   mkdir public\photos
   ```

2. **Copy your year folders to public/photos:**
   ```powershell
   # Copy each year folder (replace YEAR with 2009, 2010, etc.)
   xcopy /E /I YEAR public\photos\YEAR
   
   # Or copy all at once:
   xcopy /E /I 2009 public\photos\2009
   xcopy /E /I 2010 public\photos\2010
   xcopy /E /I 2011 public\photos\2011
   xcopy /E /I 2012 public\photos\2012
   xcopy /E /I 2013 public\photos\2013
   xcopy /E /I 2014 public\photos\2014
   xcopy /E /I 2015 public\photos\2015
   xcopy /E /I 2016 public\photos\2016
   # ... continue for other years
   ```

### Option 2: Create Symbolic Links (Saves Space)

```powershell
# Create symbolic links (saves disk space)
mklink /D public\photos\2009 2009
mklink /D public\photos\2010 2010
mklink /D public\photos\2011 2011
mklink /D public\photos\2012 2012
mklink /D public\photos\2013 2013
mklink /D public\photos\2014 2014
mklink /D public\photos\2015 2015
mklink /D public\photos\2016 2016
# ... continue for other years
```

## Update Photo Paths

After copying/linking your photos:

1. **Open `src/data/memories.ts`**

2. **For each year, update the `imageUrl` with your actual photo filename:**
   ```typescript
   {
     year: 1,
     title: "The Beginning",
     description: "Your description here",
     imageUrl: "/photos/2009/your-photo-name.jpg", // Update this!
   }
   ```

3. **Choose your favorite photo from each year folder**

## Year Mapping

Assuming your wedding was in 2009:
- **Year 1** = 2009 (wedding year)
- **Year 2** = 2010
- **Year 3** = 2011
- **Year 4** = 2012
- **Year 5** = 2013
- **Year 6** = 2014
- **Year 7** = 2015
- **Year 8** = 2016
- **Year 9** = 2017
- **Year 10** = 2018
- **Year 11** = 2019
- **Year 12** = 2020
- **Year 13** = 2021
- **Year 14** = 2022
- **Year 15** = 2023

If your wedding was in a different year, adjust the mapping accordingly!

## Tips

- **Choose one representative photo per year** - the most meaningful or beautiful one
- **Photo formats supported:** .jpg, .jpeg, .png (case-insensitive)
- **File names:** Keep original names or rename for clarity
- **Image size:** Large photos work great - Next.js will optimize them automatically

## After Setup

1. Run `npm run dev` to start the development server
2. Visit `http://localhost:3000` to see your album
3. If photos don't show, check:
   - File paths in `memories.ts` match actual filenames
   - Photos are in `public/photos/YEAR/` folders
   - File extensions match (case-sensitive in URLs)

