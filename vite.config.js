// import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { globSync } from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export default defineConfig((opt) => {
  return {
    root: 'src',
    build: {
      outDir: '../dist',
      rollupOptions: {
        input: Object.fromEntries(
          globSync('src/**/*.ts').map(file => [
            // This removes `src/` as well as the file extension from each
            // file, so e.g. src/nested/foo.js becomes nested/foo
            path.relative(
              'src',
              file.slice(0, file.length - path.extname(file).length)
            ),
            // This expands the relative paths to absolute paths, so e.g.
            // src/nested/foo becomes /project/src/nested/foo.js
            fileURLToPath(new URL(file, import.meta.url))
          ])
        ),
        // input: {
        //   background: resolve(__dirname, 'src/background.ts'),
        //   // sendKeypressMeet: resolve(__dirname, 'src/sendKeypressMeet.ts'),
        //   // sendKeypressTeams: resolve(__dirname, 'src/sendKeypressTeams.ts')
        // },
        output: {
          entryFileNames: '[name].js',
        },
      },
    },
  };
});
