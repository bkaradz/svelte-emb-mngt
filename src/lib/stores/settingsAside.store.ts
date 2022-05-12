import { readable } from 'svelte/store'

const settingsAsideTags = [
  {
    id: 1,
    url: '/settings',
    name: 'Dashboard',
    icon: `<svg class="h-5 w-5 text-pickled-bluewood-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" ><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" /><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
							</svg>`,
  },
  {
    id: 2,
    url: '/settings/options',
    name: 'Options',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-pickled-bluewood-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"> <path stroke-linecap="round" stroke-linejoin="round"	d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
		</svg>`,
  },
  {
    id: 3,
    url: '/settings/users',
    name: 'Users',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"> <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
		</svg>`,
  },
]

export const settingsAsideList = readable(settingsAsideTags)
