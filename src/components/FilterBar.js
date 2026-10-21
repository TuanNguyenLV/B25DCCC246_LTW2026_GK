import React from 'react';
import { CATEGORIES } from '../data';

const FilterBar = ({ query, onQueryChange, category, onCategoryChange }) => {
  return (
    <div style={{ marginBottom: '15px' }}>
      <label>Tìm kiếm: <input type="text" value={query} onChange={onQueryChange} /></label>
      <label style={{ marginLeft: '15px' }}>Danh mục: 
        <select value={category} onChange={onCategoryChange}>
          <option value="Tất cả">Tất cả</option>
          {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </label>
    </div>
  );
};

export default FilterBar;