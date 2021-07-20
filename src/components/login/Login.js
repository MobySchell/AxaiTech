/*
PURPOSE OF THIS PAGE:
this code is for the login page on the website and handles the login of all users
 */

import React, { Component } from 'react'
import './styles.css';
import Firebase from '../../firebase/firebase';
import ShowIf from '../ShowIf';
const auth = Firebase.instance().auth;

export default class Login extends Component {
    constructor(props){
        super(props);

        if (this.props.user){
            this.props.history.push('/');
        }
              
        this.state= {
            email: '',
            password: '',
            error: '',
        }
    }
            
    onEmailChanged(e){
        this.setState({
            email: e.target.value,
        });
        }
            
    onPasswordChanged(e){
        this.setState({
            password: e.target.value
        });
    }
    
            
    async login(e){
        e.preventDefault();
            
        try{
            const {email, password } = this.state;
            await auth.signInWithEmailAndPassword(email,password);
            this.props.history.push('/doctor-portal');

        }catch(err){
            this.setState({ error: err.message });
        }
            
    }

    render() {
        const {error} = this.state;
        return (
            <div className='container col-7 mt-2'>
                <div className="p-5"></div>
                <div className='card card-body text-center'>
                    <form onSubmit={(e)=> this.login(e)}>
                        <h1 className='h3 mt-3 text-center'>Profile Login</h1>
                        <div className='p-3 body'>
                            <input value={this.state.email} 
                            onChange={(e)=> this.onEmailChanged(e)}
                            type='email' className='form-control '
                            placeholder='Email Address'/>
                        </div>
                        <div className="p-3 body">
                            <input value ={this.state.password}
                            onChange={(e)=> this.onPasswordChanged(e)}
                            type='password' className='form-control'
                            placeholder='Password'/>
                        </div>
                        <ShowIf isTrue={error}>
                            <div className="alert alert-danger mt-4">
                                {error}
                            </div>
                        </ShowIf>
                        <div className='text-center mt-4'>
                        <button className ='btn btn-primary px-5 body' type='submit'>
                            Login
                        </button>
                        </div> 
                    </form>
                </div>
                
                <div className="p-5"></div>
            </div>
        )
    }
}
