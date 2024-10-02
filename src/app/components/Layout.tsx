import React, { useEffect, useState } from "react";
import PhotoCard from "./PhotoCard";
import styles from "../App.module.css";
import Header from "./Header";
import axios from "axios";

export default function Layout(): JSX.Element {
  const [posts, setPosts] = useState<Array<Post>>([]);

  useEffect(() => {
    axios
      .get("/api/posts")
      .then(function (response) {
        setPosts(response.data.message);
      })
      .catch(function (error) {
        console.log(error);
      });
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
