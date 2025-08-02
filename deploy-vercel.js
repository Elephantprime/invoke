// 7 - deploy-vercel.js (Optional Vercel CLI deploy script)

const { exec } = require('child_process');

exec('vercel --prod', (err, stdout, stderr) => {
  if (err) {
    console.error(`❌ Deployment failed: ${err.message}`);
    return;
  }
  if (stderr) {
    console.error(`⚠️  Deployment warning: ${stderr}`);
  }
  console.log(`✅ Deployment successful:\n${stdout}`);
});
