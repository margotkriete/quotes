import React from "react";
import styles from "./UploadForm.module.css";

export default function UploadForm(): JSX.Element {
  return (
    <>
      <div className={styles.Container}>
        <div className={styles.UploadDiv}>
          <input
            className={styles.UploadButton}
            id="upload"
            type="file"
            name="upload"
            accept="image/png, image/jpeg"
          />
        </div>
        <input
          className={styles.Input}
          name="title"
          placeholder="Title"
          required
        />
        <input
          className={styles.Input}
          name="author"
          placeholder="Author"
          required
        />
        <input className={styles.Input} name="note" placeholder="Notes" />
        <button className={styles.AddButton}>Add</button>
      </div>
    </>
  );
}
