// всі axios або fetch'і
import axios from 'axios';
import { API_BASE_URL, ENDPOINTS } from './constants.js';

export async function getBooks() {
  const { data } = await axios.get(`${API_BASE_URL}${ENDPOINTS.TOP_BOOKS}`);
  return data;
}

export async function getCategories() {
  const { data } = await axios.get(`${API_BASE_URL}${ENDPOINTS.CATEGORIES}`);
  return data;
}

export async function getBooksByCategory(category) {
  const { data } = await axios.get(`${API_BASE_URL}${ENDPOINTS.CATEGORY}`, {
    params: { category },
  });
  return data;
}

export async function getBookById(id) {
  const { data } = await axios.get(`${API_BASE_URL}${ENDPOINTS.BOOKS}${id}`);
  return data;
}