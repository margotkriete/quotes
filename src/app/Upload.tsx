import React from "react";
import Header from "./components/Header";
import styles from "./App.module.css";

export default function Upload(): JSX.Element {
  return (
    <>
      <div className={styles.Container}>
        <div className={styles.Grid}>
          <Header title="Upload" />
        </div>
      </div>
    </>
  );
}
