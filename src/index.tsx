/* tslint:disable:no-console */
import { Splash } from './modules/core/splash';

import '@kata-kit/fonts/museo-sans-rounded.css';
import '@kata-kit/fonts/kata-icons.css';

async function init() {
  const splash = new Splash();

  try {
    const boot = await import('./boot');
    await boot.start();
    splash.fade();
  } catch (err) {
    splash.error(err);
    console.error(err.stack || err);
    return;
  }
}

init().catch(err => {
  console.error('Failed to load app', err);
});
