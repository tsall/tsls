import { join } from 'path';
import paths from '../paths';

export const getTslsPackageJSONPath = () => join(paths.tslsRoot, 'package.json');
export const getProjectPackageJSONPath = () => join(paths.project, 'package.json');
