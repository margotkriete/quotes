import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import styles from "./App.module.css";
import { useParams } from "react-router-dom";
import { getPost } from "./apiService";

export default function PostDetail(): JSX.Element {
  const { id } = useParams();
  const [post, setPost] = useState<Post>();

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

  return (
    <>
      {post && (
        <div className={styles.Container}>
          <div className={styles.Grid}>
            <Header breadcrumbs={`${post.title}, ${post.author}`} />
            <div>
              <img src={post.url} width={500} />
            </div>
            {post.note && <span className={styles.Note}>{post.note}</span>}
          </div>
        </div>
      )}
    </>
  );
}
