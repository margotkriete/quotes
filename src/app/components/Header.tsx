import React from "react";
import styles from "../App.module.css";
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
    <header className={styles["Grid-header"]}>
      <Link to="/">{title ? title : "Quotes"}</Link>{" "}
      {breadcrumbs && `> ${breadcrumbs}`}
      <hr className={styles.line} />
    </header>
  );
}
