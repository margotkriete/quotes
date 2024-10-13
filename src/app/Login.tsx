import React from "react";
import Header from "./components/Header";
import styles from "./App.module.css";
import { submitLogin } from "./apiService";
import { useNavigate } from "react-router-dom";

export default function Login(): JSX.Element {
  const navigate = useNavigate();

  const submitForm = async (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const username: string = data.get("username") as string;
    const password: string = data.get("password") as string;
    const user = (await submitLogin(username, password)) as any;
    if (user) {
      console.info("user", user);
      navigate("/");
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
            <button type="submit" className={styles.LoginButton}>
              Sign in
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
