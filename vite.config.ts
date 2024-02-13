import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// electron.vite.config.ts
import reactRefresh from "@vitejs/plugin-react-refresh";// 支持装饰器

export default defineConfig({
  plugins: [reactRefresh()],
})
