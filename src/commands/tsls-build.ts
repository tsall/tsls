#!/usr/bin/env node
import * as program from 'commander';
import { tslsVersion$ } from '../utils/package-json';
import { build } from './build';
import * as moment from 'moment';
import { map, switchMap } from 'rxjs/operators';
import { objOf, optional, bool, str, union, undef } from 'ts-dynamic-type-checker';
import { literal } from '../utils/contracts/literal';
import { validateAny } from '../utils/rx/validate';

const begin = moment();

tslsVersion$
    .pipe(
        // Configure the program options
        map(version =>
            program
                .version(version)
                .description('Builds your app using the tsc from your node modules')
                .option('-w, --watch', 'Watch for changes')
                .option('-l, --libraryName <lib>', 'What\'s the name of the lib')
                .option('--no-unused-locals')
                .parse(process.argv)
        ),
        // Validate the options
        validateAny(objOf({
            watch: union(literal(true), undef),
            unusedLocals: optional(bool),
            libraryName: str
        })),
        // Build the project
        switchMap(programConfiguration => build(programConfiguration)),

    )

    .subscribe(
        process => {}, // console.log('finish?'),
        err => {
            console.error('There was an error building the program:', err);
            process.exit(1);
        },
        () => console.log(`Compiled in ${moment().diff(begin, 'second', true)}s`)
    );

// process.stdin.resume(); // so the program will not close instantly