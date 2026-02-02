import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    // For GitHub Pages with a custom domain (CNAME), keep base as '/'
    // If you deploy to https://<user>.github.io/<repo>/ instead, set base: '/Tamr-Yafa/'
    base: '/Tamr-Yafa/',
    plugins: [
        react({
            babel: {
                plugins: [['babel-plugin-react-compiler', {}]],
            },
        }),
    ],
})

