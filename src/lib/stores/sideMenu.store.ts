import { writable, readable } from 'svelte/store';
import {
	svgContacts,
	svgShoppingBag,
	svgChart,
	svgQrCode,
	svgCog,
	svgAdjustments
} from '$lib/utility/svgLogos';

export const toggleMenu = writable<boolean>(false);

const anchorTags = [
	{
		id: 1,
		url: '/',
		name: 'Dashboard',
		icon: svgChart
	},
	{
		id: 2,
		url: '/contacts',
		name: 'Customer',
		icon: svgContacts
	},
	// {
	//  id: 3,
	// 	url: '/products',
	// 	name: 'Products',
	// 	icon: svgShoppingBag
	// },
	{
		id: 4,
		url: '/test',
		name: 'Test',
		icon: svgQrCode
	},
	{
		id: 5,
		url: '/settings',
		name: 'Settings',
		icon: svgAdjustments
	}
];

export const anchorList = readable(anchorTags);
