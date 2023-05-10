import * as React from "react";
import { Link } from "gatsby";

const Layout = ({ pageTitle, children }) => {
  return (
    <div>
      <header>
        <h1>
          <Link to="/">Plant Explorer</Link>
        </h1>
      </header>
      <main>
        <h2>{pageTitle}</h2>
        {children}
      </main>
    </div>
  );
};

export default Layout;
