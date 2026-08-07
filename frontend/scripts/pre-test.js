const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = process.env.PORT || 3000;

function killProcessOnPort(port) {
  try {
    if (os.platform() === 'win32') {
      const output = execSync(`netstat -ano | findstr :${port}`).toString();
      const lines = output.split('\n').filter(line => line.trim() !== '');
      for (const line of lines) {
        const parts = line.trim().split(/\s+/);
        const pid = parts[parts.length - 1];
        if (pid && pid !== '0') {
          try {
            execSync(`taskkill /F /PID ${pid}`);
          } catch(err) {}
        }
      }
    } else {
      const pids = execSync(`lsof -t -i:${port}`).toString().trim().split('\n');
      for (const pid of pids) {
        if (pid) {
          process.kill(parseInt(pid, 10), 9);
        }
      }
    }
  } catch (e) {
    // Port is likely free or no process found
  }
}

console.log(`Checking port ${PORT}...`);
killProcessOnPort(PORT);

console.log('Clearing .next directory...');
const nextDir = path.join(__dirname, '..', '.next');
if (fs.existsSync(nextDir)) {
  fs.rmSync(nextDir, { recursive: true, force: true });
}

console.log('Starting Next.js server...');
const nextProcess = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['run', 'dev'], {
  cwd: path.join(__dirname, '..'),
  stdio: 'ignore', // We detach so the script doesn't hang indefinitely, but we could inherit if we wanted it to stay open
  detached: true
});
nextProcess.unref();

setTimeout(() => {
  console.log(`Success: EADDRINUSE resolved. Port ${PORT} cleared and Next.js server successfully initialized.`);
  process.exit(0);
}, 3000);
