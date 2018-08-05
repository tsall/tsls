import { rm } from 'shelljs';
import { of } from 'rxjs';
import { tap, switchMapTo } from 'rxjs/operators';
import { ITscOptions, buildTypeScript } from './tsc';
import { buildRollup, IRollupOptions } from './rollup';

export type IBuildOptions = ITscOptions & IRollupOptions;

export function build (options: IBuildOptions) {
    return of(null)
        .pipe(
            tap(_ => rm('-r', './dist/**/*.{js,map,ts}')),
            // Compile typescript files
            switchMapTo(buildTypeScript(options)),
            // Create a bundle with rollup
            switchMapTo(buildRollup(options))
        )
    ;
}

