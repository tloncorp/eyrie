import path from 'path';
import dts from 'vite-plugin-dts'
import { loadEnv, defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { urbitPlugin } from '@urbit/vite-plugin-urbit';

// https://vitejs.dev/config/
export default ({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd()));
  const SHIP_URL = process.env.SHIP_URL || process.env.VITE_SHIP_URL || 'http://localhost:8080';
  console.log(SHIP_URL);

  return defineConfig({
    plugins: [
      dts({
        rollupTypes: true
      }), 
      urbitPlugin({ base: 'eyrie', target: SHIP_URL, secure: false, changeOrigin: true }), 
      reactRefresh()
    ],
    optimizeDeps: {
      include: ['@urbit/http-api'],
    },
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/eyrie/index.tsx'),
        name: 'eyrie',
        fileName: (format) => `index.${format}.js`
      }
    }
  });
};
