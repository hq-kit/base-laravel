import inertia from '@inertiajs/vite'
import { wayfinder } from '@laravel/vite-plugin-wayfinder'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import laravel from 'laravel-vite-plugin'
import { bunny } from 'laravel-vite-plugin/fonts'
import { defineConfig, lazyPlugins } from 'vite-plus'

export default defineConfig({
    plugins: lazyPlugins(() => [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            refresh: true,
            fonts: [
                bunny('Instrument Sans', {
                    weights: [400, 500, 600],
                    optimizedFallbacks: false,
                }),
            ],
        }),
        inertia(),
        react(),
        babel({
            presets: [reactCompilerPreset()],
        }),
        tailwindcss(),
        wayfinder(),
    ]),
    server: {
        watch: {
            ignored: ['**/.agents/**', '**/.claude/**', '**/.cursor/**', '**/.junie/**', '**/vendor/**'],
        },
    },

    lint: {
        ignorePatterns: [
            'vendor/**',
            'node_modules/**',
            'public/**',
            'bootstrap/ssr/**',
            'resources/js/components/ui/*',
            'resources/js/wayfinder/**',
        ],
        plugins: ['react', 'jsx-a11y', 'import', 'typescript'],
        jsPlugins: [{ name: 'tailwind-canonical-classes', specifier: 'eslint-plugin-tailwind-canonical-classes' }],
        categories: {
            correctness: 'warn',
        },
        options: {
            denyWarnings: true,
            typeAware: true,
        },
        rules: {
            'tailwind-canonical-classes/tailwind-canonical-classes': ['warn', { cssPath: 'resources/css/app.css' }],
            'jsx-a11y/no-autofocus': 'off',
            'typescript/restrict-template-expressions': 'off',
            'react/forbid-component-props': 'off',
            'react/forbid-dom-props': 'off',
            'react/no-object-type-as-default-prop': 'off',
            'no-unused-expressions': 'error',
            'eslint/no-unused-vars': [
                'warn',
                {
                    fix: {
                        variables: 'off',
                        imports: 'safe-fix',
                    },
                },
            ],
        },
    },
    fmt: {
        printWidth: 120,
        tabWidth: 4,
        singleQuote: true,
        semi: false,
        singleAttributePerLine: false,
        htmlWhitespaceSensitivity: 'css',
        ignorePatterns: ['.github/**', 'composer.json', 'resources/js/components/ui/*', 'resources/views/mail/*'],
        sortImports: {
            groups: [
                'type-import',
                ['value-builtin', 'value-external'],
                'type-internal',
                'value-internal',
                ['type-parent', 'type-sibling', 'type-index'],
                ['value-parent', 'value-sibling', 'value-index'],
                'unknown',
            ],
        },
        sortTailwindcss: {
            functions: ['clsx', 'cn', 'cva'],
            stylesheet: 'resources/css/app.css',
        },
    },
})
