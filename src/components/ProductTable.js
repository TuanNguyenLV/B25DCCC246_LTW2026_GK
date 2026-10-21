import React from 'react';
import ProductRow from './ProductRow';

const ProductTable = ({ products, onUpdate, onDelete }) => {
  if (products.length === 0) return <div>Không có dữ liệu</div>;

  return (
    <table>
      <thead>
        <tr>
          <th>Tên sản phẩm</th>
          <th>Danh mục</th>
          <th>Giá</th>
          <th>Tồn kho</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {products.map(p => (
          <ProductRow key={p.id} product={p} onUpdate={onUpdate} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;