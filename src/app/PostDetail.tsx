import React from "react";
import Header from "./components/Header";
import styles from "./App.module.css";
import { useParams } from "react-router-dom";

export default function PostDetail(): JSX.Element {
  const { id } = useParams();
  // const { title, author, url } = post;
  // TODO: look this up by title/author/URL or pass it through context
  const { title, author, url } = {
    // id: 1,
    title: "White Noise",
    author: "Don DeLillo",
    url: "https://pub-5c17239b18ba40cf8468fa65ff286b37.r2.dev/flaubert.jpg",
  };

  return (
    <>
      <div className={styles.Container}>
        <div className={styles.App}>
          <Header breadcrumbs={`${title}, ${author}`} />
          <div className={styles.PostDetail}>
            <img src={url} width={500} />
          </div>
        </div>
      </div>
    </>
  );
}
