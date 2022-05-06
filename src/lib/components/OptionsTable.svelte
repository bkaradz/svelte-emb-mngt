<script lang="ts">
	import { goto } from '$app/navigation';

	import { svgView } from '$lib/utility/svgLogos';

	export let tableHeadings = ['Group', 'name', 'value', 'Active', 'Default', 'Edit'];
	export let optionsList = [
		{
			userID: '6273d47f151da98833523d0a',
			group: 'embroideryPosition',
			isActive: true,
			isDefault: true,
			name: 'frontLeft',
			value: 'Front Left',
			_id: '6274ef3ccb27bd312215e3c8',
			createdAt: '2022-05-06T09:49:48.544Z',
			updatedAt: '2022-05-06T09:49:48.544Z',
			__v: 0
		},
		{
			userID: '6273d47f151da98833523d0b',
			group: 'embroideryPosition',
			isActive: true,
			isDefault: true,
			name: 'frontLeft',
			value: 'Front Left',
			_id: '6274ef3ccb27bd312215e3c8',
			createdAt: '2022-05-06T09:49:48.544Z',
			updatedAt: '2022-05-06T09:49:48.544Z',
			__v: 0
		}
	];
</script>

<!-- Table start -->
<div class="w-full bg-white p-2 shadow-lg">
	<div class=" block ">
		<table class="relative w-full rounded-lg text-left text-sm">
			<thead>
				<tr
					class=" sticky border border-b-0 border-pickled-bluewood-700 bg-pickled-bluewood-700 text-white"
				>
					{#each tableHeadings as header (header.id)}
						<th on:click={(e) => console.log(header)} class="px-2 py-2">{header}</th>
					{/each}
				</tr>
			</thead>
			<tbody class="overflow-y-auto">
				{#each optionsList as list (list._id)}
					<tr
						class="whitespace-no-wrap w-full border border-t-0 border-pickled-bluewood-300 font-normal odd:bg-pickled-bluewood-100 odd:text-pickled-bluewood-900 even:text-pickled-bluewood-900"
					>
						<td class="px-2 py-1">{list.group}</td>
						<td class="px-2 py-1">{list.name}</td>
						<td class="px-2 py-1">{list.value}</td>
						<td class="px-2 py-1">{list.isActive}</td>
						<td class="px-2 py-1">{list.isDefault}</td>
						<td class="p-1 text-center ">
							<button class=" m-0 p-0" on:click={async (e) => await goto(`/contacts/${list._id}`)}
								><span class="fill-current text-pickled-bluewood-500">{@html svgView}</span></button
							>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<!-- Table End -->
<style>
</style>
