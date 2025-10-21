import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.0379ad9607f94793976ffd5b37cd222c',
  appName: 'bet-automata-pro',
  webDir: 'dist',
  server: {
    url: 'https://0379ad96-07f9-4793-976f-fd5b37cd222c.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    BackgroundRunner: {
      label: 'com.bot.apostas.background',
      src: 'background.js',
      event: 'botUpdate',
      repeat: true,
      interval: 60,
      autoStart: true
    }
  }
};

export default config;
