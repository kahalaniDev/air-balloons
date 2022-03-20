export const validateName = (name: string) => {
	const value = name.trim();
	if (value.length === 0) return 'Enter name';
	if (value.length > 25) return 'Name must be maximum 25 characters';

	return '';
};

export const validateDescription = (description: string) => {
	const value = description.trim();
	if (value.length === 0) return 'Enter description';
	if (value.length > 150) return 'Description must be maximum 150 characters';
	return '';
};

export const validateType = (type: string) => {
	if (type === '') return 'Enter type';
	return '';
};

export const validateColor = (color: string) => {
	if (color === '') return 'Enter color';
	return '';
};

export const validateLatitude = (latitude: string) => {
	if (latitude.trim() === '') return '';
	const value = parseFloat(latitude);
	if (isNaN(value)) return 'Illegal latitude, enter number';
	if (value > 90 || value < -90)
		return 'Latitude must be between -90 and 90 ';
	return '';
};

export const validateLongitude = (longitude: string) => {
	if (longitude.trim() === '') return '';
	const value = parseFloat(longitude);
	if (isNaN(value)) return 'Illegal longitude, enter number';
	if (value > 180 || value < -180)
		return 'longitude must be between -180 and 180 ';
	return '';
};
