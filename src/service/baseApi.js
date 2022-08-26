import axios from 'axios';

const API_ROOT = 'https://devplus-api.herokuapp.com';

export const client = axios.create({
	baseURL: API_ROOT,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
});

export const getSidebar = async () => {
	return await client.get('/sidebar');
};

export const getConcern = async () => {
	return await client.get('/concern');
};

export const getBanner = async () => {
	return await client.get('/banner');
};

export const getTestimonial = async () => {
	return await client.get('/testimonial');
};
export const getSkill = async () => {
	return await client.get('/skill');
};
