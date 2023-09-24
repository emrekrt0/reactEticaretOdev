import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { createRoot } from 'react-dom/client'; 
import { products } from './data';
import './App.css';
import { Switch } from 'antd';
import { useStickyState } from "./components/helper";
import { CategoryButtons } from './components/navbar';

const onChange = (checked) => {
  console.log(`switch to ${checked}`);
};

function App() {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [cartNumber, setCartNumber] = useState(0);
  const [adminMode, setAdminMode] = useState(false)
   const [newProducts, setNewProducts] = useStickyState([]);


   function handleSubmit(event) {
    event.preventDefault();
    const newProduct = {
      id: Math.floor(Math.random()*100),
      product_name: event.target.product_name.value,
      product_brand: event.target.product_brand.value,
      product_category: event.target.product_category.value,
      product_image: event.target.product_image.value,
      product_price: event.target.product_price.value + '₺',
      stock: event.target.stock.value,
    };
  
    const updatedProducts = [...products, newProduct];
    setNewProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
  }
    
  function handleAddToCart(product) {
    if (product.stock > 0) {
      setCartNumber(cartNumber + 1);
      product.stock -= 1;
      const cartCountElement = document.querySelector('.cartCount');
      if (cartCountElement) {
        cartCountElement.textContent = cartNumber + 1;
      }
    } if (product.stock === 0) {
      alert('Stoktaki son ürünü sepete eklediniz. Tebrikler.');
    }
  }

  function handleCategoryClick(selectedCategory) {
    if (selectedCategory) {
      const filteredProducts = products.filter(
        (product) => product.product_category === selectedCategory
      );
      setFilteredProducts(filteredProducts);
    } else {
      setFilteredProducts(products);
    }
  }
  
  function AdminPanel({ onSubmit }) {
    return (
      <div className="adminContent">
        <form id="adminForm" onSubmit={onSubmit}>
          <label htmlFor="id">Ürün id:</label>
          <input type="number" id="id" name="id" disabled placeholder='Otomatik oluşturulacak.' />
  
          <label htmlFor="product_name">Ürünün ismi:</label>
          <input type="text" id="product_name" name="product_name" required />
  
          <label htmlFor="product_brand">Ürünün Markası:</label>
          <input type="text" id="product_brand" name="product_brand" required />
  
          <label htmlFor="product_category">Ürünün Kategorisi:</label>
          <input type="text" id="product_category" name="product_category"required />
  
          <label htmlFor="product_image">Ürünün Resmi:</label>
          <input type="text" id="product_image" name="product_image" required />
  
          <label htmlFor="product_price">Ürünün Fiyatı:</label>
          <input type="number" id="product_price" name="product_price" required />
  
          <label htmlFor="stock">Ürünün Stok Miktarı:</label>
          <input type="number" id="stock" name="stock" required />
  
          <button type="submit">Gönder</button>
        </form>
      </div>
    );
  }


  const productElements = filteredProducts.map((currProduct) => (
    <div key={currProduct.id} id={currProduct.id} className="mainProduct">
      <div className="productInfo">
        <p>{currProduct.product_brand}</p>
        <h3>{currProduct.product_name}</h3>
      </div>
      <div className="productCategory">
        <p>{currProduct.product_category}</p>
      </div>
      <div className="productImage">
        <img src={currProduct.product_image} alt="" />
      </div>
      <div className="stockAndPrice">
        <p className="stock">{currProduct.stock} adet stokta kaldı!</p>
        <p className="price">{currProduct.product_price}</p>
      </div>
      <div className="addCart">
      <button className="addToCart" onClick={() => handleAddToCart(currProduct)} disabled={currProduct.stock === 0}>Sepete Ekle</button>
      </div>
    </div>
  ));

  const handleAdminModeChange = (checked) => {
    setAdminMode(checked);
  };

  return (
    <div className="content">
      <div className='navBar'>
        <header><CategoryButtons handleCategoryClick={handleCategoryClick} /></header>
      </div>
      <div className='adminContainer'>
      <div className="adminMode">
          <Switch onChange={handleAdminModeChange} /><p>Admin Mode</p>
        </div>
        {adminMode && <AdminPanel onSubmit={handleSubmit}/>} {/* adminMode true ise AdminPanel render edilir */}
      </div>
      <div className='products'>
        {productElements}
      </div>
    </div>
  );
}

export default App;
