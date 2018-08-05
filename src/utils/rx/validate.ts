import { IContract } from 'ts-dynamic-type-checker';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const validate = <T> (contract: IContract<T>) => map(contract);

export const validateAny = <T> (contract: IContract<T>) => {
    const v = validate(contract);
    return function (obs: Observable<any>) {
        return v(obs);
    };
};