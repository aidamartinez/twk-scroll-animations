import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';

export default {
    input: 'src/index.js',
    output: [
        {
            file: 'dist/index.js',
            format: 'esm',
            exports: 'named',
            globals: {
                gsap: 'gsap',
                'gsap/ScrollTrigger': 'ScrollTrigger'
            }
        }
    ],
    external: ['gsap', 'gsap/ScrollTrigger'],
    plugins: [
        postcss({
            extract: true,
            minimize: true
        }),
        resolve(),
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**'
        }),
        terser()
    ]
}; 
