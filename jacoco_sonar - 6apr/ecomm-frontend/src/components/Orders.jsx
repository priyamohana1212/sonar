import axios from "axios";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { BASE_API_URL } from "../environment";

function Orders(){
    const [orders,setOrders]=useState([])
    const [show,setShow]=useState(false)
    const [details,setDetails]=useState([])

    useEffect(()=>{
        axios.get(BASE_API_URL+"/api/orders")
        .then(resp=>{
            console.log(resp.data)
            setOrders(resp.data.data)
        })
    },[]);

    const showDetails=(orderid)=>{
        axios.get(BASE_API_URL+"/api/orders/"+orderid)
        .then(resp=>{
            console.log(resp.data)
            setDetails(resp.data.data.details)
        })
        setShow(true)
    }
    const deleteOrders=(id)=>{
        let response=window.confirm('Are you sure to delete this order ?');
        if(response){
           console.log(id);
           axios.delete(BASE_API_URL+"/api/admin/deleteOrder/"+id)
           .then(resp=>{
                axios.get(BASE_API_URL+"/api/orders")
                .then(resp=>{
                    //console.log(resp.data.data)
                    setOrders(resp.data.data)            
                })
           })
        }
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-5">
                <h4 className="p-2 text-center label_color">Purchased Orders</h4>
                <table className="table table-bordered table-sm table-light table-hover table-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Order Date</th>
                            <th>Amount</th>
                            <th>Customer</th>
                            <th>Action</th>                       
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(x=>(
                            <tr key={x.orderid}>
                                <td>{x.orderid}</td>
                                <td><Moment format="ddd, DD-MMM-YYYY">{x.orderDate}</Moment></td>
                                <td>&#8377; {x.payment.amount}</td>
                                <td>{x.customer.name}</td>
                                <td><button onClick={e=>showDetails(x.orderid)} className="btn btn-primary btn-sm mr-3">Show Details</button>
                                <button onClick={(e)=>deleteOrders(x.orderid)} className="btn btn-danger btn-sm ml-0">Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>  
                </div>
                <div className="col-sm-5">
                    {show ? <>
                    <h4 className="p-2 label_color">Order Details</h4>
                    <table className="table table-bordered table-light table-hover table-striped table-sm">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Qty</th>
                            </tr>
                        </thead>
                        <tbody>
                            {details.map(x => (
                                <tr key={x.product.prodid}>
                                    <td>{x.product.prodid}</td>
                                    <td><img className="mr-2 float-left" src={x.product.photo} width="100" />
                                    {x.product.pname}<br/>
                                    {x.product.cat}
                                    </td>
                                    <td>{x.product.price}</td>
                                    <td>{x.qty}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </> : ''}
                </div>
            </div>                
                              
        </div>                    
    )
}

export default Orders;