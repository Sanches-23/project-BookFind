import { STORAGE } from './constants.js';

export function getShoppingList() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE.SHOPPING_LIST_KEY)) || [];
  } catch {
    return [];
  }
}

function saveShoppingList(list) {
  localStorage.setItem(STORAGE.SHOPPING_LIST_KEY, JSON.stringify(list));
}

export function addToShoppingList({ _id, title, author, price, book_image }, quantity) {
  const list = getShoppingList();
  const existing = list.find(item => item._id === _id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    list.push({ _id, title, author, price, book_image, quantity });
  }
  saveShoppingList(list);
}

export function removeFromShoppingList(id) {
  saveShoppingList(getShoppingList().filter(item => item._id !== id));
}

export function clearShoppingList() {
  localStorage.removeItem(STORAGE.SHOPPING_LIST_KEY);
}