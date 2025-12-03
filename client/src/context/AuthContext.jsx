import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, createContext } from "react"
import axios from "axios";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [loggedIn, setLoggedIn] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [changePassworddata, setChangePasswordData] = useState({
        oldpassword: "",
        newpassword: "",
        confirmpassword: ""
    })

    useEffect(() => {
        const verifyUserCookie = async () => {
            try {

                const res = await axios.get("http://localhost:5000/api/verify", { withCredentials: true });

                if (res.status === 200) {
                    // Token is valid
                    setLoggedIn(true);

                    if (location.pathname === "/auth/login" || location.pathname === "/auth/register") {
                        navigate("/products");
                    }
                } else {
                    // Token missing or invalid
                    setLoggedIn(false);

                    const protectedRoutes = ["/products", "/cart"];
                    if (protectedRoutes.includes(location.pathname)) {
                        navigate("/auth/register");
                    }
                }
            } catch (err) {

                setLoggedIn(false);

                const protectedRoutes = ["/products", "/cart"];
                if (protectedRoutes.includes(location.pathname)) {
                    navigate("/auth/register")
                }
            }
        }
        verifyUserCookie()

    }, [navigate, location.pathname])

    async function changePassword() {
        try {
            const { oldpassword, newpassword, confirmpassword } = changePassworddata;
            const res = await axios.put("http://localhost:5000/api/changepassword", { oldpassword, newpassword, confirmpassword }, { withCredentials: true });
            toast.success(res.data.message);
            setChangePasswordData({
                oldpassword: "",
                newpassword: "",
                confirmpassword: ""
            });
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    async function logOut(e) {
        e.preventDefault();
        try {
            await axios.get("http://localhost:5000/api/logout", { withCredentials: true });
        } catch (err) {
            console.error("Logout failed", err);
        }
        setLoggedIn(false);
        navigate("/auth/login");
    }

    return (
        <AuthContext.Provider value={{ setUsername, setEmail, setPassword, username, email, password, loggedIn, setLoggedIn, logOut, changePassword, setChangePasswordData, changePassworddata }} >
            {children}
        </AuthContext.Provider>
    )
}