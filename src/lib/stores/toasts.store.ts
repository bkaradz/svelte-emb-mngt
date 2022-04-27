import { writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';

// export const toasts = writable([]);

export interface toastInterface {
	message: string;
	type: 'success' | 'info' | 'warning' | 'danger';
	id: string;
}

function createToast() {
	const { subscribe, set, update } = writable([]);

	return {
		subscribe,
		add: ({ message, type = 'info' }: Pick<toastInterface, 'message' | 'type'>) => {
			const id = uuidv4();
			update((allToasts: toastInterface[]) => [{ id, message, type }, ...allToasts]);
		},
		remove: (id: string) =>
			update((allToasts: toastInterface[]) =>
				allToasts.filter((toast: toastInterface) => toast.id !== id)
			),
		reset: () => set([])
	};
}

export const toasts = createToast();