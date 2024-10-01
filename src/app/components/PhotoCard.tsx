import React from "react";
import { Link } from "react-router-dom";
import styles from "../App.module.css";

interface PhotoCardProps {
  id: number;
  title: string;
  author: string;
  url: string;
}

export default function PhotoCard({
  id,
  title,
  author,
  url,
}: PhotoCardProps): JSX.Element {
  return (
    <div className={styles.PhotoCard}>
      <Link to={`/post/${id}`}>
        <img src={url} width={200} />
      </Link>
      <Link className={styles.Title} to="/post/1">
        {title}
      </Link>
      <Link to="/post/1">{author}</Link>
    </div>
  );
}
