import React from "react";
import Header from "./components/Header";
import styles from "./App.module.css";
import { submitLogin } from "./apiService";

export default function Login(): JSX.Element {
  const submitForm = async (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    if (!!data.get("username") && !!data.get("password")) {
      const username: string = data.get("username") as string;
      const password: string = data.get("password") as string;
      await submitLogin(username, password);
    }
  };

  return (
    <>
      <div className={styles.Container}>
        <div className={styles.Grid}>
          <Header title="Login" />
          <form method="post" onSubmit={submitForm}>
            <input
              className={styles.Input}
              name="username"
              placeholder="Username"
              id="username"
              required
            />
            <input
              className={styles.Input}
              name="password"
              placeholder="Password"
              type="password"
              id="current-password"
              required
            />
            <button type="submit">Sign in</button>
          </form>
        </div>
      </div>
    </>
  );
}
