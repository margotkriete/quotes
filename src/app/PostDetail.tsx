import React from "react";
import Header from "./components/Header";
import styles from "./App.module.css";

interface PostDetailProps {
  title: string;
}

export default function PostDetail({ title }: PostDetailProps): JSX.Element {
  return (
    <>
      <div className={styles.Container}>
        <div className={styles.App}>
          <Header breadcrumbs={title} />
        </div>
      </div>
    </>
  );
}
