import "../style/Card.css"
import { Link } from 'react-router-dom';
import '../style/Card.css';

const Card = ({ country }) => {
  return (
    <Link to={`/country/${country.cca3}`} className="card">
      <img src={country.flags.svg} alt={country.name.common} className="card-flag" />
      <div className="card-body">
        <h3 className="card-title">{country.name.common}</h3>
        <p className="card-info">
          <strong>Capital:</strong> {country.capital?.[0] || 'N/A'}
        </p>
        <p className="card-info">
          <strong>Continente:</strong> 
          {/* A classe do badge é dinâmica baseada na região */}
          <span className={`badge ${country.region.toLowerCase()}`}>
            {country.region}
          </span>
        </p>
        <p className="card-info">
          <strong>População:</strong> {country.population.toLocaleString('pt-BR')}
        </p>
        
      </div>
    </Link>
  );
};

export default Card;