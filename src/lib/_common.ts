import type { InjectionKey } from 'svelte-typed-context';
import type { Writable } from 'svelte';

export interface BookContext {
	length: Writable<number>;
	index: Writable<number>;
	previous: () => void;
	next: () => void;
}

export const key: InjectionKey<BookContext> = Symbol('book-context');
