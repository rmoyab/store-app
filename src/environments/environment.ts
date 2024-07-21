export const environment = {
  production: true,
  urlFB:
    process.env['URL_FB'] || 'https://firebasestorage.googleapis.com/v0/b/',
  tokenFB: process.env['TOKEN_FB'] || '',
  appName: process.env['APP_NAME'] || '',
};
