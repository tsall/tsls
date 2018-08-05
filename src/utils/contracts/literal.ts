import { IContract } from 'ts-dynamic-type-checker';

export type LiteralTypes = string | boolean | number;

export type Literal<L> =
    L extends string ? L :
    L extends boolean ? L :
    L extends number ? L :
    unknown
;

export const literal = <T extends LiteralTypes>(l: T): IContract<T> => x => {
    if (x !== l) {
        throw TypeError(`${l} expected, but ${x} was found.`);
    }
    return x;
};

