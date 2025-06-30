/* eslint-disable import/order */
import { onLogOut } from "@/lib/auth-event-emitter";
import { useRouter } from "@/routes/hooks";
import Cookies from "js-cookie";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  user: any;
  login: (account: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

import { PropsWithChildren } from "react";

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const login = useCallback(
    (account: { user: any; accessToken: string; refreshToken: string }) => {
      setUser(account.user);
      Cookies.set("user", JSON.stringify(account), { expires: 7 });
      Cookies.set("token", account.accessToken, { expires: 7 });
      Cookies.set("refreshToken", account.refreshToken, { expires: 7 });
    },
    [],
  );
  const logout = useCallback(() => {
    router.replace("/");
    setUser(null);
    Cookies.remove("user");
    Cookies.remove("token");
    Cookies.remove("refreshToken");
  }, []);

  // Load user from cookies on initial render
  useEffect(() => {
    const userCookie = Cookies.get("user");

    try {
      if (userCookie) {
        const parsed = JSON.parse(userCookie);

        setUser(parsed.user); // nếu lưu là object account
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      Cookies.remove("user");
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onLogOut(() => {
      logout();
    });

    return () => unsubscribe();
  }, [logout]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
