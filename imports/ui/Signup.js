/**
 * Created by surajvangoori1 on 6/23/17.
 */
import React from 'react';
import {Link} from 'react-router';
import {Accounts} from 'meteor/accounts-base';

export default class Signup extends React.Component{
    constructor(props){
        super(props);
        this.state={
            error:''
        };
    }

    onSubmit(e) {
        e.preventDefault();

        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();

        if (password.length<9){
            return this.setState({error:'Password must be atleast 9 characters'})
        }
        Accounts.createUser({email, password}, (err) => {
            //console.log('Signup callback', err);
            if(err){
                this.setState({error:err.reason})
            }else{
                this.setState({error:''})
            }
        });
    }

    render(){
        return(
            <div className="boxed-view">
               <div className="boxed-view__box">
                {this.state.error? <p>{this.state.error}</p>:undefined}
                <h1>Join Short Link</h1>
                <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
                    <input type="email" ref="email" name="email" placeholder="Email"/>
                    <input type="password" ref="password" name="password" placeholder="Password"/>
                    <button className="button">Create Account</button>
                </form>
                <Link to="/">
                    Have an account?
                </Link>
               </div>
            </div>
        );

    }
}