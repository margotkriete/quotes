import React from "react";
import Header from "./../components/Header";
import UploadForm from "./../components/UploadForm";
import styles from "./../App.module.css";

export default function Upload(): JSX.Element {
  return (
    <>
      <div className={styles.Container}>
        <div className={styles.Grid}>
          <Header title="Add quote" />
          <UploadForm />
        </div>
      </div>
    </>
  );
}
