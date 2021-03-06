import Axios from 'axios';
import React, { Component } from 'react';
import {img_base} from '../../Configs/baseUrls';
import Swal from 'sweetalert2'

class Addproduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            varients: [],
            categories:[],
            sub_categories:[],
            all_subcategories:[],
            cat_id:'',
            sub_cat_id:0,
            imageArray:[],
            p_code:'',
            p_name:'',
            p_description:'',
            p_varient_type:'',
            p_quantity_type:'',
            p_enabled:true,
            p_featued:false,
            p_retail:true,
            p_distribution:true,
            out_of_stock:false,
            des_image_array:[],
            des_image:'',
            short_p_description:'',
            error_string:'',
            loading:false
        }
    }
    p_code(e){
        this.setState({
            p_code:e.target.value
        })
    }
    p_name(e){
        this.setState({
            p_name:e.target.value
        })
    }
    p_description(e){
        this.setState({
            p_description:e.target.value
        })
    }
    p_varient_type(e){
        this.setState({
            p_varient_type:e.target.value
        })
    }
    p_quantity_type(e){
        this.setState({
            p_quantity_type:e.target.value
        })
    }
    p_enabled(e){
        this.setState({
            p_enabled:!this.state.p_enabled
        })
    }
    p_featued(e){
        this.setState({
            p_featued:!this.state.p_featued
        })
    }
    p_retail(e){
        this.setState({
            p_retail:!this.state.p_retail
        })
    }
    out_of_stock(e){
        this.setState({
            out_of_stock:!this.state.out_of_stock
        })
    }
    short_p_description(e){
        this.setState({
            short_p_description:e.target.value
        })
    }
    p_distribution(e){
        this.setState({
            p_distribution:e.target.value
        })
    }
    componentDidMount(){
        let senderdata = {

        }
        // Axios.post('/api/get_allcategories',senderdata).then(res=>{
        //     this.setState({
        //         categories:res.data
        //     })
        // })
        // Axios.post('/api/get_Subcategory',senderdata).then(res=>{
        //     this.setState({
        //         all_subcategories:res.data
        //     })
        // })
    }
    //creating new varient
    add_varient() {
        let temp_arr = this.state.varients;
        temp_arr.push({ type: '', varient: '', price: 0 })
        this.setState({
            varients: temp_arr
        })
    }
    DeleteVarient(ind){
        let temp_arr = this.state.varients;
        temp_arr.map((data,index)=>{
            if(index == ind){
                temp_arr.splice(index,1)
            }
        })

        this.setState({
            varients:temp_arr
        })
    }
    cat_id(e){
        this.setState({
            cat_id:e.target.value
        })
    }
    sub_cat_id(e){
        this.setState({
            sub_cat_id:e.target.value
        })
    }
    handleFileChange(e){
        if (e.target.files) {
            const files = Array.from(e.target.files);

            const promises = files.map(file => {
                return (new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.addEventListener('load', (ev) => {
                        resolve(ev.target.result);
                    });
                    reader.addEventListener('error', reject);
                    reader.readAsDataURL(file);
                }))
            });
            let img_arr = [];
            Promise.all(promises).then(images => {
                img_arr.push(images);
                this.setState({
                    imageArray: img_arr
                })
            }, error => { console.error(error); });
           
        }
        
    }

    handleSubmit(e) {
        e.preventDefault();
        
        let senderdata = {
            product_code:this.state.p_code,
            product_name: this.state.p_name,
            product_varient_type: this.state.p_varient_type,
            product_quantity_type: this.state.p_quantity_type,
            p_enabled:this.state.p_enabled,
            out_of_stock:this.state.out_of_stock,
            varients:this.state.varients,
            image:this.state.imageArray,
            short_product_description:this.state.short_p_description
        }
        this.setState({
            loading:true
        })
        Axios.post('/api/add_product', senderdata)
            .then(res => {
                this.setState({
                    loading:false
                })
            if(res.data.status == 200){
                Swal.fire({
                    icon: 'success',
                    title: res.data.msg,
                    showConfirmButton: false,
                    timer: 1500
                    })
                this.props.history.push('products-list'); 
            
                }else{
                   this.setState({
                       error_string:res.data.msg
                   })
                }
                
        });   
        
    }
    onchangevarient(val,ind){
        let temp_arr = this.state.varients;
        temp_arr.map((data,index)=>{
            if(index == ind){
                data.varient = val
            }
        })

        this.setState({
            varients:temp_arr
        })
    }
    onchangeprice(val,ind){
        let temp_arr = this.state.varients;
        temp_arr.map((data,index)=>{
            if(index == ind){
                data.price = val
            }
        })

        this.setState({
            varients:temp_arr
        })
    }
    render() {
        return (
            <div id="addproducts" className="container" >
                <div className="top_section_title_div">
                    <h2 className="section_title">Add New Product</h2>
                </div>
                <div className="container">
                    <div className="card content_card_div mt-4 mb-5">
                        <div className="row col-md-12">
                            <div class="form-group input_div col-md-6">
                                <label className="input_label" for="exampleInputEmail1">Product code</label>
                                <input onChange={this.p_code.bind(this)} type="email" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp"  />
                            </div>
                            <div class="form-group input_div col-md-6">
                                <label className="input_label" for="exampleInputEmail1">Product Name</label>
                                <input onChange={this.p_name.bind(this)}  type="email" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp"  />
                            </div>


                        </div>

                        <div className="row col-md-12">
                            <div class="form-group input_div   col-md-6">
                                <label className="input_label" for="exampleInputEmail1">Short Product Description</label>
                                <textarea onChange={this.short_p_description.bind(this)}  type="email" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp"  />
                            </div>
                            
                            <div class="form-group input_div col-md-6">
                                <label className="input_label" for="exampleInputEmail1">Variant Type</label>
                                <select onChange={this.p_varient_type.bind(this)}  class="form-control " id="exampleInputEmail1"   >
                                    <option value="">Choose..</option>
                                    <option value="size">size</option>
                                    <option value="color">color</option>
                                    <option value="Weight">Weight</option>
                                </select>
                            </div>
                            <div class="form-group input_div   col-md-6">
                                <label className="input_label" for="exampleInputEmail1">Quantity type</label>
                                <select onChange={this.p_quantity_type.bind(this)}  type="email" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp"  >
                                    <option value="">Choose..</option>
                                    <option value="Piece">Piece</option>
                                    <option value="KG">KG</option>
                                    <option value="Pack">Pack</option>

                                </select>
                            </div>
                        </div>
                        <div className="row col-md-12">
                           

                            {/* <div class="form-group input_div col-md-4">
                                <label className="input_label" for="exampleInputEmail1">Category</label>
                                <select onChange={this.cat_id.bind(this)} type="email" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp"  >
                                    <option value="">Choose..</option>
                                    {
                                        this.state.categories.map((data,index)=>{
                                            return(
                                            <option key={index} value={data.id}>{data.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div> */}
                            {/* <div class="form-group input_div col-md-4">
                                <label className="input_label" for="exampleInputEmail1">Sub Category</label>
                                    <select onChange={this.sub_cat_id.bind(this)} type="email" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp"  >
                                    <option value="">Choose..</option>
                                    {
                                        this.state.sub_categories.map((data,index)=>{
                                            return(
                                            <option key={index} value={data.id}>{data.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div> */}
                        </div>

                        <div className="form-group input_div col-md-4">
                            <label for="img" className="input_label" for="exampleInputEmail1">Product Thumbnail</label>
                            <input  id="img" aria-describedby="emailHelp" onChange={this.handleFileChange.bind(this)} type="file" accept=" image/*"></input>
                        </div>
                        <div className="card container-fluid col-md-12">
                            <div className="row">
                            {
                                this.state.imageArray.map((data,index)=>{
                                    return(
                                        <div className="card img_card">
                                            <img src={data}></img>
                                        </div>
                                    )
                                })
                            }
                            </div>
                          
                           </div>
                     
                        <div className="card container-fluid col-md-12">
                            <div className="row">
                            {
                                this.state.des_image_array.map((data,index)=>{
                                    return(
                                        <div key={index} className="card img_card">
                                            <img src={data}></img>
                                        </div>
                                    )
                                })
                            }
                            </div>
                          
                           </div>
                        <div className=" mt-3 card varient_card">
                            <div className="col-md-12 row">
                                <h4 className="col-md-8">Variants</h4>
                                <button onClick={this.add_varient.bind(this)} className="btn btn-info col-md-4" >Add Variant</button>
                            </div>
                            <div className="mt-3">
                                <table className="table table-stripped table-hover">
                                    <thead>
                                        <tr>
                                            {/* <th>Type</th> */}
                                            <th>variant</th>
                                            <th>Price</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>


                                        {
                                            this.state.varients.map((data, index) => {
                                                return (
                                                    <tr>
                                                        {/* <td><select className="form-control" value={data.type}>
                                                            <option value="">Choose..</option>
                                                            <option value="size">size</option>
                                                            <option value="color">color</option>

                                                            </select></td> */}
                                                        <td><input onChange={(e)=>{this.onchangevarient(e.target.value,index)}}  className="form-control" value={data.varient}></input></td>
                                                        <td><input type="number" onChange={(e)=>{this.onchangeprice(e.target.value,index)}} className="form-control" value={data.price}></input></td>
                                                        <td><button className="btn btn-light" onClick={this.DeleteVarient.bind(this,index)}> <i  style={{color:'red'}}  className="fas fa-trash-alt"></i>
                                                        </button></td>
                                                    </tr>
                                                )
                                            })
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className=" input_div col-md-5">
                            <div className="row">
                                <input onChange={this.p_enabled.bind(this)} checked={this.state.p_enabled}  type="checkbox" className="ml-3 mt-1"></input>
                                <h5 className="ml-2 input_label">Product Enabled</h5>
                            </div>
                            <p className="ml-3 ">Show Product on Website and Allow purchasing of product.</p>
                        </div>
                        <div className=" input_div col-md-5">
                            <div className="row">
                                <input onChange={this.out_of_stock.bind(this)} checked={this.state.out_of_stock}  type="checkbox" className="ml-3 mt-1"></input>
                                <h5 className="ml-2 input_label">Out of Stock?</h5>
                            </div>
                            {/* <p className="ml-3 ">Show Product on Website and Allow purchasing of product.</p> */}
                        </div>
                        {
                            this.state.error_string != ''?
                            <p className="text-danger  ml-3">{this.state.error_string}</p>
                            :null
                        }
                        <div className="submit_btn">
                            <button onClick={this.handleSubmit.bind(this)} style={{width:'150px'}} className="btn btn-success ml-3 mb-5">
                                {
                                    this.state.loading ?
                                    <div id="displayspinner" >
                                    <div className="spinner-border small_loader  ml-2 spinner_format"  role="status">
                                      <span className="sr-only">Loading...</span>
                                    </div>
                                  </div>
                                  :<>Add Product</>
                                }
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Addproduct;