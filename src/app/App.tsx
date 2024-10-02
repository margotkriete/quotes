import React from "react";
import {
  Routes as Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import PostDetail from "./PostDetail";
import Layout from "./components/Layout";
import Upload from "./Upload";

function App(): JSX.Element {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" element={<Layout />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/upload" element={<Upload />} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
