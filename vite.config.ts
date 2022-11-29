import solid from 'solid-start/vite'
import { defineConfig } from 'vite'
import unocss from 'unocss/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import netlify from 'solid-start-netlify'

export default defineConfig({
  plugins: [
    unocss(),
    solid({
      adapter: netlify({
        // edge: true,
      }),
    }),
    visualizer(),
  ],
})
