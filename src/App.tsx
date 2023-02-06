import React from 'react';
import RouteProvider from "./components/unique/RouteProvider";
import Layout from "./components/routes/Layout";

function App() {
  return<div>
      <Layout>
          <RouteProvider/>
      </Layout>
  </div>;
}

export default App;
