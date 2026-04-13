import axios from "axios";

const api = axios.create({
  baseURL: "https://restcountries.com/v3.1",
  timeout: 10000,
});


const countryService = {
  
  getAllCountries: async () => {
    try {
      const response = await api.get("/all?fields=name,flags,cca3,population,region,capital");
        return response.data;
    } catch (error) {
      console.error("Erro ao buscar todos os países:", error);
      throw error;
    }
  },

  
  getCountriesByRegion: async (region) => {
    try {
      const response = await api.get(`/region/${region}?fields=name,flags,cca3,capital`);
        return response.data;
    } catch (error) {
      console.error(`Erro ao buscar países da região ${region}:`, error);
      throw error;
    }
  },

  
  getCountryByCode: async (code) => {
    try {
      const response = await api.get(`/alpha/${code}?fields=name,flags,cca3,population,region,subregion,capital,currencies,languages,area`);
        return response.data;
    } catch (error) {
      console.error(`Erro ao buscar detalhes do país ${code}:`, error);
      throw error;
    }
  }
};