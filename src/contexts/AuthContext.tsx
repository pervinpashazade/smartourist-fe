import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/consts";
import axios from "../utils/axios";
import { notification } from "antd";
import { IUser } from "../app/models";

interface IAuthContextProps {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  user: IUser | null;
}

const AuthContext = createContext<IAuthContextProps | undefined>(undefined);

export const useAuth = (): IAuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["token", "role"]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);

  const [token, setToken] = useState<string | null>(cookies.token || null);

  // Fetch user on page load
  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, []);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get<any, IUser>("/auth/me", {
        // withCredentials: true,
      });
      console.log("pervin auth/me rsp", response);
      setUser(response);
    } catch (error) {
      setUser(null);
      notification.error({
        message: "Session Expired",
        description: "Please log in again.",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (token: string) => {
    setToken(token);
    setCookies("token", token, {
      expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
      secure: true,
      sameSite: "strict",
    });
    fetchUser();
    navigate(ROUTES.DASHBOARD.index);
  };

  useEffect(() => {
    console.log("pervin loading", loading);
  }, [loading]);

  const logout = () => {
    setToken(null);
    setUser(null);
    setCookies("token", null);
    navigate(ROUTES.AUTH.LOGIN);
  };

  const isAuthenticated = Boolean(token);

  return (
    <AuthContext.Provider
      value={{ token, login, logout, isAuthenticated, user, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
