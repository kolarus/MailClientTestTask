import { map, Observable, shareReplay, startWith } from "rxjs";

/**
 * Creates a selector function that can extract specific properties from a state observable.
 * This utility helps eliminate boilerplate code when creating multiple selectors for the same state.
 *
 * @example
 * ```typescript
 * type MyState = { count: number; name: string };
 * const initialState: MyState = { count: 0, name: "default" };
 * const state$ = createStateObservable(initialState);
 *
 * const createSelector = createStateSelector(state$, initialState);
 * const count$ = createSelector("count");
 * const name$ = createSelector("name");
 * ```
 *
 * @param state$ The source state observable
 * @param initialState The initial state object used for startWith values
 * @returns A function that creates selectors for specific state properties
 */
export const createStateSelector = <TState>(
  state$: Observable<TState>,
  initialState: TState,
) => {
  return <K extends keyof TState>(key: K): Observable<TState[K]> =>
    state$.pipe(
      map((state) => state[key]),
      startWith(initialState[key]),
      shareReplay(1),
    );
};
