import "../style/Card.css"
import { Link } from 'react-router-dom';

const Card = ({ country }) => {
  return (
    <div className="card">
      <Link to={`/country/${country.cca3}`}>
      
      <img 
        src={country.flags.svg} 
        alt={`${country.name.common} flag`} 
        className="flag"
        crossOrigin="anonymous"
      />
      </Link>
      <div className="card-body">
        
    <h3>{country.name?.common || "N/A"}</h3>

    <p>Capital: {country.capital?.[0] || "N/A"}</p>

    <p>
      Continente: 
      <span className={`badge ${country.region.toLowerCase()}`}>
        {country.region}
      </span>
    </p>

    <p>População: {country.population.toLocaleString()}</p>

    </div>
  </div>
  );
};

export default Card;