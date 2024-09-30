import React from "react";
import { Link } from "react-router-dom";
import styles from "../App.module.css";

export default function PhotoCard(): JSX.Element {
  return (
    <div className={styles.PhotoCard}>
      <Link to="/post/1">
        <img
          src="https://pub-5c17239b18ba40cf8468fa65ff286b37.r2.dev/flaubert.jpg"
          width={200}
        />
      </Link>
      <Link className={styles.Title} to="/post/1">
        Title
      </Link>
      <Link to="/post/1">Author</Link>
    </div>
  );
}
