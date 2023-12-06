import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import LoginRegisterMenu from "./LoginRegisterMenu"

const RoleNavbar=({isLoggedIn})=>{
    const logout=e=>{
        dispatch({type:'LogOut'})
        sessionStorage.clear();
        history.push("/");
    }
    const state=useSelector((state)=>state);
    const history=useHistory()
    const dispatch=useDispatch()
    console.log(sessionStorage.getItem("role"),isLoggedIn)
    if(!isLoggedIn) {
         return (
        <LoginRegisterMenu/>
        )
    }
    else if(sessionStorage.getItem("role")==="customer"){
    return (
        <ul className="navbar-nav ml-auto">
        <li className="nav-item active">
            <Link className="nav-link" to="/cart" style={{color:'#fff'}}>View Cart {state.cart.length===0 ? '' : 
            <span className="badge badge-primary p-2">{state.cart.map(x=>x.qty).reduce((a,b)=>parseInt(a)+parseInt(b))}</span>}</Link>
        </li>
        <li className="nav-item active">
            <Link className="nav-link" to="/cprofile" style={{color:'#fff'}}>Profile</Link>
        </li>
        <li className="nav-item active">
            <Link className="nav-link" to="/myorders" style={{color:'#fff'}}>My Orders</Link>
        </li>
        <li className="nav-item active">     
           <Link className="nav-link" onClick={logout} to="#" style={{color:'#fff'}}>Logout</Link>
        </li>
        </ul>
    )
    }
    else if(sessionStorage.getItem("role")==="seller"){
        return (
            <ul className="navbar-nav ml-auto"> 
            <li className="nav-item active">
                <Link className="nav-link" to="/sprofile" style={{color:'#fff'}}>Profile</Link>
            </li>
            <li className="nav-item active">
                <Link className="nav-link" to="/add-product" style={{color:'#fff'}}>Add Product</Link>
            </li>
            <li className="nav-item active">
                <Link className="nav-link" to="/myproducts" style={{color:'#fff'}}>Products</Link>
            </li>  
            <li className="nav-item active">     
                <Link className="nav-link" onClick={logout} to="#" style={{color:'#fff'}}>Logout</Link>
            </li>               
            </ul>
        )
    }
    return (
        <ul className="navbar-nav ml-auto">             
        <li className="nav-item active">
            <Link className="nav-link" to="/aprofile" style={{color:'#fff'}}>Profile</Link>
        </li>
        <li className="nav-item active">
            <Link className="nav-link" to="/sellers" style={{color:'#fff'}}>Sellers</Link>
        </li>
        <li className="nav-item active">
            <Link className="nav-link" to="/customers" style={{color:'#fff'}}>Customers</Link>
        </li>
        <li className="nav-item active">
            <Link className="nav-link" to="/orders" style={{color:'#fff'}}>Orders</Link>
        </li>
        <li className="nav-item active">     
           <Link className="nav-link" onClick={logout} to="#" style={{color:'#fff'}}>Logout</Link>
        </li>    
        </ul>
    )

}



export default RoleNavbar;