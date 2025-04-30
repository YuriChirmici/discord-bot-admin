import { defineConfig } from 'vite';
import path from 'node:path';
import electron from 'vite-plugin-electron/simple';
import react from '@vitejs/plugin-react';
import tsConfigPaths from 'vite-tsconfig-paths';
import renderer from 'vite-plugin-electron-renderer';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tsConfigPaths(),
		renderer(),
		electron({
			main: {
				entry: 'electron/main.ts',
				onstart(options) {
					options.startup();
				},
				vite: {
					build: {
						target: 'ES2020',
						rollupOptions: {
							external: [
								'bufferutil',
								'utf-8-validate',
								'zlib-sync'
							]
						}
					}
				}
			},
			preload: {
				input: path.join(__dirname, 'electron/preload.ts'),
			},
			renderer: process.env.NODE_ENV === 'test'
				? undefined
				: {},
		}),
	]
});
