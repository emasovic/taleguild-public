export const getIdFromSlug = slug => {
	const splited = slug.split('-');
	const id = splited[splited.length - 1];

	return id;
};