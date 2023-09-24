import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import './navbar.css'

export function CategoryButtons({ handleCategoryClick }) {
    return (
      <div className='headerMain'>
        <div className="headerNavbar">
          <div className="siteLogo">
            <img src="https://jx.ax/Uw5" alt=""></img>
          </div>
          <div className="productCategoryNav" id="navbarid">
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
          </div>
          <div className="cartNav">
            <label>
            <p>Sepet</p>
            <FontAwesomeIcon icon={faCartShopping} style={{ color: '#ffffff' }} />
            </label>
            <div className="cartContent">
              <p className="cartCount"></p>
            </div>
          </div>
        </div>
      </div>

    );
  }