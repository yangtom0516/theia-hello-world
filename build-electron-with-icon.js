const { spawn } = require('child_process');
const path = require('path');

// Step 1: Build the Electron app
console.log('Building Electron app...');

const build = spawn('yarn', ['build:electron'], {
  cwd: path.resolve(__dirname),
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_OPTIONS: '--max-old-space-size=4096'
  }
});

build.on('close', (code) => {
  if (code !== 0) {
    console.error(`Build process exited with code ${code}`);
    process.exit(code);
  }
  
  // Step 2: Update the icon
  console.log('\nUpdating icon...');
  
  const updateIcon = spawn('node', ['scripts/update-icon.js'], {
    cwd: path.resolve(__dirname, 'electron-app'),
    stdio: 'inherit'
  });
  
  updateIcon.on('close', (iconCode) => {
    if (iconCode !== 0) {
      console.error(`Icon update process exited with code ${iconCode}`);
      process.exit(iconCode);
    }
    
    // Step 3: Start the app
    console.log('\nStarting Electron app...');
    
    spawn('yarn', ['start:electron'], {
      cwd: path.resolve(__dirname),
      stdio: 'inherit'
    });
  });
});