import React from "react";
import {
  Routes as Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import PrivateRoute from "./router/route";
import AuthProvider from "./providers/AuthProvider";
import PostDetail from "./pages/PostDetail";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Upload from "./pages/Upload";

function App(): JSX.Element {
  return (
    <>
      <Router>
        <AuthProvider>
          <Switch>
            <Route path="/" element={<Layout />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route element={<PrivateRoute />}>
              <Route path="/upload" element={<Upload />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
