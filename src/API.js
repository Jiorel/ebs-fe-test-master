function request(endpoint = '', config = {}) {
  const API_URL = 'http://localhost:3001';
  return fetch(API_URL + endpoint, { method: 'GET', ...config });
}

export async function getProducts() {
  const products = await request('/api/products/');
  return await products.json();
}
