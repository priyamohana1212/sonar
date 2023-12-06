import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Header=({isLoggedIn})=>{
    const logout=e=>{
        dispatch({type:'LogOut'})
        sessionStorage.clear();
        history.push("/");
    }
    const { Fragment } = require("react");
    const state=useSelector((state)=>state);
    const history=useHistory()
    const dispatch=useDispatch()
    console.log("Header ",state.loggedin.Username)
    console.log(sessionStorage.getItem("role"),isLoggedIn)
    return (
        <Fragment>
          <div className="clearfix"></div>
            <nav className="navbar navbar-expand-lg position-sticky mb-0" style={{top:0,zIndex:"1000", backgroundColor:'#382c09'}}>
              <a className="navbar-brand" to="/" style={{color:'#fff', cursor:'pointer',fontSize:'25px',fontWeight:'700',textTransform:'uppercase'}}>Beyond Fashion</a>
                <div class="search-box">
                  <button class="btn-search"><FaSearch /></button>
                  <input type="text" class="input-search" placeholder="Search for products.."/>
                </div>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-link" style={{color:'#fff'}}>Download App : mytag
                    </li>
                    <div className="pipeline"></div>
                    <li className="nav-link" style={{color:'#fff'}}>Become a Seller</li>
                    <div className="pipeline"></div>
                    <li className="nav-item active">
                      <div className="nav-link login-user" style={{color:'#fff'}}>Welcome ! <span style={{fontWeight:'600', textTransform:'uppercase'}}>{state.loggedin.Username}</span></div>
                    </li>
                  </ul>                
                </div>
            </nav>

        </Fragment>
    )
}

export default Header;
