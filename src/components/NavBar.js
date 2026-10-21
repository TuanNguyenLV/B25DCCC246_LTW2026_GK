import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <NavLink to="/" end>Trang chủ</NavLink>
      <NavLink to="/products" end>Danh sách</NavLink>
      <NavLink to="/products/new" end>Thêm mới</NavLink>
    </nav>
  );
};

export default NavBar;