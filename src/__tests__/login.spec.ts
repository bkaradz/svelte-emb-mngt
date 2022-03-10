/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import Index from '../routes/auth/login.svelte';
import { render, screen } from '@testing-library/svelte';

describe('Test of the login page', () => {
	it('has Login header', () => {
		render(Index);
		const header = screen.getByRole('heading', { name: 'Login' });
		expect(header).toBeInTheDocument();
	});
});
