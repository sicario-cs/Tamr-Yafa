import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    // For GitHub Pages with a custom domain (CNAME), base should be '/'
    // If you deploy ONLY to https://<user>.github.io/<repo>/, set base: '/Tamr-Yafa/'
    base: '/',
    plugins: [
        react({
            babel: {
                plugins: [['babel-plugin-react-compiler', {}]],
            },
        }),
    ],
})

