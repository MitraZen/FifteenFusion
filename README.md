# 15 Years Together - Interactive Photo Album

A beautiful, immersive web experience celebrating 15 years of love with an interactive photo album.

## Features

✨ **Cinematic Welcome Screen**
- Beautiful entrance animation
- Romantic gradient background
- Smooth transition to the album

🎨 **Interactive Year Timeline**
- Navigate through all 15 years at the bottom
- Click any year to jump directly to that memory
- Visual indicator shows which year you're viewing

📸 **Stunning Memory Cards**
- Large, elegant photo displays for each year
- Overlay with year, title, and heartfelt description
- Smooth animations when switching between memories

🎮 **Multiple Navigation Options**
- Arrow buttons on the sides
- Click year markers on timeline
- Keyboard arrows (← →)
- Swipe on mobile/tablet

💕 **Romantic Touches**
- Floating hearts animation throughout
- Beautiful color gradients
- Smooth, elegant transitions

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Customization

### Adding Your Photos

1. Upload your photos to an image hosting service:
   - [Imgur](https://imgur.com)
   - [Google Photos](https://photos.google.com)
   - [Cloudinary](https://cloudinary.com)
   - Any other image hosting service

2. Open `src/data/memories.ts`

3. Replace the placeholder `imageUrl` values with your actual photo URLs:
   ```typescript
   {
     year: 1,
     title: "Your Title",
     description: "Your description",
     imageUrl: "https://your-image-host.com/your-photo.jpg", // Replace this
   }
   ```

### Customizing Content

Edit `src/data/memories.ts` to update:
- **Titles**: Change the `title` field for each year
- **Descriptions**: Update the `description` field with your personal memories
- **Years**: Adjust the `year` number if needed

### Styling

The project uses Tailwind CSS. You can customize:
- Colors in `tailwind.config.ts`
- Global styles in `src/app/globals.css`
- Component styles using Tailwind classes

## Presentation Ideas

- **Surprise Reveal**: Set it as your homepage on your shared computer
- **Big Screen**: Display it on your TV for a cozy viewing experience
- **Share the Link**: Send it to family/friends as a digital anniversary card
- **Print QR Code**: Put it in a card that links to the website

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy with one click

### Other Options

- **Netlify**: Connect your GitHub repo
- **GitHub Pages**: Use static export (requires configuration)
- **Any Node.js hosting**: Build and deploy the production build

## Tech Stack

- **Next.js 15** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Next/Image** - Optimized images

## License

This project is created with love for your special anniversary. Feel free to customize and share!

