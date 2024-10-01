import React, { useEffect, useState } from "react";
import {
  Routes as Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import PostDetail from "./PostDetail";
import Grid from "./components/Grid";
import Upload from "./Upload";

function App(): JSX.Element {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" element={<Grid />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/upload" element={<Upload />} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
