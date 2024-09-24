import React from "react";
import Menu from "./menu";


const Layout = ({
  title = "Title",
  description = "Description",
  className,
  children,
}) => (
  <div className="p-2">
    <Menu />
    <div className="bg-primary text-white">
      <h1 className="display-4 p2"> {title}</h1>
      <p className="lead p2"> {description}</p>
    </div>
    <div className={className}>{children}</div>
  </div>
);

export default Layout;
