import { defineConfig } from 'vitest/config'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig(() => {
  return {
    plugins: [solidPlugin()],
    test: {
      deps: {
        registerNodeLoader: true,
        inline: [/solid-js/],
      },
      environment: 'jsdom',
      globals: true,
      setupFiles: ['node_modules/@testing-library/jest-dom/extend-expect', './vitest.setup.ts'],
      transformMode: { web: [/\.[jt]sx?$/] },
    },
    resolve: {
      conditions: ['development', 'browser'],
    },
  }
})
