import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

interface HeaderProps {
  title?: string;
  breadcrumbs?: string;
}

export default function Header({
  title,
  breadcrumbs,
}: HeaderProps): JSX.Element {
  return (
    <header className={styles.GridHeader}>
      <Link to="/">{title ? title : "Quotes"}</Link>{" "}
      {breadcrumbs && `> ${breadcrumbs}`}
      <hr className={styles.HeaderLine} />
    </header>
  );
}
