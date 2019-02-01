import { rollup, RollupFileOptions, OutputOptions } from 'rollup';
import { of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

const typescript = require('rollup-plugin-typescript2');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const sourceMaps = require('rollup-plugin-sourcemaps');
const camelCase = require('lodash.camelcase');
const json = require('rollup-plugin-json');
const removeExternal = require('rollup-plugin-auto-external');

const project = process.cwd();

const pkg = require(`${project}/package.json`);

export interface IRollupOptions {
    libraryName: string;
}
async function buildRollupP (options: IRollupOptions) {
    const inputOptions = {
        input: `src/${options.libraryName}.ts`,
        // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
        // external: [],

        // watch: {
        //   include: 'src/**',
        // },
        plugins: [
            removeExternal(),
            // Allow json resolution
            json(),
            // Compile TypeScript files
            typescript({ useTsconfigDeclarationDir: false }),
            // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
            commonjs(),
            // Allow node_modules resolution, so you can use 'external' to control
            // which external modules to include in the bundle
            // https://github.com/rollup/rollup-plugin-node-resolve#usage
            resolve(),

            // Resolve source maps to the original source
            sourceMaps(),
        ],
    } as RollupFileOptions;

    const outputOptions = [
        { file: pkg.main, name: camelCase(options.libraryName), format: 'umd', sourcemap: true },
        { file: pkg.module, format: 'es', sourcemap: true }
    ] as OutputOptions[];

    // create a bundle
    const bundle = await rollup(inputOptions);

    // Write the bundles to disk
    await Promise.all(
        outputOptions.map(options => bundle.write(options))
    );
}

// TODO: simplify arg passing and move to utils
function fromAsync <T> (fn: () => Promise<T>) {
    return of(null)
        .pipe(
            switchMap(_ => from(fn()))
        );
}

export const buildRollup = (options: IRollupOptions) => fromAsync(() => buildRollupP(options));
