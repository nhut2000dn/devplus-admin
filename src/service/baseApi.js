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

export const getAbout = async () => {
  return await client.get("/about");
};

export const getTestimonial = async () => {
	return await client.get('/testimonial');
};
export const getSkill = async () => {
	return await client.get('/skill');
};

export const getAdmission = async () => {
  return await client.get("/admission");

};

export const getCampus = async () => {
  return await client.get("/campus");
};

export const getUsers = async () => {
	return await client.get('/user');
};

export const getUserById = async (id) => {
	return await client.get(`/user/${ id }`);
};
