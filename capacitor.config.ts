import type { CapacitorConfig } from '@capacitor/cli';

// This config wraps your LIVE deployed website (Vercel) inside a native
// Android app shell. We point to the live URL instead of bundling a static
// export because your site has a server API route (/api/analyze-crop) that
// needs to keep running on Vercel — the app just becomes a native window
// onto it, with your own icon, splash screen, and Play Store listing.
//
// Replace YOUR-DOMAIN below with your real deployed URL before running
// `npx cap sync`.
const config: CapacitorConfig = {
  appId: 'com.tarakisan.sevakendra',
  appName: 'Tara Kisan Seva Kendra',
  webDir: 'public', // placeholder — unused in server-url mode, but required by the CLI
  server: {
    url: 'https://YOUR-DOMAIN.vercel.app',
    cleartext: false,
  },
  android: {
    backgroundColor: '#0F3327',
  },
};

export default config;
