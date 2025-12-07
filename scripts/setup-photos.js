const fs = require('fs');
const path = require('path');

// This script helps organize your photos into the public folder
// Run: node scripts/setup-photos.js

const sourceDir = path.join(__dirname, '..');
const publicDir = path.join(__dirname, '..', 'public', 'photos');

// Create public/photos directory if it doesn't exist
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
  console.log('Created public/photos directory');
}

// Years mapping: Assuming wedding year is 2009, so:
// Year 1 = 2009, Year 2 = 2010, etc.
const yearFolders = ['2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'];

console.log('\n📸 Photo Setup Helper\n');
console.log('This script will help you organize your photos.\n');
console.log('Option 1: Copy photos (recommended for deployment)');
console.log('Option 2: Create symbolic links (saves space, good for development)\n');

yearFolders.forEach((yearFolder, index) => {
  const sourcePath = path.join(sourceDir, yearFolder);
  const targetPath = path.join(publicDir, yearFolder);
  
  if (fs.existsSync(sourcePath)) {
    const files = fs.readdirSync(sourcePath).filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'].includes(ext);
    });
    
    if (files.length > 0) {
      console.log(`Year ${index + 1} (${yearFolder}): Found ${files.length} photo(s)`);
      console.log(`  First photo: ${files[0]}`);
      console.log(`  Path: /photos/${yearFolder}/${files[0]}\n`);
    }
  }
});

console.log('\n✅ To use your photos:');
console.log('1. Copy or link your year folders to public/photos/');
console.log('2. Update src/data/memories.ts with the correct image paths');
console.log('3. Images should be referenced as: /photos/YEAR/filename.jpg\n');

