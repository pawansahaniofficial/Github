import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.resolve(__dirname, '..', '..', 'outputs');
const destDir = path.resolve(__dirname, '..', 'public', 'outputs');

const approvedFiles = [
  'summary_all.csv',
  'ai/ai_report.json',
];

try {
  fs.ensureDirSync(destDir);

  approvedFiles.forEach(file => {
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(destDir, file);

    if (!fs.existsSync(srcPath)) {
      throw new Error(`Required report missing: ${file}`);
    }

    fs.copySync(srcPath, destPath);
    console.log(`Copied ${file} to public/outputs`);
  });
} catch (error) {
  console.error('Error copying reports:', error);
  process.exit(1);
}
