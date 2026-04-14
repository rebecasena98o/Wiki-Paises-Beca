import { Link } from 'react-router-dom';
import '../style/StyleGlobal.css';
import '../style/Header.css';

const Header = ({ onFilter }) => {
  // Os nomes devem ser em Inglês para bater com o banco de dados da API
  // Centro: Continentes para filtro (Requisito funcional do Header)
  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  return (
    <header className="main-header">
      <div className="header-content">
        <div className="header-section left">
          <Link to="/" onClick={() => onFilter("All")} className="logo">
            WikiPaíses
          </Link>
        </div>

         
        <nav className="nav-menu"> 
          {regions.map(region => (
           <button key={region} onClick={() => onFilter(region)} className="nav-menu-item">
          {region}
        </button>
          ))}
        </nav>

        <div className="header-section right header-icons">
          <span>🌐</span>
          <span>🌙</span>
        </div>
      </div>
    </header>
  );
};

export default Header;