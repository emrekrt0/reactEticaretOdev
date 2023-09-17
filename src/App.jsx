import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { createRoot } from 'react-dom/client'; 
import { products } from './data';
import './App.css';

function CategoryButtons({ handleCategoryClick }) {
  return (
    <ul>
      <li>
        <button className="categoryButton" onClick={() => handleCategoryClick('')} value="">Tüm Ürünler</button>
      </li>
      <li>
        <button className="categoryButton" onClick={() => handleCategoryClick('Elektronik')} value="Elektronik">Elektronik</button>
      </li>
      <li>
        <button className="categoryButton" onClick={() => handleCategoryClick('Giyim')} value="Giyim">Giyim</button>
      </li>
      <li>
        <button className="categoryButton" onClick={() => handleCategoryClick('Kişisel Bakım')} value="Kişisel Bakım">Kişisel Bakım</button>
      </li>
    </ul>
  );
}

function App() {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [cartNumber, setCartNumber] = useState(0); 

  function updateCartCount(count) {
    const cartCountElement = document.querySelector('.cartCount');
    if (cartCountElement) {
      cartCountElement.textContent = count;
    }
  }

  function handleAddToCart() {
    setCartNumber(cartNumber + 1);
    updateCartCount(cartNumber + 1);
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
  
  useEffect(() => {
    const navbarRoot = createRoot(document.querySelector('#navbarid'));
    navbarRoot.render(<CategoryButtons handleCategoryClick={handleCategoryClick} />);

    updateCartCount(cartNumber);
  }, []);

  const productElements = filteredProducts.map((currProduct) => (
    <div key={currProduct.id} className="mainProduct">
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
        <button className="addToCart" onClick={handleAddToCart}>Sepete Ekle</button>
      </div>
    </div>
  ));

  return (
    <div className="content">
      {productElements}
    </div>
  );
}

export default App;
