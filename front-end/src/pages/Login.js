import { Container, textAlign } from '@mui/system';
import React, { Component } from 'react';

export default class Login extends Component {
  render() {
    return (
        <form>
            <div className="container-login" >

                <img src="https://img.graphicsurf.com/2020/09/people-in-pharmacy-vector-illustration.jpg" width={350}>
                </img>
                <h3>Drugstore POS</h3>
                
                <div className="input-name">
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        style={{
                            width: "250px",
                            height: "40px",
                        }}
                    />
                </div>
                
                <div className="input-password">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        style={{width: "250px"}}
                    />
                </div>

                <div className="Login-button">
                    <button type="submit" className="btn btn-primary" style={{width: "250px", }}>
                    Login
                    </button>
                </div>
            </div>
          
        </form>
      )
    }
}