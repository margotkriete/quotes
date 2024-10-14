import React, { useContext, createContext, useState } from "react";

import { submitLogin } from "../apiService";

type LoginCredentials = { username: string; password: string };

export const AuthContext = createContext<{
  token: any;
  error?: string;
  loginAction: (creds: LoginCredentials) => Promise<string | void>;
}>({
  token: "",
  loginAction: async (_) => {},
});

const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState(localStorage.getItem("connectSid") || "");
  const loginAction = async (data: any) => {
    try {
      const res = (await submitLogin(data.username, data.password)) as any;
      if (res) {
        localStorage.setItem("connectSid", res);
        setToken(res);
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider value={{ token, loginAction }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
