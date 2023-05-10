import * as React from "react";

const Layout = ({ pageTitle, children }) => {
  return (
    <div>
      <header>
        <h1>Plant Explorer</h1>
      </header>
      <nav>
        Search: <input type="text" className="st-default-search-input"></input>
        <div className="st-search-container"></div>
      </nav>
      <main>
        <h2>{pageTitle}</h2>
        {children}
      </main>
    </div>
  );
};

export default Layout;
