import Card from './Card';

const CountryGrid = ({ countries }) => {
  if (countries.length === 0) {
    return <p style={{ textAlign: 'center' }}>Nenhum país encontrado.</p>;
  }

  return (
    <div className="countries-grid">
      {countries.map((country) => (
        <Card key={country.cca3} country={country} /> // percorre a lista de países e renderiza um Card para cada um
      ))}
    </div>
  );
};

export default CountryGrid;