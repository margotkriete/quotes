import React from "react";
import styles from "./App.module.css";
import {
  Routes as Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import PostDetail from "./PostDetail";
import Header from "./components/Header";
import Upload from "./Upload";
import PhotoCard from "./components/PhotoCard";

function App(): JSX.Element {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" element={<Grid />} />
          <Route path="/post/:id" element={<PostDetail title="blah" />} />
          <Route path="/upload" element={<Upload />} />
        </Switch>
      </Router>
    </>
  );
}

function Grid(): JSX.Element {
  return (
    <>
      <div className={styles.Container}>
        <div className={styles.App}>
          <Header />
          <PhotoCard />
          <PhotoCard />
          <PhotoCard />
          <PhotoCard />
          <PhotoCard />
        </div>
      </div>
    </>
  );
}

export default App;
