import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

import { api } from "../../services/api";
import toast, { Toaster } from 'react-hot-toast';
import { Redirect, useHistory } from "react-router-dom";

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  email: string;
  id: number;
  name: string;
  address: string;
  admin: boolean;
}

interface AuthState {
  accessToken: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  accessToken: string;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const history = useHistory();
  const [data, setData] = useState<AuthState>(() => {
    const accessToken = localStorage.getItem("@sushizeira:accessToken");
    const user = localStorage.getItem("@sushizeira:user");


    if (accessToken && user) {
      return { accessToken, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post("/login", { email, password });
    const { accessToken, user } = response.data;
    toast.success('Login efetuado com sucesso!',{
      duration: 5000}) 
    

    localStorage.setItem("@sushizeira:accessToken", accessToken);
    localStorage.setItem("@sushizeira:user", JSON.stringify(user));


    setData({ accessToken, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("@sushizeira:accessToken");
    localStorage.removeItem("@sushizeira:user");
    history.push("/")
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken: data.accessToken,
        user: data.user,
        signIn,
        signOut,
      }}
    >
      <div><Toaster/></div>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
