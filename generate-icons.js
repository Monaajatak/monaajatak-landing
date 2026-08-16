import fs from 'fs';
import sharp from 'sharp';
import path from 'path';

const svgPath = path.resolve('public/images/Icon_Teal_SVG.svg');
const publicDir = path.resolve('public');

async function generateIcons() {
  try {
    const svgBuffer = fs.readFileSync(svgPath);
    
    // Generate favicon.ico (We can just use a 48x48 png renamed or actually generate an ICO, but standard practice now supports 48x48 PNG for favicon.ico or 32x32)
    // To make an actual .ico file, sharp doesn't output .ico directly. We'll output a 48x48 png as favicon.png and then just use that, or rename it.
    // Actually, browsers accept PNG format even if the file is named .ico. But let's generate standard sizes.
    
    await sharp(svgBuffer)
      .resize(48, 48)
      .png()
      .toFile(path.join(publicDir, 'favicon.ico')); // It's technically a PNG but most browsers parse it just fine. Google explicitly supports PNG.
      
    await sharp(svgBuffer)
      .resize(48, 48)
      .png()
      .toFile(path.join(publicDir, 'favicon-48x48.png'));
      
    await sharp(svgBuffer)
      .resize(192, 192)
      .png()
      .toFile(path.join(publicDir, 'android-chrome-192x192.png'));
      
    await sharp(svgBuffer)
      .resize(512, 512)
      .png()
      .toFile(path.join(publicDir, 'android-chrome-512x512.png'));
      
    await sharp(svgBuffer)
      .resize(180, 180)
      .png()
      .toFile(path.join(publicDir, 'apple-touch-icon.png'));

    // Create site.webmanifest
    const manifest = {
      "name": "مُناجاتك",
      "short_name": "مُناجاتك",
      "icons": [
        {
          "src": "/android-chrome-192x192.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": "/android-chrome-512x512.png",
          "sizes": "512x512",
          "type": "image/png"
        }
      ],
      "theme_color": "#118b82",
      "background_color": "#ffffff",
      "display": "standalone"
    };

    fs.writeFileSync(path.join(publicDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2));

    console.log("Icons and manifest generated successfully.");
  } catch (error) {
    console.error("Error generating icons:", error);
  }
}

generateIcons();
