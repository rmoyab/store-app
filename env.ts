const fs = require('fs');
const targetPath = './src/environments/environment.ts';
const envConfigFile = `
export const environment = {
  production: true,
  urlFB: '${process.env['URL_FB']}',
  tokenFB: '${process.env['TOKEN_FB']}',
  appName: '${process.env['APP_NAME']}',
};
`;
fs.writeFileSync(targetPath, envConfigFile);
console.log(`Output generated at ${targetPath}`);
