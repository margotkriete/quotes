import React from "react";
import {
  Routes as Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import PostDetail from "./PostDetail";
import Layout from "./components/Layout";
import Login from "./Login";
import Upload from "./Upload";

function App(): JSX.Element {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" element={<Layout />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/login" element={<Login />} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
