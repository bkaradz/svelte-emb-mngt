// import type { PlaywrightTestConfig } from '@playwright/test';

// const config: PlaywrightTestConfig = {
// 	webServer: {
// 		command: 'npm run build && npm run preview',
// 		port: 5000
// 	}
// };

// export default config;
/** @type {import('@playwright/test').PlaywrightTestConfig} */

const config = { testDir: './src/__tests__' };
export default config;
