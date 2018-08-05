import { exec, pipeOutput, closeWithErrorWhenStatusCode } from '../../utils/rx-exec';
import { tap, switchMap, first } from 'rxjs/operators';

// TODO: try to require ts instead of calling a command line wrapper
export interface ITscOptions {
    watch: true | undefined;
    unusedLocals?: boolean;
}

/**
 * Calls the TypeScript compiler
 * @param options options to send to the TypeScript compiler
 */
export function tsc (options: ITscOptions) {
    let optionString = '';
    if (options.watch) {
        optionString += '-w ';
    }
    if (!options.unusedLocals) {
        optionString += '-noUnusedLocals ';
    }
    const command = `./node_modules/.bin/tsc --module commonjs ${optionString}`;
    return exec(command);
}

export const buildTypeScript = (options: ITscOptions) =>
    tsc(options)
        .pipe(
            // tap(process => {
            //     Observable.merge(
            //         process.message$.map(value => ({name: 'message', value: value})),
            //    `    process.error$.map(value => ({name: 'error', value: value})),
            //         process.exit$.map(value => ({name: 'exit', value: value})),
            //         process.close$.map(value => ({name: 'close', value: value})),
            //         process.disconnect$.map(value => ({name: 'disconnect', value: value})),
            //     ).subscribe(x => console.log(x.name, x.value));
            // }),
            // Pipe child process stderr and stdout to corresponding parents
            tap(process => pipeOutput(process)),
            switchMap(process => closeWithErrorWhenStatusCode(process.close$)),
            first()
        );

