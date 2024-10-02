import React, { useEffect, useState } from "react";
import PhotoCard from "./PhotoCard";
import styles from "../App.module.css";
import Header from "./Header";
import { getPosts } from "../apiService";

export default function Layout(): JSX.Element {
  const [posts, setPosts] = useState<Array<Post>>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPosts();
      if (posts) {
        setPosts(posts);
      }
    };
    fetchPosts().catch(console.error);
  }, []);

  return (
    <>
      <div className={styles.Container}>
        <div className={styles.Grid}>
          <Header />
          {posts.map((p) => (
            <PhotoCard
              id={p.id}
              key={p.id}
              title={p.title}
              author={p.author}
              url={p.url}
            />
          ))}
        </div>
      </div>
    </>
  );
}
