<script lang="ts">
	import logger from '$lib/utility/logger';
	import { svgLockClosed, svgPencil, svgXSmall } from '$lib/utility/svgLogos';
	import { onMount } from 'svelte';

	interface userInterface {
		_id: string;
		editable?: boolean;
		name: string;
		email: string;
		phone: string;
		address: string;
		isActive: boolean;
		isUser: boolean;
		userRole: string;
	}

	const tableHeadings = [
		'name',
		'email',
		'phone',
		'address',
		'isActive',
		'isUser',
		'userRole',
		'edit',
		'delete'
	];

	let contacts: Array<userInterface> = [];
	let error: any;

	const getContacts = async () => {
		try {
			const res = await fetch('/api/auth/users.json');
			contacts = await res.json();
		} catch (err) {
			logger.error(err.message);
			error = err.message;
		}
	};

	onMount(() => {
		getContacts();
		heandleEditable(-1, true);
	});

	const heandleEditable = (id: any, editable: boolean) => {
		contacts.forEach((list) => {
			if (list._id === id && editable === false) {
				list.editable = true;
			} else {
				list.editable = false;
			}
		});
		contacts = contacts;
	};
	const heandleDelete = (id: any) => {
		contacts = contacts.filter((list) => list._id !== id);
		/**
		 * TODO: Add fetch DELETE logic
		 */
	};
</script>

<div class="w-full bg-white p-2 shadow-lg">
	<div class=" block ">
		<table class="relative w-full rounded-lg text-left text-sm">
			<thead>
				<tr
					class=" sticky border border-b-0 border-pickled-bluewood-700 bg-pickled-bluewood-700 text-white"
				>
					{#each tableHeadings as header (header)}
						<th on:click={() => console.log(header)} class="px-2 py-2">{header}</th>
					{/each}
				</tr>
			</thead>
			<tbody class="overflow-y-auto">
				{#each contacts as list (list._id)}
					<tr
						class="whitespace-no-wrap w-full border border-t-0 border-pickled-bluewood-300 font-normal odd:bg-pickled-bluewood-100 odd:text-pickled-bluewood-900 even:text-pickled-bluewood-900"
					>
						<td class="px-2 py-1">
							<input
								class="m-0 w-full border-none bg-transparent p-0 text-sm focus:border-transparent focus:ring-transparent"
								type="text"
								name="name"
								disabled={!list.editable}
								bind:value={list.name}
							/>
						</td>
						<td class="px-2 py-1">
							<input
								class="m-0 w-full border-none bg-transparent p-0 text-sm focus:border-transparent focus:ring-transparent"
								type="email"
								name="email"
								disabled={!list.editable}
								bind:value={list.email}
							/>
						</td>
						<td class="px-2 py-1">
							<input
								class="m-0 w-full border-none bg-transparent p-0 text-sm focus:border-transparent focus:ring-transparent"
								type="text"
								name="phone"
								disabled={!list.editable}
								bind:value={list.phone}
							/>
						</td>
						<td class="px-2 py-1">
							<input
								class="m-0 w-full border-none bg-transparent p-0 text-sm focus:border-transparent focus:ring-transparent"
								type="text"
								name="address"
								disabled={!list.editable}
								bind:value={list.address}
							/>
						</td>
						<td class="px-2 py-1">
							<input
								bind:checked={list.isActive}
								disabled={!list.editable}
								type="checkbox"
								name="isActive"
							/>
						</td>
						<td class="px-2 py-1">
							<input
								bind:checked={list.isUser}
								disabled={!list.editable}
								type="checkbox"
								name="isUser"
							/>
						</td>
						<td class="px-2 py-1">
							<input
								class="m-0 w-full border-none bg-transparent p-0 text-sm focus:border-transparent focus:ring-transparent"
								type="text"
								name="userRole"
								disabled={!list.editable}
								bind:value={list.userRole}
							/>
						</td>
						<td class="p-1 text-center ">
							<button class=" m-0 p-0" on:click={() => heandleEditable(list._id, list.editable)}>
								<span class="fill-current text-pickled-bluewood-500">
									{@html list.editable ? svgLockClosed : svgPencil}
								</span>
							</button>
						</td>
						<td class="p-1 text-center ">
							<button class=" m-0 p-0" on:click={() => heandleDelete(list._id)}>
								<span class="fill-current text-pickled-bluewood-500">{@html svgXSmall}</span>
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<style>
</style>
