import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { countryService } from '../services/WikiApi';
import Blockinfo from '../components/Blockinfo';
import Loader from '../components/Loader'; 
import Layout from '../components/Layout';

const Detail = () => {
  const { code } = useParams(); 
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!code) return;

    setLoading(true);
    
    
    countryService.getCountryByCode(code.toUpperCase())
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
        <div style={{ padding: "100px 20px", textAlign: "center" }}>
          <h2 style={{ fontFamily: 'var(--font-serif)' }}>País não encontrado</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
            Não conseguimos localizar as informações para o código: {code}
          </p>
          <Link to="/" style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>
            Voltar para a Home
          </Link>
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
      <div className="detail-container" style={{ padding: '40px 5%', maxWidth: '1300px', margin: '0 auto' }}>
        
      {/* Botão de Voltar sofisticado */}
    <Link to="/" style={{ 
    textDecoration: 'none',
    backgroundColor: '#ffffff', // Fundo branco para parecer botão
    padding: '10px 20px',       // Espaçamento interno
    borderRadius: '8px',        // Bordas arredondadas
    border: '1px solid #e0e0e0', // Borda sutil
    boxShadow: '0 2px 5px rgba(0,0,0,0.08)', // Sombra inicial sutil
    color: 'var(--text-main)', 
    fontWeight: 'bold', 
    fontSize: '0.8rem',
    letterSpacing: '1px',
    display: 'inline-flex',     // Alinha ícone e texto
    alignItems: 'center',
    marginBottom: '30px',
    transition: 'all 0.3s ease', // Transição suave para todos os efeitos
    cursor: 'pointer'
}} 
// Efeitos de Hover e Active via Eventos de Mouse
  onMouseEnter={e => {
    e.currentTarget.style.transform = 'translateY(-3px)'; // Levitação sutil
    e.currentTarget.style.boxShadow = '0 6px 15px rgba(0,0,0,0.12)'; // Profundidade
    e.currentTarget.style.borderColor = '#ccc';
}} 
  onMouseLeave={e => {
    e.currentTarget.style.transform = 'translateY(0)'; // Volta ao normal
    e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.08)';
    e.currentTarget.style.borderColor = '#e0e0e0';
}}
  onMouseDown={e => {
    e.currentTarget.style.transform = 'translateY(-1px)'; // Efeito de clique (afunda levemente)
    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
}}
  onMouseUp={e => {
    e.currentTarget.style.transform = 'translateY(-3px)';
}}
>
    <span style={{ marginRight: '8px', fontSize: '1.1rem' }}>←</span> BACK TO ATLAS
</Link>

        {/* Cabeçalho do Detalhe */}
        <section className="detail-header" style={{ 
          display: 'flex', 
          gap: '60px', 
          alignItems: 'center', 
          flexWrap: 'wrap' 
        }}>
          <img 
            src={country.flags.svg} 
            alt={country.name.common} 
            style={{ 
              width: '300px', 
              maxWidth: '100%', 
              borderRadius: '12px', 
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.56)' 
            }} 
          />
          <div className="names" style={{ flex: '1', minWidth: '300px' }}>
            <h1 style={{ 
              fontSize: '4rem', 
              margin: '0 0 10px 0', 
              fontFamily: 'var(--font-serif)',
              color: 'var(--primary-color)',
              lineHeight: '1.1'
            }}>
              {country.name.common}
            </h1>
            <p style={{ 
              color: 'var(--text-secondary)', 
              fontSize: '1.2rem', 
              textTransform: 'uppercase', 
              letterSpacing: '3px',
              fontWeight: '500'
            }}>
              {country.name.official}
            </p>
          </div>
        </section>

        {/* Grid de Informações */}
        <div className="info-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
          gap: '40px', 
          marginTop: '90px',
          borderTop: '1px solid #0000008c',
          paddingTop: '40px'
        }}>
          <Blockinfo label="Capital" value={country.capital?.[0] || 'N/A'} />
          <Blockinfo label="Continent" value={country.region} />
          <Blockinfo label="Sub-region" value={country.subregion || 'N/A'} />
          <Blockinfo label="Population" value={country.population?.toLocaleString('pt-BR')} />
          <Blockinfo label="Area" value={country.area ? `${country.area.toLocaleString('pt-BR')} km²` : 'N/A'} />
          <Blockinfo label="Languages" value={languages} />
          <Blockinfo label="Currency" value={currencies} />
          <Blockinfo label="ISO Code" value={country.cca3} />
        </div>
      </div>
    </Layout>
  );
};

export default Detail;