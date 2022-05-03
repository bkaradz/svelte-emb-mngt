import { writable } from 'svelte/store';
import { svgContacts, svgShoppingBag, svgChart, svgQrCode } from '../utility/svgLogos';

export const toggleMenu = writable<boolean>(false);

const anchorTags = [
	{
		url: '/',
		name: 'Dashboard',
		icon: svgChart
	},
	{
		url: '/contacts',
		name: 'Customer',
		icon: svgContacts
	},
	// {
	// 	url: '/products',
	// 	name: 'Products',
	// 	icon: svgShoppingBag
	// },
	{
		url: '/test',
		name: 'Test',
		icon: svgQrCode
	}
];

export const anchorList = writable(anchorTags);
