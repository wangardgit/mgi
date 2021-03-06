import React, { Component } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';


class Enrollmentform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prizez: '',
            fields: [],
            ansFields: [],
            team_id: '',
            teams_id: '',
            id:'',
            type:'team',
            

        }
        if(!this.props.user.is_login){
            this.props.history.push('/login');
        }
    }

    componentDidMount(){

        Axios.post('/api/get_user_id',{user_id:this.props.user.data.id}).then(res=>{  
            if(res.data.status == 200) {
                // console.log(res);
                this.setState({
                    user_id: res.data.team.user_id,
                    teams_id: res.data.team.id

                })
            }       
           
        })
        Axios.post('/api/get_team_id',{id:this.props.match.params.id}).then(res=>{  
            // console.log(res.data.team.team_id);
            if(res.data.status == 200) {
                this.setState({
                    // user_id: res.data.team.user_id,
                    team_id:res.data.team.team_id

                })
            }       
           
        })

        // Axios.post('/api/get-tournament-by-id',{id:this.props.match.params.id}).then(res=>{
        //     // console.log(res);
        //     this.setState({
        //         prizez: res.data.tournament.prizez,
        //         fields: res.data.tournament.tournament_field,
        //     })
        // })
    }

    onChangeTextAnswer(val,data){
        let ans = this.state.ansFields;
        let check = 0;
        ans.map(data_=>{
            if(data_.id == data.id){
                data_.answer = val
                check = 1;
            }
        })
        if(check == 0){
            let obj = {id:data.id,field:data,answer:val};
            ans.push(obj);
        }
        this.setState({
            ansFields:ans
        })
        // console.log(this.state.ansFields)
    }

    createEnrollment(e) {
            e.preventDefault();
            let senderData = {
                ansFields: this.state.ansFields,
                team_id: this.state.teams_id,
                tournament_id: this.props.match.params.id,
                type:'team'
            }
            Axios.post('/api/create_teamenrollment',senderData).then(res=>{
                console.log(res);
                    if(res.data.status == 200){
                        Swal.fire({
                            icon: 'success',
                            title: res.data.msg,
                            showConfirmButton: false,
                            timer: 1500
                            })
                            window.open(`/tournamentDetail/${this.props.match.params.id}`, '_self')
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

    render() {
        return (
            <div>
                <section className="image-header">
                </section>
                <section className="subscption-head">
                    <div className="container-plan">
                    <div className="row">
                        <div className="customer-info">
                        <div className="subscption-sec2">
                            <div className="content">
                            <div className="container">
                                <div className="row row-offcanvas row-offcanvas-left">
                                <div className="col-md-12 pr-detail">
                                    <h4>Team Enrollment</h4>
                                </div>
                                <div className="col-md-12 col-sm-12">
                                    <section className="css-g0mr221 css-19m9brh">
                                    <div className=" row">
                                        <div className="css-g0mr224  col-md-6">
                                        <p className="css-g0mr223 css-wjd590 trt-fee">Balance</p>
                                        <p className="css-g0mr223 css-wjd590 trt-fee">Tournamnet Fee</p>
                                        </div>
                                        <div className="css-g0mr224 col-md-6">
                                        <p className="css-g0mr226 css-1o2xxxc trt-amount">$200</p>
                                        <p className="css-g0mr226 css-1o2xxxc trt-amount" dangerouslySetInnerHTML={{__html:this.state.prizez}}></p><br></br>
                                        </div>
                                    </div>
                                    </section>
                                </div>
                                <div className="col-md-12 pr-detail">
                                <a className="css-1khann70 css-1khann71 css-g0mr225 css-zj48px" onClick={this.createEnrollment.bind(this)}>Enroll</a>
                                </div>
                                  
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </section>
            </div>

        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return{
       changeUser:(user)=>{
           dispatch({
               type:'CHANGE_USER',payload:user
            })
        }
    }
}
const mapStateToProps = (state) => {
    return{
        user:state.user
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (Enrollmentform);
