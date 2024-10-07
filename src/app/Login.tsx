import React from "react";
import Header from "./components/Header";
import styles from "./App.module.css";

export default function Login(): JSX.Element {
  return (
    <>
      <div className={styles.Container}>
        <div className={styles.Grid}>
          <Header title="Login" />
          <input
            className={styles.Input}
            name="username"
            placeholder="Username"
            required
          />
          <input
            className={styles.Input}
            name="password"
            placeholder="Password"
            required
          />
        </div>
      </div>
    </>
  );
}
