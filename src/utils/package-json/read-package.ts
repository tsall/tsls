import { readJSON } from '../promise-fs';
import { IPackageJson } from './package.json';
import { getTslsPackageJSONPath, getProjectPackageJSONPath } from './get-package-path';

export const readTslsPackageJSON = () => readJSON<IPackageJson>(getTslsPackageJSONPath());
export const readProjectPackageJSON = () => readJSON<IPackageJson>(getProjectPackageJSONPath());
