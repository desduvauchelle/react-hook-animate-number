export function applyThousandSeparator(
	value: string,
	thousandSeparator: string,
) {
	const thousandsGroupRegex = /(\d)(?=(\d{3})+(?!\d))/g;
	let index = value.search(/[1-9]/);
	index = index === -1 ? value.length : index;
	return (
		value.substring(0, index) +
		value.substring(index, value.length).replace(thousandsGroupRegex, '$1' + thousandSeparator)
	);
}