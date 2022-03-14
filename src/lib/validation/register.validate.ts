import { create, test, enforce } from 'vest';

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
	// test('email', 'must be a valid email', () => {
	// 	enforce(data.email).matches()
	// });
});

export default suite;
