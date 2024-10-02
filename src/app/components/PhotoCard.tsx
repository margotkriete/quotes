import React from "react";
import { Link } from "react-router-dom";
import styles from "./PhotoCard.module.css";

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
        <img src={url} />
      </Link>
      <span className={styles.Title}>{title}</span>
      <span>{author}</span>
    </div>
  );
}
