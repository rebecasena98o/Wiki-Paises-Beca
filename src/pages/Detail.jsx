import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PaisesWiki from '../services/WikiApi'; 
import Blockinfo from '../components/Blockinfo';
import Loader from '../components/Loader'; // Usando o spinner que criamos
import Layout from '../components/Layout'; // Importamos o Layout para manter o Header e Footer

const Detail = () => {
  const { code } = useParams(); 
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!code) return;

    setLoading(true);
    
    // A API restcountries pode ser sensível a maiúsculas no endpoint /alpha/
    PaisesWiki.getCountryByCode(code.toUpperCase())
      .then((res) => {
        // A API costuma retornar um array mesmo para busca por código único
        const result = Array.isArray(res) ? res[0] : res;
        setCountry(result);
      })
      .catch((err) => {
        console.error("Erro ao carregar detalhes:", err);
        setCountry(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [code]);

  // Se estiver carregando, mostra o Loader centralizado
  if (loading) return <Layout><Loader /></Layout>;

  // Se não encontrar o país após o carregamento
  if (!country) {
    return (
      <Layout>
        <div style={{ padding: "50px", textAlign: "center" }}>
          <p>País não encontrado.</p>
          <Link to="/">Voltar para a Home</Link>
        </div>
      </Layout>
    );
  }

  // Tratamento de dados complexos (Objetos para String)
  const currencies = country.currencies 
    ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(', ')
    : 'N/A';

  const languages = country.languages 
    ? Object.values(country.languages).join(', ')
    : 'N/A';

  return (
    <Layout>
      <div className="detail-container" style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontWeight: 'bold', fontSize: '0.9rem' }}>
          ← BACK TO ATLAS
        </Link>

        <section className="detail-header" style={{ marginTop: '30px', display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap' }}>
          <img 
            src={country.flags.svg} 
            alt={country.name.common} 
            style={{ width: '400px', maxWidth: '100%', borderRadius: '4px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} 
          />
          <div className="names">
            <h1 style={{ fontSize: '3rem', margin: 0, fontFamily: 'var(--font-serif)' }}>{country.name.common}</h1>
            <p style={{ color: '#778da9', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
              {country.name.official}
            </p>
          </div>
        </section>

        <div className="info-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '30px', 
          marginTop: '50px',
          borderTop: '1px solid #ddd',
          paddingTop: '30px'
        }}>
          <Blockinfo label="Capital" value={country.capital?.[0]} />
          <Blockinfo label="Continent" value={country.region} />
          <Blockinfo label="Sub-region" value={country.subregion} />
          <Blockinfo label="Population" value={country.population?.toLocaleString()} />
          <Blockinfo label="Area" value={`${country.area?.toLocaleString()} km²`} />
          <Blockinfo label="Languages" value={languages} />
          <Blockinfo label="Currency" value={currencies} />
          <Blockinfo label="ISO Code" value={country.cca3} />
        </div>
      </div>
    </Layout>
  );
};

export default Detail;