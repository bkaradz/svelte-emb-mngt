import { writable } from 'svelte/store';
// import { persistStore } from './persistStore';

// import { browser } from '$app/env';

export const toggleMenu = writable<boolean>(false);
// export let toggleMenu;
// if (browser) {
// 	toggleMenu = persistStore<boolean>('toggleMenu', false);
// }

const anchorTags = [
	{
		url: '/',
		name: 'Dashboard',
		icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>`
	},
	{
		url: '/customers',
		name: 'Customer',
		icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
  </svg>`
	},
	{
		url: '/products',
		name: 'Products',
		icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
  </svg>`
	}
];

export const anchorList = writable(anchorTags);

// export let toggleMenu
// let state: boolean;
// if (typeof window !== 'undefined') {
//     try {

//         if (JSON.parse(window.localStorage.getItem('toggleSideMenu')) === null) {
//             // state = JSON.parse(window.localStorage.getItem('toggleSideMenu')).state;
//             window.localStorage.setItem('toggleSideMenu', JSON.stringify({state: true}))
//         }
//     } catch (error) {
//         console.log("Gone", error);
//     }

//     toggleMenu = writable<boolean>(JSON.parse(window.localStorage.getItem('toggleSideMenu')).state);

//     toggleMenu.subscribe((value) =>
//         window.localStorage.setItem('toggleSideMenu', JSON.stringify({ state: value }))
//     );
// }
