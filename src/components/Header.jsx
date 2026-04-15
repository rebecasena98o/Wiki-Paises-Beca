import { Link } from 'react-router-dom';
import '../style/StyleGlobal.css';
import '../style/Header.css';

const Header = ({ onFilter, toggleDarkMode, isDark }) => {
  
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
           <button key={region} onClick={() => onFilter(region)} className="nav-menu-item" data-continent={region.toLowerCase()}>
          {region}
        </button>
          ))}
        </nav>

        <div className="header-section right header-icons">
          <span 
          onClick={toggleDarkMode} 
          style={{ cursor: 'pointer', fontSize: '1.2rem' }}
          title="Alternar Modo Escuro"
        >
          {isDark ? '☀️' : '🌙'} {/* Muda o ícone dependendo do estado */}
        </span>
        </div>
      </div>
    </header>
  );
};

export default Header;