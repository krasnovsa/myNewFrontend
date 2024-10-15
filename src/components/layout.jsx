import React from "react";
import Menu from "./menu";
import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = ({
  title = "Title",
  description = "Description",
  className,
  children,
}) => (
  <div className="d-flex flex-column vh-100 vw-100">
    <header className="bg-primary text-white p-3" style={{ flex: '0 0 15vh' }}>
      <Menu />
      <div>
        <h1 className="display-4"> {title}</h1>
        <p className="lead"> {description}</p>
      </div>
    </header>
    <main className={`flex-grow-1 ${className}`} style={{ overflow: 'hidden' }}>
      {children}
    </main>
  </div>
);

export default Layout;