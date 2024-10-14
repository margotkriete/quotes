import React from "react";
import Header from "./../components/Header";
import Layout from "./../components/Layout";
import styles from "./../App.module.css";
import { useAuth } from "./../providers/AuthProvider";

export default function Login(): JSX.Element {
  const auth = useAuth();
  const submitForm = async (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const username: string = data.get("username") as string;
    const password: string = data.get("password") as string;
    auth.loginAction({ username: username, password: password });
  };

  return (
    <>
      {!auth.user ? (
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
              <button type="submit" className={styles.LoginButton}>
                Sign in
              </button>
            </form>
          </div>
        </div>
      ) : (
        <Layout />
      )}
    </>
  );
}
