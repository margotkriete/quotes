import React from "react";
import styles from "./UploadForm.module.css";
import { upload } from "../apiService";

export default function UploadForm(): JSX.Element {
  async function onSubmitForm(e: any) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    upload(formData);
  }

  return (
    <>
      <form
        id="uploadPost"
        method="post"
        onSubmit={onSubmitForm}
        encType="multipart/form-data"
      >
        <div className={styles.Container}>
          <div className={styles.UploadDiv}>
            <input
              className={styles.UploadButton}
              id="uploadedImg"
              type="file"
              name="uploadedImg"
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
          <button className={styles.AddButton} type="submit">
            Add
          </button>
        </div>
      </form>
    </>
  );
}
