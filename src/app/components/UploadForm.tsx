import React from "react";
import styles from "./UploadForm.module.css";
import { upload, createPost } from "../apiService";
import { useNavigate } from "react-router-dom";

export default function UploadForm(): JSX.Element {
  const navigate = useNavigate();
  async function onSubmitForm(e: any): Promise<Response | undefined> {
    e.preventDefault();
    const formData = new FormData(e.target);
    const signedUrl = await upload(formData.get("uploadedImg") as File);
    const post: CreatePostProps = {
      title: formData.get("title") as string,
      author: formData.get("author") as string,
      note: formData.get("note") as string,
      url: signedUrl || "",
    };
    const newPostId = await createPost(post);
    if (!!newPostId) {
      navigate("/");
    }
    return;
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
              required
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
