import React, { Component } from 'react'
import Axios from 'axios';
import { baseurl, img_base } from '../../../../Configs/baseUrls';

class ArticalDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            
            title: '',
            image: '',
            body: '',
            id:this.props.match.params.id,
            loading:false
        }
    }
    
    
    async componentDidMount(){
        const articals_id = this.props.match.params.id;
        // console.log(term_and_condition_id);
      const res = await axios.get(`/api/show_articals/${articals_id}`);
      console.log(res.data.posts.title);
      if(res.data.status === 200)
      {
          this.setState({
            title:res.data.posts.title,
            image:res.data.posts.image,
            body:res.data.posts.body,
          });
      }
    }

      title(value){
        
        this.setState({
            title:value
        })
    }
    body(value){
        
        this.setState({
            body:value
        })
    }
    image(value){
        
        this.setState({
            image:value
        })
    }
    render() {
        return (
            <div>
                <section className="image-header">
                    <div className="container">
                    </div>
                </section>
                <div className="content">
                    <div className="container">
                        <div className="row row-offcanvas row-offcanvas-left">
                            <section className="news-single col-xs-12 col-sm-12 col-md-9">
                            <p className="hidden-md hidden-lg">
                                <button type="button" className="btn sidebar-btn" data-toggle="offcanvas" title="Toggle sidebar">sidebar</button>
                            </p>
                            <div className="item">
                                            <div className="row no-gutters row-eq-height">
                                                <div className="col-md-12">
                                                <a href={`/artical-detail`} className="article-wprapper">
                                                    <img src={img_base+this.state.image} value="image"alt="news-img" />
                                                    <div className="news-border">
                                                    <div className="left-news">
                                                        <span>News</span>
                                                    </div>
                                                    <div className="right-news">
                                                        <i className="fa fa-commenting" aria-hidden="true" />
                                                        <span>200</span>
                                                    </div>
                                                    <div className="artcle-text">
                                                        <span className="date" value="title" onChange="">{this.state.title}</span>
                                                        <span className="name" dangerouslySetInnerHTML={{__html:this.state.body}} value="body"></span>
                                                    </div>
                                                    </div>
                                                </a>
                                                </div>
                                            </div>                           
                                </div>
                            
                            </section>
                            <section className="sidebar col-xs-6 col-sm-6 col-md-3 sidebar-offcanvas" id="sidebar">
                                <div className="recent-news">
                                    <h6>More Articles</h6>
                                    <div className="item">
                                    <div className="date"><a href="news-single.html">25 Sep 2016</a> in <a href="news-single.html">highlights</a></div>
                                    <a href="news-single.html" className="name">When somersaulting Sanchez shoulderd Mexico’s 
                                        <img src="/images/common/esport-team-landing-news-1.jpg" />
                                    </a>
                                    </div>
                                    <div className="item">
                                    <div className="date"><a href="news-single.html">25 Sep 2016</a> in <a href="news-single.html">highlights</a></div>
                                    <a href="news-single.html" className="name">When somersaulting Sanchez shoulderd Mexico’s 
                                        <img src="/images/common/sport-championship-news-1.jpg" /></a>
                                    </div>
                                    <div className="item">
                                    <div className="date"><a href="news-single.html">25 Sep 2016</a> in <a href="news-single.html">highlights</a></div>
                                    <a href="news-single.html" className="name">When somersaulting Sanchez shoulderd Mexico’s 
                                        <img src="/images/common/esport-team-landing-news-2.jpg" /></a>
                                    </div>
                                </div>
                            </section>	
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ArticalDetail;
