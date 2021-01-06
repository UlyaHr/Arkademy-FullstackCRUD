import React, { Component } from 'react'
import logoArk from '../assets/logo-arkademy.png'
import '../App.css'

export default class Hero extends Component {
  render() {
    return (
      <div className="container">
        <div className="hero">
          <div className="row d-flex">
            <div className="col s12 m6">
              <img src={logoArk} alt="Logo arkademy"/>
            </div>
            <div className="col s12 m6 d-flex">
              <h1>Basic CRUD App</h1>
              <p>Using React Node.js Express and MySQL</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}