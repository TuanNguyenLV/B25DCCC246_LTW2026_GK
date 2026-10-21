import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FilterBar from '../components/FilterBar';
import ProductTable from '../components/ProductTable';

const ProductList = ({ products, onUpdate, onDelete }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Tất cả');
  const location = useLocation();
  const [message, setMessage] = useState(location.state?.message || '');

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleQueryShift = (e) => {
    setQuery(e.target.value);
  };

  const filteredProducts = products.filter(p => {
    const matchQuery = p.name.toLowerCase().includes(query.toLowerCase());
    const matchCat = category === 'Tất cả' || p.category === category;
    return matchQuery && matchCat;
  });

  return (
    <div>
      {message && (
        <div className="toast">
          {message}
          <button onClick={() => setMessage('')} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>×</button>
        </div>
      )}
      <FilterBar 
        query={query} 
        onQueryChange={handleQueryShift} 
        category={category} 
        onCategoryChange={(e) => setCategory(e.target.value)} 
      />
      <p>Tìm thấy {filteredProducts.length} sản phẩm</p>
      <ProductTable products={filteredProducts} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
};

export default ProductList;