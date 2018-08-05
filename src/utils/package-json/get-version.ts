import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { readTslsPackageJSON } from './read-package';

const readTsnsPackageJSON$ = () =>
                            from(
                                readTslsPackageJSON()
                            );


const getVersionFromPackageJSON = () => readTsnsPackageJSON$()
    .pipe(
        map(packageJson => packageJson.version)
    );


export const tslsVersion$ = getVersionFromPackageJSON();