import fs from 'fs';
import sharp from 'sharp';
import path from 'path';

// يحوّل صور الشاشات والـ mockups من PNG إلى WebP بأحجام تناسب العرض الفعلي.
// الأصول PNG تبقى كما هي (تستخدمها بيانات JSON-LD وصورة المشاركة).
// شغّله بعد أي تحديث للصور: node generate-images.js

const screenshotsDir = path.resolve('public/images/screenshots');
const imagesDir = path.resolve('public/images');

// شريحة العرض أقصاها 274px؛ 400 تكفي الشاشات العادية و800 الشاشات عالية الكثافة.
const SCREENSHOT_WIDTHS = [400, 800];

async function generateImages() {
  try {
    const screenshots = fs.readdirSync(screenshotsDir).filter((f) => f.endsWith('.png'));
    for (const file of screenshots) {
      const name = path.basename(file, '.png');
      for (const width of SCREENSHOT_WIDTHS) {
        await sharp(path.join(screenshotsDir, file))
          .resize({ width })
          .webp({ quality: 80 })
          .toFile(path.join(screenshotsDir, `${name}-${width}.webp`));
      }
    }

    for (const name of ['app-mockup-light', 'app-mockup-dark']) {
      await sharp(path.join(imagesDir, `${name}.png`))
        .webp({ quality: 85 })
        .toFile(path.join(imagesDir, `${name}.webp`));
    }

    console.log('Images generated successfully.');
  } catch (error) {
    console.error('Error generating images:', error);
  }
}

generateImages();
