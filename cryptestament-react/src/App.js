import React, { Component } from 'react';
import Web3 from "web3";
import './App.css';
import {CRYPTESTAMENT_ABI,CRYPTESTAMENT_ADDRESS} from "./config.js";

// function App() {
//   return (
//     <div className="container">
//      <h1>Hello world</h1>
//     </div>
//   );
// }

class App extends Component {


  componentWillMount() {
    this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const _web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const _account = await _web3.eth.getAccounts();
    console.log(_account)
    this.setState({ account: _account[0] })

    const _cryptestmentObj = new _web3.eth.Contract(CRYPTESTAMENT_ABI,CRYPTESTAMENT_ADDRESS);
    var _currentTime = await _cryptestmentObj.methods.TimeChecker(1576429552).call();
    console.log(_currentTime[0])
    this.setState({currentTime:_currentTime[0]})
  }

  constructor(props) {
    super(props)
    this.state = { account: 'a',currentTime:false }
  }

  render() {
    return (
      <div className="container">
        <h1>Hello</h1>
        <p>Your account: {this.state.account}</p>
        <p>Current time: {this.state.currentTime}</p>
      </div>
    );
  }
}

export default App;
