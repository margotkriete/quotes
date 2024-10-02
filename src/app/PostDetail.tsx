import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import styles from "./App.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function PostDetail(): JSX.Element {
  const { id } = useParams();
  const [post, setPost] = useState<Post>();

  useEffect(() => {
    axios
      .get(`/api/post/${id}`)
      .then(function (response) {
        setPost(response.data.message[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
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
