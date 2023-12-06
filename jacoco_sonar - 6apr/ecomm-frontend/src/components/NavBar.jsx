import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import RoleNavbar from "./RoleNavbar";
import LoginRegisterMenu from "./LoginRegisterMenu"

const { Fragment } = require("react");

function NavBar(){
    const state=useSelector((state)=>state);
    console.log("LoggedIn ",state.loggedin)
    console.log("Cart ",state.cart) 
    return (
        <Fragment>
          <div className="clearfix"></div>
            <nav className="navbar navbar-expand-lg category position-sticky mb-0" style={{zIndex:"1000", backgroundColor:'#fff', border: '1px solid #ccc'}}>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                  <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/" style={{color:'#fff'}}>Home</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{color:'#fff'}}>
                        Men
                        </Link>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <Link className="dropdown-item" to="/cat/Men/Ethnic Clothing">Ethnic Clothing</Link>
                        <Link className="dropdown-item" to="/cat/Men/Modern Clothing">Modern Clothing</Link>                        
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{color:'#fff'}}>
                        Women
                        </Link>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <Link className="dropdown-item" to="/cat/Women/Ethnic Clothing">Ethnic Clothing</Link>
                        <Link className="dropdown-item" to="/cat/Women/Modern Clothing">Modern Clothing</Link>                        
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{color:'#fff'}}>
                        Kids
                        </Link>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <Link className="dropdown-item" to="/cat/Kids/Above 10">Above 10</Link>
                        <Link className="dropdown-item" to="/cat/Kids/Below 10">Below 10</Link>                        
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{color:'#fff'}}>
                        Toddler
                        </Link>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <Link className="dropdown-item" to="/cat/Toddler/Above 1">Above 1</Link>
                        <Link className="dropdown-item" to="/cat/Toddler/Below 1">Below 1</Link>                        
                        </div>
                    </li>
                    <RoleNavbar isLoggedIn={state.loggedin.IsLoggedIn} />   
                  </ul>            
                </div>
            </nav>
        </Fragment>
    )
}

export default NavBar;
