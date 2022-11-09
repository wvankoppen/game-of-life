import { Observable } from "rxjs";

// Observable wrapper for a ResizeObserver
export function observeElementSize(elem: Element): Observable<ResizeObserverEntry[]> {
    return new Observable<ResizeObserverEntry[]>((subscriber) => {
        const resizeObserver = new ResizeObserver((entries) => {
            subscriber.next(entries);
        });
        resizeObserver.observe(elem);
        return function unsubscribe() {
            resizeObserver.unobserve(elem);
        };
    });
}
