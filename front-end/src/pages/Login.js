import axios from "axios";
import React, { Component } from 'react';
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

export default function Login()  {
    async function handleSubmit(e) {
        e.preventDefault();
        await axios.post("http://p0nd.ga:27777/auth/login", {
            email: e.target[0].value,
            password: e.target[1].value
        }).then((response)=>{
            if (response.data !== null) { navigate("/");}
            else {Swal.fire({
                title: 'Error!',
                text: 'Wrong Email or Password',
                icon: 'error',
                confirmButtonText: 'Ok'
              })}
        });
    };
    const navigate = useNavigate();

    return (
        
        <section>
            <div className="container-login" >

                <img src="https://img.graphicsurf.com/2020/09/people-in-pharmacy-vector-illustration.jpg" width={380}>
                </img>
                <h3>Drugstore POS</h3>
                
            <form onSubmit={handleSubmit}>
                <label htmlFor="email"></label>
                    <input 
                        type="text"
                        id="email"
                        className="form-control"
                        placeholder="email"
                        style={{
                            width: "250px",
                            height: "40px",
                        }}
                    />

                <label htmlFor="password"></label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="Password"
                        style={{width: "250px"}}
                    />
                <label htmlFor="submit"></label>
                <div className="Login-button">
                    <button type="submit" className="btn btn-primary" style={{width: "250px", }}>
                    Login
                    </button>
                </div>
            </form>
                
            </div>
        
        </section>
      )
    }
