import solid from 'solid-start/vite'
import { defineConfig } from 'vite'
import windicss from 'vite-plugin-windicss'
import netlify from 'solid-start-netlify'

export default defineConfig({
  plugins: [
    windicss(),
    solid({
      adapter: netlify({
        // edge: true,
      }),
    }),
  ],
})
