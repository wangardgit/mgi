import React, { Component , useState } from 'react';
import Axios from 'axios';
import { baseurl, img_base } from '../../../../Configs/baseUrls';

class List extends Component {
    constructor(props){
        super(props);
        this.state = {
            articals: [],
            visiable: 2,
        }
        this.loadmore = this.loadmore.bind(this);
    }
   
    componentDidMount(){
        Axios.post('/api/get_articals').then(res=>{
            console.log(res.data.data);
            this.setState({
                articals:res.data.data
            })
        })
      }
      loadmore(){
          this.setstate((old)=>{
              return {visiable:old.visiable+2}

          })
      }
      
    render() {
        return (
            <div>
                <section class="image-header">
                    <div class="container">
                        
                    </div>
                </section>
                <div id="news" className="esport-landing-big-section">
                    {/*ESPORT TEAM LANDING NEWS BEGIN*/} 
                    <div className="esport-team-landing-news">
                        <div className="container">
                        <div className="row">
                            <div className="col-md-5 col-sm-6">
                            <h5>Most Popular<br /> <span>Articles</span></h5>
                            </div>
                            <div className="col-md-7 col-sm-6">
                            </div>
                        </div>
                        <div className="row row-eq-height">
                            <div className="col-md-12">
                            {
                            this.state.articals.slice(0,this.state.visiable).map((data,index)=>{
                                    return(
                                        <div className="row no-gutters row-eq-height">
                                            <div className="col-md-12">
                                            <a href={`/artical-detail/${data.id}`} className="article-wprapper">
                                                <img src={img_base+data.image} alt="news-img" />
                                                <div className="news-border">
                                                <div className="left-news">
                                                    <span>News</span>
                                                </div>
                                                <div className="right-news">
                                                    <i className="fa fa-commenting" aria-hidden="true" />
                                                    <span>200</span>
                                                </div>
                                                <div className="artcle-text">
                                                    <span className="date">{data.title}</span>
                                                    {/* <span className="name" dangerouslySetInnerHTML={{__html:data.body}}></span> */}
                                                </div>
                                                </div>
                                            </a>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            </div>
                        </div> 
                        <div className="row">
                            <div className="col-md-3 ">
                            <a href="#" className="btn-more" onClick={this.loadmore}>
                                See More
                            </a>
                            </div>
                            <div className="col-md-9" />
                        </div>
                        </div>
                    </div>
            </div>

            </div>
        )
    }
}

export default List;
