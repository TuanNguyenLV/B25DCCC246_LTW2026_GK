const BUILD_TAG = "kt-6641";
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import AddProduct from './pages/AddProduct';
import ProductDetail from './pages/ProductDetail';

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchProducts = async () => {
      try {
        const localData = localStorage.getItem('gk_products');
        if (localData) {
          setProducts(JSON.parse(localData));
          setLoading(false);
          return;
        }

        const res = await axios.get('/data/products.json', { signal: controller.signal });
        setProducts(res.data);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError('Không tải được dữ liệu');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem('gk_products', JSON.stringify(products));
    }
  }, [products, loading]);

  const updateStock = (id, delta) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, stock: p.stock + delta } : p
    ));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const addProduct = (newProduct) => {
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    setProducts([...products, { ...newProduct, id: newId }]);
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home products={products} />} />
        <Route path="products" element={<ProductList products={products} onUpdate={updateStock} onDelete={deleteProduct} />} />
        <Route path="products/new" element={<AddProduct onAdd={addProduct} />} />
        <Route path="products/:id" element={<ProductDetail products={products} />} />
        <Route path="*" element={<div>Không tìm thấy trang</div>} />
      </Route>
    </Routes>
  );
};

export default App;