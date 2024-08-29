import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ionic.sentinel',
  appName: 'sentinel',
  webDir: 'dist',
  server: {
    url: "http://10.110.96.28:5173",
    cleartext: true
  }
};

export default config;