export type valueModifier<T> = {
    (input: T): T;
}