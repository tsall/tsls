#!/usr/bin/env node
import * as program from 'commander';
import { readTslsPackageJSON } from '../utils/package-json';

readTslsPackageJSON()
    .then(packageJson =>
        program
            .command('build', 'Builds the typescript project')
            .version(packageJson.version)
            .parse(process.argv)
    );