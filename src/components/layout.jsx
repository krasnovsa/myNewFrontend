import React from "react";
import Menu from "./menu";
import 'bootstrap/dist/css/bootstrap.min.css';
import './layout.css'; // Импортируем стили

const Layout = ({
  title = "Title",
  description = "Description",
  className,
  children,
}) => (
  <div className="d-flex flex-column vh-100 vw-100">
    <header className="bg-primary text-white p-3 header-container">
      <Menu />
      <div className="header-content">
        <h1> {title}</h1>
        <p className="lead"> {description}</p>
      </div>
    </header>
    <main className={`flex-grow-1 ${className}`} style={{ overflow: 'hidden' }}>
      {children}
    </main>
  </div>
);

export default Layout;