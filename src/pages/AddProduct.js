import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../data';

const AddProduct = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !stock) {
      setError('Vui lòng nhập đầy đủ thông tin phía dưới form');
      return;
    }

    const numPrice = Number(price);
    const numStock = Number(stock);

    if (numPrice <= 0 || !Number.isInteger(numStock) || numStock < 0) {
      setError('Giá phải lớn hơn 0, số lượng là số nguyên không âm');
      return;
    }

    const newProduct = { name, category, price: numPrice, stock: numStock };
    onAdd(newProduct);
    navigate('/products', { replace: true, state: { message: `Đã thêm sản phẩm ${name}` } });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', gap: '10px' }}>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <label>Tên sản phẩm: <input type="text" value={name} onChange={(e) => setName(e.target.value)} /></label>
      <label>Danh mục: 
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </label>
      <label>Giá: <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} /></label>
      <label>Số lượng tồn: <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} /></label>
      <button type="submit">Thêm</button>
    </form>
  );
};

export default AddProduct;