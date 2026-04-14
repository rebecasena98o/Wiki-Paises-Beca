import React from 'react';
import '../style/StyleGlobal.css';


const SearchBar = ({ value, onChange }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="🔍 Pesquisar país por nome..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;