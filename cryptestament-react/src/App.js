import React, { Component } from 'react';
import Web3 from "web3";
import './App.css';
import { CRYPTESTAMENT_ABI, CRYPTESTAMENT_ADDRESS } from "./config.js";
import  Web3Connector  from "./Helpers/Web3Connector.js";
import { BrowserRouter as Router, Link, NavLink, Redirect, Prompt} from 'react-router-dom';
import Route from 'react-router-dom/Route';

// function App() {
//   return (
//     <div className="container">
//      <h1>Hello world</h1>
//     </div>
//   );
// }

class App extends Component {
state = {
  account: '', userName:'' ,balance:0
}

  componentWillMount() {
    //this.loadBlockchainData();
  }


  constructor(props) {
    super(props)
    this.state = { account: '', userName:'' ,balance:0}
    console.log(this.state)
  }

  async loadBlockchainData() {
    const _web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const _account = await _web3.eth.getAccounts();
    this.setState({ account: _account[0] })
    // const _cryptestmentObj = new _web3.eth.Contract(CRYPTESTAMENT_ABI, CRYPTESTAMENT_ADDRESS);
    // var _currentTime = await _cryptestmentObj.methods.TimeChecker(1576429552).call();
    // this.setState({ currentTime: _currentTime[0] })
  }


  enableTorus = async () =>{
    try {
      var result = await Web3Connector.initialize();
      const userInfo = await result.getUserInfo();
      console.log(userInfo)
      
      var accounts = await Web3Connector.web3.eth.getAccounts();
      console.log(accounts)
      var balance = await  Web3Connector.web3.eth.getBalance(accounts[0]);
      console.log(balance)

      this.setState({account:accounts[0]})
      this.setState({balance:balance})
      this.setState({userName:userInfo.name})
    
    } catch (error) {
      console.error(error)
    }
  }


  render() {
    return (
      <Router>
      <Route path="/" exact render = {
          () => {
            return (   <div className="container">
            <div className="row align-items-center h-100">
              <div className="col-6 mx-auto">
                <div className="h-100 justify-content-center">
                  <div align="center">
                    <h1 >Cryptestament</h1>
                    <p>Dapp for tracking user's testament and proof of death POC</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row align-items-center h-100">
              <div className="col-6 mx-auto">
                <div align="center">
                  <button className="btn-primary" onClick={this.enableTorus}>Log in using Torus</button>
                </div>
              </div>
            </div>
          </div>);
          }}
      />
      
      <Route path="/dashboard" exact render = {
          () => {
            return (   
            <div className="container">
            hello 
          </div>
          );
          }}
      
      
      ></Route>
      </Router>
    );
  }
}

export default App;
