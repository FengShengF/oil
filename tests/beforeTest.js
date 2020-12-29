/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const { execSync } = require('child_process');
const { join } = require('path');
const detectInstaller = require('detect-installer');

const installPuppeteer = () => {
  // find can use package manger
  const packages = detectInstaller(join(__dirname, '../../'));
  // get installed package manger
  const packageName = packages.find(detectInstaller.hasPackageCommand) || 'npm';
  const command = `${packageName} ${packageName.includes('yarn') ? 'add' : 'i'} puppeteer`;
  execSync(command, {
    stdio: 'inherit',
  });
};

const initPuppeteer = async () => {
  try {
    require.resolve('puppeteer');
  } catch (error) {
    // need install puppeteer
    await installPuppeteer();
  }
};

initPuppeteer();
