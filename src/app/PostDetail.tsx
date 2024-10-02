import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import styles from "./App.module.css";
import { useParams } from "react-router-dom";

export default function PostDetail(): JSX.Element {
  const { id } = useParams();
  const [post, setPost] = useState<Post>();

  useEffect(() => {
    fetch(`/api/post/${id}`)
      .then((response) => response.json())
      .then((data) => setPost(data.message[0]));
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
