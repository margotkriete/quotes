import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

export default function Header({
  title,
  breadcrumbs,
}: HeaderProps): JSX.Element {
  return (
    <header className={styles.GridHeader}>
      <Link to="/">{title ? title : "Quotes"}</Link>{" "}
      {breadcrumbs && (
        <span className={styles.Breadcrumbs}>&gt; {breadcrumbs}</span>
      )}
      <hr className={styles.HeaderLine} />
    </header>
  );
}
