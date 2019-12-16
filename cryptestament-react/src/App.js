import React, { Component } from 'react';
import Web3 from "web3";
import './App.css';

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
  }

  constructor(props) {
    super(props)
    this.state = { account: '' }
  }

  render() {
    return (
      <div className="container">
        <h1>Hello</h1>
        <p>Your account: {this.state.account}</p>
      </div>
    );
  }
}

export default App;
