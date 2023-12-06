import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import productvalidation from "./productvalidation";
import { BASE_API_URL } from "../environment";

function AddProduct() {
    const sellerid = sessionStorage.getItem("id")
    const [product, setProduct] = useState({
        "pname": "",
        "pcat": "",
        "price": "",
        "subcat": "",
        "brand": "",
        "sellerId": sellerid
    })
    const [errors, setErrors] = useState({})
    const [selectedPhoto, setSelectedPhoto] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    const history = useHistory()
    const [isKids, setKids] = useState(false);
    const [isToddler, setToddler] = useState(false);
    const [isMW, setMW] = useState(false);

    const handleInput = e => {
        if (e.target.value === 'Men' || e.target.value === 'Women') {
            setMW(true);
        } else {
            setMW(false);
        }
        if (e.target.value === 'Kids') {
            setKids(true);
        } else {
            setKids(false);
        }
        if (e.target.value === 'Toddler') {
            setToddler(true);
        } else {
            setToddler(false);
        }

        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    const handleFileInput = e => {
        setSelectedPhoto(e.target.files[0])
    }

    const handleSubmit = e => {
        e.preventDefault()
        setErrors(productvalidation(product))
        setSubmitted(true)
    }

    useEffect(() => {
        console.log(errors)
        let files = new FormData();
        var blobOverrides = new Blob(
            [JSON.stringify({
                pname: product.pname, pcat: product.pcat,
                price: product.price, brand: product.brand, subcat: product.subcat, sellerId: sellerid
            })],
            {
                type: 'application/json',
            },
        );
        if (Object.keys(errors).length === 0 && submitted) {
            const formData = new FormData()
            formData.append('files', selectedPhoto);
            formData.append("ProductDTO", blobOverrides)
            // formData.append("pname",product.pname)
            // formData.append("pcat",product.pcat)
            // formData.append("price",product.price)
            // formData.append("brand",product.brand)
            // formData.append("subcat",product.subcat)
            // formData.append("sellerId",sellerid)
            console.log(product)
            axios.post(BASE_API_URL + "/api/products/saveProduct", formData)
                .then(resp => {
                    if (resp.data.status === 'success') {
                        let result = resp.data.data;
                        console.log(result)
                        alert("Product saved successfully")
                        history.push("/myproducts")
                    } else {
                        alert("Error saving product")
                    }

                })
                .catch(error => {
                    console.log("Error", error);
                    alert("Error saving product")
                })
        }
    }, [errors])
    return (
        <div className="container py-2">
            <div className="card shadow bg-transparent text-white">
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-6 mx-auto">
                            <h4 className="text-center p-2">
                                Add Product Form
                            </h4>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group form-row">
                                    <label className="col-sm-4 form-control-label">Product Name</label>
                                    <div className="col-sm-8">
                                        <input type="text" name="pname" placeholder="Product Name" value={product.pname} onChange={handleInput} className="form-control" />
                                        {errors.pname && <small className="text-danger float-right">{errors.pname}</small>}
                                    </div>

                                </div>
                                <div className="form-group form-row">
                                    <label className="col-sm-4 form-control-label">Category</label>
                                    <div className="col-sm-8">
                                        <select name="pcat" value={product.pcat} onChange={handleInput} className="form-control">
                                            <option value="">Select Category</option>
                                            <option>Men</option>
                                            <option>Women</option>
                                            <option>Kids</option>
                                            <option>Toddler</option>
                                        </select>
                                        {errors.pcat && <small className="text-danger float-right">{errors.pcat}</small>}
                                    </div>
                                </div>
                                <div className="form-group form-row">
                                    <label className="col-sm-4 form-control-label">Sub Category</label>
                                    <div className="col-sm-8">
                                        {!isToddler && !isKids && <select name="subcat" value={product.subcat} onChange={handleInput} className="form-control">
                                            <option value="">Select Sub Category</option>
                                            <option>Ethnic Clothing</option>
                                            <option>Modern Clothing</option>
                                        </select>}
                                        {!isMW && !isToddler && isKids && <select name="subcat" value={product.subcat} onChange={handleInput} className="form-control" >
                                            <option value="">Select Sub Category</option>
                                            <option>Above 10</option>
                                            <option>Below 10</option>
                                        </select>}

                                        {!isMW && isToddler && !isKids && <select name="subcat" value={product.subcat} onChange={handleInput} className="form-control" >
                                            <option value="">Select Sub Category</option>
                                            <option>Above 1</option>
                                            <option>Below 1</option>
                                        </select>}
                                        {errors.subcat && <small className="text-danger float-right">{errors.subcat}</small>}
                                    </div>
                                </div>
                                <div className="form-group form-row">
                                    <label className="col-sm-4 form-control-label">Price</label>
                                    <div className="col-sm-8">
                                        <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleInput} className="form-control" />
                                        {errors.price && <small className="text-danger float-right">{errors.price}</small>}
                                    </div>
                                </div>
                                <div className="form-group form-row">
                                    <label className="col-sm-4 form-control-label">Brand</label>
                                    <div className="col-sm-8">
                                        <select name="brand" value={product.brand} onChange={handleInput} className="form-control">
                                            <option value="">Select Brand</option>
                                            <option>Siyarams</option>
                                            <option>Raymonds</option>
                                            <option>Wrangler</option>
                                            <option>Black Berry</option>
                                            <option>Louis Phillipe</option>
                                            <option>Peter England</option>
                                            <option>Oswal</option>
                                            <option>Zara</option>
                                            <option>Levis</option>
                                            <option>Pepe Jeans</option>
                                            <option>Pantaloons</option>
                                        </select>
                                        {errors.brand && <small className="text-danger float-right">{errors.brand}</small>}
                                    </div>
                                </div>

                                <div className="form-group form-row">
                                    <label className="col-sm-4 form-control-label">Photo</label>
                                    <div className="col-sm-8">
                                        <input type="file" required name="photo" value={product.photo} onChange={handleFileInput} className="form-control-file" />
                                    </div>
                                </div>

                                <button className="btn btn-primary float-right">Save Product</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProduct;
