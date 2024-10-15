import React, { useEffect, useState } from "react";
import Header from "./../components/Header";
import styles from "./PostDetail.module.css";
import { useParams } from "react-router-dom";
import { getPost, updatePost } from "./../apiService";
import { useAuth } from "../providers/AuthProvider";

export default function PostDetail(): JSX.Element {
  const { id } = useParams();
  const [post, setPost] = useState<Post>();
  const [note, setNote] = useState<string>("");
  const auth = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      if (id) {
        const post = await getPost(id);
        if (post) {
          setPost(post);
        }
      }
    };
    fetchPosts().catch(console.error);
  }, []);

  const addNote = async (e: any) => {
    e.preventDefault();
    if (id && note && post) {
      const res: any = await updatePost(id, note);
      if (res) {
        setPost({ ...post, note: note });
      }
      console.log(res);
    }
  };

  return (
    <>
      {post && (
        <div className={styles.Container}>
          <div className={styles.Grid}>
            <Header breadcrumbs={`${post.title}, ${post.author}`} />
            <div>
              <img src={post.url} width={500} />
            </div>
            {post.note ? (
              <span className={styles.Note}>{post.note}</span>
            ) : auth.token ? (
              <div>
                <input
                  className={styles.Input}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  name="note"
                  placeholder="Note"
                />
                <button className={styles.AddButton} onClick={addNote}>
                  Add note
                </button>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}
