import { NgZone } from '@angular/core';
import { Observable, OperatorFunction } from 'rxjs';

// RxJS operator to run the remainder of an RxJS pipe in the Angular zone.
// This can be used when the first part of the RxJS pipe is running outside the Angular zone
// (e.g. to do a resource-intensive operation) and the outcome needs to be fed into a view.
export function runInZone<T>(zone: NgZone): OperatorFunction<T, T> {
    return (source) => {
        return new Observable((observer) => {
            const onNext = (value: T) => zone.run(() => observer.next(value));
            const onError = (e: any) => zone.run(() => observer.error(e));
            const onComplete = () => zone.run(() => observer.complete());
            return source.subscribe(onNext, onError, onComplete);
        });
    };
}
