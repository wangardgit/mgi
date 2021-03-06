import React, { Component } from 'react'
import {connect} from 'react-redux';
import Axios from 'axios';
import Swal from 'sweetalert2';
import {img_base} from '../../../Configs/baseUrls';

class TeamDeatil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            type: '',
            image: '',
            user_id:'',
            id:'',
            userList: [],
            team_user:[],
            team_name: ''
        }
    }

    componentDidMount() {
        Axios.post('/api/team-detail',{id:this.props.match.params.id}).then(res=>{
            // console.log(res);
            this.setState({
                title: res.data.team_detail.title,
                type: res.data.team_detail.type,
                image: res.data.team_detail.image,
                userList: res.data.team_detail.team_user,
                user_id: res.data.team_detail.user_id
            })
        })

        Axios.post('/api/get_user_team',{user_id:this.props.user.data.id}).then(res=>{ 
            // console.log(res); 
            if(res.data.status == 200) {
                this.setState({
                    team_name: res.data.team.team.title,
                })
            }       
           
        })
        Axios.post('/api/get_user_id',{user_id:this.props.user.data.id}).then(res=>{  
            if(res.data.status == 200) {
                this.setState({
                    user_id: res.data.team.team.user_id,
                })
            }       
           
        })
    }
    joinTeam(e) {
        e.preventDefault();
        let senddata = {
            user_id: this.props.user.data.id,
            team_id: this.props.match.params.id
        }
        Axios.post('/api/join-team-request',senddata).then(res=>{
            console.log(res);
            if(res.data.status == 200){
                Swal.fire({
                    icon: 'success',
                    title: res.data.msg,
                    showConfirmButton: false,
                    timer: 1500
                    })
                    window.location.reload();
            }else{
                Swal.fire({
                    icon: 'warning',
                    title: res.data.msg,
                    showConfirmButton: false,
                    timer: 1500
                    })
            }
        })
    }
    leaveteam(id){
        let senderdata={
          id:id
        }
        Axios.post('/api/leave_team',senderdata).then(res=>{
           window.location.reload();
        });
       }
       kickout(id){  
        let senderdata={
          id:id,
          team_id: this.props.match.params.id
        }
        Axios.post('/api/kickout',senderdata).then(res=>{
            window.location.reload();
        });
       }
    render() {
        return (

                <div>
                    <section className="image-header">
                    </section>
                    <section className="login-sec">
                        <div className="container">
                        <div className="row">
                            <div className="customer-info">
                            <div className="col-md-12">
                                <h4>Team Detail</h4>
                                <section className="player-single-wrap">
                                <div className="row">
                                    <div className="col-md-8">
                                    
                                    </div>
                                    <div className="col-md-4">
                                      {
                                         this.props.user.data.id != this.state.user_id ?
                                          <>
                                            {
                                              this.state.team_name ?
                                                <div className="join-team-btn">
                                                   <a className="pointer" onClick={this.leaveteam.bind(this,this.props.user.data.id)}>Leave Team</a>
                                                </div>
                                              :
                                                <div className="join-team-btn">
                                                   <a className="pointer" onClick={this.joinTeam.bind(this)}>Join Team</a>
                                                </div>
                                             }
                                            </> : null
                                        }                                
                                    </div>
                                    <div className="col-md-3">
                                    <div className="player-photo">
                                        <img className="img-responsive" src={img_base+this.state.image} alt="player" />
                                    </div>
                                    </div>
                                    <div className="col-md-9">
                                    <div className="player-info">
                                        <h6 className="player-info-title">summary</h6>	
                                        <div className="summary">
                                        <div className="row">
                                            <div className="col-md-3 col-sm-3 col-xs-3">
                                                <div className="item">Title:</div>
                                            </div>
                                            <div className="col-md-9 col-sm-9 col-xs-9">
                                                <div className="item">{this.state.title}</div>
                                            </div>
                                            <div className="col-md-3 col-sm-3 col-xs-3">
                                            <div className="item">Type:</div>
                                            </div>
                                            <div className="col-md-9 col-sm-9 col-xs-9">
                                                <div className="item">{this.state.type}</div>
                                            </div>
                                            <div className="col-md-3 col-sm-3 col-xs-3">
                                            <div className="item">Players:</div>
                                            </div>
                                            <div className="col-md-9 col-sm-9 col-xs-9">
                                                <div className="item">{this.state.userList.length}</div>
                                            </div>
                                        </div>
                                        </div>
                                        <h6 className="player-info-title">Team Players</h6>
                                        <div className="overflow-scroll">
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <th>Image</th>
                                                        <th>First Name</th>
                                                        <th>Last Name</th>
                                                        <th></th>
                                                    </tr>
                                                {
                                                    this.state.userList.map((data,index)=>{
                                                        return(
                                                            <tr key={index}>
                                                                <td>
                                                                    {
                                                                        data.user.image ?
                                                                        <img src={img_base+data.user.image} width={40} height={40}  />
                                                                        :
                                                                        <img src="/images/common/stuff-person.jpg" width={40} height={40} />
                                                                    }
                                                                </td>
                                                                <td><a href={`/user-profile/${data.user.id}`}>{data.user.first_name}</a></td>
                                                                <td>{data.user.last_name}</td>
                                                                <td>
                                                                   {
                                                                        this.props.user.data.id === this.state.user_id ?
                                                                        <>
                                                                        {
                                                                            this.props.user.data.id != data.user.id ?
                                                                            // <button className="" onClick={this.kickout.bind(this,data.user.id,index)}> <i    className="fas fa-kickout"></i></button>
                                                                            <button  className="" onClick={this.kickout.bind(this,data.user.id,index)}>KickOut</button>
                                                                            :  null
                                                                        }
                                                                       </>
                                                                        :
                                                                        null
                                                                        }
                                                                   </td> 
                                                            </tr>
                                                        )
                                                    })
                                                } 
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                             </section>                    
                            </div>
                            </div>
                        </div>
                        </div>
                </section>
            </div>

        )
    }
}

const mapStateToProps=(state)=>{
    return{
        user:state.user
    }
}

export default connect(mapStateToProps,null) (TeamDeatil);
