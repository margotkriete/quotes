import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import styles from "./App.module.css";
import { useParams } from "react-router-dom";
import { getPost } from "./apiService";

export default function PostDetail(): JSX.Element {
  const { id } = useParams();
  const [post, setPost] = useState<Post>();

  useEffect(() => {
    const post = id ? getPost(id) : null;
    if (post) {
      setPost(post);
    }
  }, []);

  return (
    <>
      {post && (
        <div className={styles.Container}>
          <div className={styles.Grid}>
            <Header breadcrumbs={`${post.title}, ${post.author}`} />
            <div>
              <img src={post.url} width={500} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
