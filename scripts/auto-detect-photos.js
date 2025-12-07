const fs = require('fs');
const path = require('path');

// This script automatically detects photos and suggests updates for memories.ts
// Run: node scripts/auto-detect-photos.js

const photosDir = path.join(__dirname, '..', 'public', 'photos');
const memoriesFile = path.join(__dirname, '..', 'src', 'data', 'memories.ts');

console.log('\n📸 Auto-Detecting Photos from Root Directory\n');
console.log('Scanning for available photos...\n');

const yearFolders = ['2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'];

const photoMap = {};

yearFolders.forEach((yearFolder) => {
  const yearPath = path.join(photosDir, yearFolder);
  if (fs.existsSync(yearPath)) {
    const files = fs.readdirSync(yearPath).filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png'].includes(ext);
    });
    
    if (files.length > 0) {
      photoMap[yearFolder] = files;
      console.log(`✅ ${yearFolder}: ${files.length} photo(s) found`);
      console.log(`   First: ${files[0]}`);
      if (files.length > 1) {
        console.log(`   Also: ${files.slice(1, 4).join(', ')}${files.length > 4 ? '...' : ''}`);
      }
      console.log('');
    }
  }
});

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log('📝 Suggested photo paths for memories.ts:\n');

// Assuming wedding year is 2009 (Year 1)
const weddingYear = 2009;
yearFolders.forEach((yearFolder, index) => {
  const yearNumber = parseInt(yearFolder) - weddingYear + 1;
  if (photoMap[yearFolder] && photoMap[yearFolder].length > 0) {
    const firstPhoto = photoMap[yearFolder][0];
    // URL encode special characters
    const encodedPhoto = encodeURIComponent(firstPhoto).replace(/%20/g, ' ');
    console.log(`Year ${yearNumber} (${yearFolder}): /photos/${yearFolder}/${encodedPhoto}`);
  }
});

console.log('\n✅ Your photos are ready to use!');
console.log('   Photos in root directory are linked to public/photos/');
console.log('   Update src/data/memories.ts with the paths above\n');

