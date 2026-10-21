import React from 'react';
import { Link } from 'react-router-dom';
import { formatMoney } from '../data';

const ProductRow = ({ product, onUpdate, onDelete }) => {
  const { id, name, category, price, stock } = product;
  const isLowStock = stock < 5;

  return (
    <tr>
      <td><Link to={`/products/${id}`}>{name}</Link></td>
      <td>{category}</td>
      <td>{formatMoney(price)}</td>
      <td className={isLowStock ? 'text-red' : ''}>{stock}</td>
      <td>
        <button onClick={() => onUpdate(id, 1)}>+</button>
        <button onClick={() => onUpdate(id, -1)} disabled={stock === 0}>-</button>
        <button onClick={() => onDelete(id)} style={{ marginLeft: '10px' }}>Xóa</button>
      </td>
    </tr>
  );
};

export default ProductRow;