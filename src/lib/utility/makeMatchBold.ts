export const makeMatchBold = (searchMatchString: string, matchString: string) => {
	let MatchedWords: string[] = [];
	if (matchString) {
		const regex = new RegExp(matchString, 'ig');
		MatchedWords = searchMatchString.trim().match(regex);
	}

	const makeBold = `<strong>${MatchedWords[0]}</strong>`;
	const boldedStr = searchMatchString.replace(MatchedWords[0], makeBold);

	return boldedStr;
};
