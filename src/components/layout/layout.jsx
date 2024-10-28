import React from "react";
import Menu from "../menu";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'; // Импортируем стили

const Layout = ({
  title = "Title",
  description = "Description",
  className,
  children,
}) => (
  <div className="layout-grid-contayner">
    <header className="bg-primary text-white header-container">
      <Menu />
      <div className="header-content ">
        <h1> {title}</h1>
        <p className="lead"> {description}</p>
      </div>
    </header>
    <main className={`${className}`} >
      {children}
    </main>
  </div>
);

export default Layout;