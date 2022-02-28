/** Dispatch event on click outside of node */
export function clickOutside(node: HTMLElement) {
	const handleClick = (e) => {
		if ( !node.contains(e.target) ) {
			node.dispatchEvent(new CustomEvent('clickOutside'));
		}
	};

	window.addEventListener('click', handleClick, true);

	return {
		destroy() {
			window.removeEventListener('click', handleClick, true);
		}
	};
}
