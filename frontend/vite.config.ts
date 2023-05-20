import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';

//https://vitejs.dev/config/

// export default defineConfig({
// 	plugins: [react(), mkcert()],
// 	server: { https: true },
// });

export default defineConfig({
	plugins: [react()],
	server: {
		watch: {
			usePolling: true,
		},
		host: true,
		strictPort: true,
	},
});
