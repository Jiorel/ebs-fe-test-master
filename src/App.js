import React, { useState, useEffect } from 'react';
import { getProducts } from './API';

function App() {
  const [cartProducts, setCartProducts] = useState([]);
  const [products, setProducts] = useState([]);

  function addProductToCart(product) {
    const cartProductsCopy = [...cartProducts];
    const productIndex = cartProductsCopy.findIndex((_p) => _p.id === product.id);

    if (productIndex !== -1) {
      cartProductsCopy[productIndex].quantity++;
      setCartProducts(cartProductsCopy);
      return;
    }

    setCartProducts([...cartProductsCopy, { ...product, quantity: 1 }]);
  }

  function removeProductFromCart(productID) {
    const cartProductsCopy = [...cartProducts];
    const productIndex = cartProductsCopy.findIndex((_p) => _p.id === productID);
    if (productIndex === -1) return;

    cartProductsCopy[productIndex].quantity--;
    if (cartProductsCopy[productIndex].quantity !== 0) {
      setCartProducts(cartProductsCopy);
      return;
    }

    cartProductsCopy.splice(productIndex, 1);
    setCartProducts(cartProductsCopy);
  }

  useEffect(() => {
    getProducts().then((products) => {
      setProducts(products);
    });
  }, []);

  return (
    <div>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            return (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.category.name}</td>
                <td>{product.price}</td>
                <td>
                  <button onClick={() => addProductToCart(product)}>Add to cart</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h1>CART</h1>
      <p>
        {cartProducts.reduce((total, product) => {
          return total + product.price * product.quantity;
        }, 0)}
      </p>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartProducts.map((product, index) => {
            return (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.category.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>
                  <button onClick={() => removeProductFromCart(product.id)}>Remove from cart</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
