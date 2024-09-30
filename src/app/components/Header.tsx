import React from "react";

// TODO: move to header styling module?
import styles from "../App.module.css";
import { Link } from "react-router-dom";

interface HeaderProps {
  breadcrumbs?: string;
}

export default function Header({ breadcrumbs }: HeaderProps): JSX.Element {
  return (
    <header className={styles["App-header"]}>
      <Link to="/">Quotes</Link> {breadcrumbs && `> ${breadcrumbs}`}
      <hr className={styles.line} />
    </header>
  );
}
