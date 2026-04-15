import React, { useEffect, useState } from 'react';
import { countryService } from '../services/WikiApi';
import Layout from '../components/Layout'; 
import SearchBar from '../components/SearchBar';
import CountryGrid from '../components/CountryGrid'; 
import Loader from '../components/Loader';
import "../style/StyleGlobal.css";

const Home = ({ toggleDarkMode, isDark }) => {
  const [countries, setCountries] = useState([]); //lista da Api
  const [filteredCountries, setFilteredCountries] = useState([]); // Lista que aparece na tela
  const [searchQuery, setSearchQuery] = useState(""); 
  const [loading, setLoading] = useState(true);

    useEffect(() => {
   const fetchCountries = async () => {
      try {
        const response = await countryService.getAllCountries();
        
        if (response && Array.isArray(response)) { 
          const sorted = response.sort((a, b) => 
            a.name.common.localeCompare(b.name.common)
          );
          setCountries(sorted);
          setFilteredCountries(sorted);
        }
      } catch (error) {
        console.error("🔴 Erro ao buscar países:", error);
        console.error("🔴 Status:", error.response?.status);
        console.error("🔴 Mensagem:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

    // Filtra os países por região
  const filterByRegion = (region) => {
    if (region === "All") {
      setFilteredCountries(countries);
    } else {
      const filtered = countries.filter(c => 
        c.region.toLowerCase() === region.toLowerCase()
      );
      setFilteredCountries(filtered);
    }
  };
  const countriesToDisplay = filteredCountries.filter(country =>
    country.name.common.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  return (
    <Layout onFilter={filterByRegion} toggleDarkMode={toggleDarkMode} isDark={isDark}>
      <section className="hero">
        <h1>Explore the Atlas</h1>
        <p>A CURATED DIGITAL ARCHIVE OF SOVEREIGN NATIONS AND CULTURES</p>
      </section>

      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {loading ? (
        <Loader /> 
      ) : (
        <CountryGrid countries={countriesToDisplay} />
      )}
    </Layout>
  );
};

export default Home;