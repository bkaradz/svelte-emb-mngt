<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import Textarea from '$lib/components/Textarea.svelte';

	import { create, test, enforce } from 'vest';
	import classnames from 'vest/classnames';

	const suite = create((data = {}) => {
		// console.log('data', data);
		test('name', 'name is required', () => {
			enforce(data.name).isNotBlank();
		});
		test('name', 'name is must be at least 3 characters', () => {
			enforce(data.name).longerThan(2);
		});
		test('email', 'email is required', () => {
			enforce(data.email).isNotBlank();
		});
		test('email', 'must be a valid email', () => {
			enforce(data.email).matches(
				/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
		});
	});

	let result = suite.get();

	const formData = {};

	let messages = ['Testing'];

	let value = '';

	const handleInput = (event) => {
		({ name, value } = event.target);
		formData[name] = value;
		// console.log('formData', formData);
		// console.log('event.target', event);
		result = suite(formData);
	};

	$: cn = classnames(result, {
		warning: 'warning',
		invalid: 'error',
		valid: 'success'
	});
	$: disabled = !result.isValid();
</script>

<svelte:head>
	<title>Products</title>
</svelte:head>
<form>
	<Input
		size=""
		label="Name"
		outlined=""
		messages={result.getErrors('name')}
		name="name"
		validityClass={cn('name')}
		placeholder="Name"
		type=""
		on:input={handleInput}
	/>
	<Input
		size=""
		label="Email"
		outlined=""
		messages={result.getErrors('email')}
		name="email"
		validityClass={cn('email')}
		placeholder="Email"
		type=""
		on:input={handleInput}
	/>
	<Textarea
		size=""
		label="Address"
		messages={result.getErrors('address')}
		name="address"
		validityClass={cn('address')}
		placeholder="Address"
		type=""
		on:input={handleInput}
	/>

	<!-- <input class="btn mt-4 w-96" type="submit" value="Submit" /> -->
	<button class="btn mt-4 w-96" {disabled}>Submit</button>
</form>
