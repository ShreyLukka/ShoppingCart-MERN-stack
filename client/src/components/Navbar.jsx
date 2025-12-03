import "bootstrap-icons/font/bootstrap-icons.css";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


function Navbar() {
  const { loggedIn,  logOut,changePassword,setChangePasswordData,changePassworddata } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  function SignupBtn() {
    navigate("/auth/register");
  }

  function goToSingIn() {
    navigate("/auth/login")
  }

  function goToCart() {
    navigate("/cart")
  }

  function goToChangePassword() {
    const modal = new bootstrap.Modal(
      document.getElementById("changePasswordModal")
    );
    modal.show();
  }

  return (<>
    <nav className="navbar bg-body-tertiary" style={{ margin: 0, padding: 0 }}>
      <div className="container-fluid" style={{ backgroundColor: "grey" }}>
        <button className="navbar-brand border-0" style={{ backgroundColor: "grey" }} onClick={() => loggedIn ? navigate("/products") : navigate("/")}>
          <i className="bi bi-shop" style={{ margin: 10 }}></i>
          ShoppingCart
        </button>
        {loggedIn ? <div className="ms-auto d-flex">
          <button className="shadow-nonw border m-2" onClick={goToChangePassword} >change password</button>
          <button className="shadow-none border m-2" onClick={goToCart} disabled={location.pathname === "/cart"}>Cart</button>
          <button className="shadow-none border m-2" onClick={logOut}>Log Out</button>
        </div> : <div className="ms-auto d-flex">
          <button className="shadow-none border m-2" onClick={SignupBtn} disabled={location.pathname === "/auth/register"}>SignUp</button>
          <button className="shadow-none border m-2" onClick={goToSingIn} disabled={location.pathname === "/auth/login"}>SignIn</button>
        </div>

        }
      </div>

    </nav>



    {/* change password modal */}

    <div className="modal fade" id="changePasswordModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">change password</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="oldpassword" className="form-label">Old Password</label>
              <input type="text" className="form-control" id="oldpassword" placeholder="Enter your old password" value={changePassworddata.oldpassword} onChange={(e)=> setChangePasswordData(prev => ({...prev , oldpassword:e.target.value}))}></input>
            </div>
            <div className="mb-3">
              <label htmlFor="newpassword" className="form-label">New Password</label>
              <input type="text" className="form-control" id="newpassword" placeholder="Enter New password" value={changePassworddata.newpassword}
              onChange={(e)=> setChangePasswordData(prev => ({...prev , newpassword:e.target.value}))}></input>
            </div>
            <div className="mb-3">
              <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
              <input type="text" className="form-control" id="confirmpassword" placeholder="Confirm Password" value={changePassworddata.confirmpassword} onChange={(e)=> setChangePasswordData(prev => ({...prev , confirmpassword:e.target.value}))}></input>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary" onClick={changePassword}>Save changes</button>
          </div>
        </div>
      </div>
    </div>


  </>
  );
}

export default Navbar;
