import { useNavigate } from "react-router-dom";
import { useContext } from "react"
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

function SignUp() {

    const navigate = useNavigate();
    const { setUsername, setEmail, setPassword, username, email, password } = useContext(AuthContext);

    async function userRegSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/register", {
                username, email, password
            });
            console.log(response.data);

            if (response.data.success) {
                toast.success("User Registration successful! Please go to Login page.")
            } else {
                toast.info(res.data.message);
            }
        } catch (error) {
            console.log(error);
           toast.error("Something Went Wrong! Please try again");
        }
    }

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">

            <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>

                <h2 className="text-center mb-4">Create Account</h2>

                <form className="d-flex flex-column" onSubmit={userRegSubmit} >

                    <div className="mb-3">
                        <label htmlFor="user-name" className="form-label">User Name</label>
                        <input
                            type="text"
                            id="user-name"
                            placeholder="Enter your user name"
                            name="user-name"
                            className="form-control"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            name="email"
                            className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            name="password"
                            className="form-control"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100 mt-2">
                        Sign Up
                    </button>
                </form>

                <div className="text-center mt-3">
                    <p className="mb-1">Already have an account?</p>
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate("/auth/login")}>
                        Sign In
                    </button>
                </div>

            </div>
        </div>
    );
}

export default SignUp;
