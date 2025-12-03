import axios from "axios";
import {useContext} from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";


function SignIn() {

    const {email,password ,setEmail,setPassword} = useContext(AuthContext)
    const navigate = useNavigate();

    async function loginUser(e) {
        e.preventDefault();
        try{
        const response = await axios.post("http://localhost:5000/api/login",{
            email,password
        },{ withCredentials: true });

        toast.info("Login Successful!")
        navigate("/products")
        console.log(response.data);
        }catch(error){
            console.log(error.message);
        }
    }

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow p-4" style={{ maxWidth: "420px", width: "100%" }}>
                <h2 className="text-center mb-4">Log IN</h2>
                <form className="d-flex flex-column">
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            name="email"
                            className="form-control"
                            onChange={(e)=>setEmail(e.target.value)}
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
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mt-2" onClick={loginUser}>
                        Log In
                    </button>
                </form>

            </div>
        </div>
    )
}

export default SignIn;      