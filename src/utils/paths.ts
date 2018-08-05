import {resolve, join} from 'path';
const tslsRoot = resolve(__dirname, '../../');

export default {
    tslsRoot,
    defaultConfig: join(tslsRoot, 'default-config'),
    project: process.cwd()
};