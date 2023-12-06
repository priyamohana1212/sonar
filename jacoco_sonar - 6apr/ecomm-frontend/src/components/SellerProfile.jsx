import axios from "axios"
import { useEffect, useState } from "react"
import { BASE_API_URL } from "../environment"

function SellerProfile(){
    const id=sessionStorage.getItem("id")
    const [user,setUser]=useState({
        "id":sessionStorage.getItem("id"),
        "name":"",
        "city":"",
        "userid":"",
        "pwd":"",
        "phone":""
    })

    useEffect(()=>{
        axios.get(BASE_API_URL+"/api/sellers/"+id)
        .then(resp=>{
            console.log(resp.data.data)
            setUser(resp.data.data)
        })
    },[])
    return (
        
        <div className="container">
            <div className="card shadow m-3 p-2 bg-transparent text-white text-center">
                <h4 className="p-2 label_color" style={{borderBottom:"2px solid green",width:"300px",margin:"auto"}}>Seller Profile Page</h4>
                <br/>
                <h4 className="label_color" style={{color:'black !important'}}>Welcome {user.name}</h4>
                <h5 className="label_color">City : {user.city}</h5>
                <h5 className="label_color">User Id : {user.userid}</h5>
                <h5 className="label_color">Contact No : {user.phone}</h5>
            </div>
        </div>
    )
}

export default SellerProfile;
