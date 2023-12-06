import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_API_URL } from "../environment";

function AllSellers(){
    const [sellers,setSellers]=useState([])
    useEffect(()=>{
        axios.get(BASE_API_URL+"/api/sellers")
        .then(resp=>{
            //console.log(resp.data.data)
            setSellers(resp.data.data)
            console.log(sellers)
        })
    },[])

    const deleteSeller=(id)=>{
        let response=window.confirm('Are you sure to delete this supplier ?');
        if(response){
           console.log(id);
           axios.delete(BASE_API_URL+"/api/admin/deleteSeller/"+id)
           .then(resp=>{
                if(resp.data.data === 'PRODUCT FOUND') {
                    alert("We cannot delete the seller, Because products are exist")
                } else {
                    axios.get(BASE_API_URL+"/api/sellers")
                    .then(resp=>{
                        //console.log(resp.data.data)
                        setSellers(resp.data.data)            
                    })
                }
                
           })
        }
    }
    
    return (
        <div className="container-fluid text-white">
            <h4 className="p-2 text-center">All Sellers</h4>
            <table className="table table-bordered table-striped table-light table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>City</th>
                        <th>Phone</th>
                        <th>User Id</th>
                        <th>Password</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {sellers.map(x=>(
                    <tr key={x.id}>
                        <td>{x.id}</td>
                        <td>{x.name}</td>
                        <td>{x.city}</td>
                        <td>{x.phone}</td>
                        <td>{x.userid}</td>
                        <td>{x.pwd}</td>
                        {/* <td><button onClick={(e)=>editSeller(x.id)} className="btn btn-primary btn-sm">EDIT</button></td> */}
                        <td><button onClick={(e)=>deleteSeller(x.id)} className="btn btn-danger btn-sm">Delete</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default AllSellers;