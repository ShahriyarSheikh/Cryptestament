import React, { Component } from 'react';
import Web3 from "web3";
import './App.css';
import { CRYPTESTAMENT_ABI, CRYPTESTAMENT_ADDRESS } from "./config.js";
import Web3Connector from "./Helpers/Web3Connector.js";
import { BrowserRouter as Router, Link, NavLink, Redirect, Prompt } from 'react-router-dom';
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
    account: '', userName: '', balance: 0,nominees:'', timeRemaining:0, daysToExtend:0 , valueOfTestament:0
  }

  componentWillMount() {
    //this.loadBlockchainData();
  }


  constructor(props) {
    super(props)
    this.state = { account: '', userName: '', balance: 0, nominees:'', timeRemaining:0, daysToExtend:0, valueOfTestament:0 }
    console.log(this.state)
    
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  async loadBlockchainData() {
    const _web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const _account = await _web3.eth.getAccounts();
    this.setState({ account: _account[0] })
    // const _cryptestmentObj = new _web3.eth.Contract(CRYPTESTAMENT_ABI, CRYPTESTAMENT_ADDRESS);
    // var _currentTime = await _cryptestmentObj.methods.TimeChecker(1576429552).call();
    // this.setState({ currentTime: _currentTime[0] })
  }


  enableTorus = async () => {
    try {
      var result = await Web3Connector.initialize();
      const userInfo = await result.getUserInfo();
      console.log(userInfo)

      var accounts = await Web3Connector.web3.eth.getAccounts();
      console.log(accounts)
      var balance = await Web3Connector.web3.eth.getBalance(accounts[0]);
      console.log(balance)

      this.setState({ account: accounts[0] })
      this.setState({ balance: balance })
      this.setState({ userName: userInfo.name })

      console.log(this.state)

    } catch (error) {
      console.error(error)
    }
  }

  handleSubmitOfTestament(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }


  render() {
    return (
      <Router>
        <Route path="/" exact render={
          () => {
            return (
              <div className="container">
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


                <label></label>

                <div class="row">
                  <div class="col">
                    <div align="left">
                      Hello : {this.state.userName}
                      <br />
                      Balance: {this.state.balance}
                      <br />
                      Address: {this.state.account}
                    </div>
                  </div>
                </div>

                <label></label>

                <div class="row">
                  <div class="col">
                    <div align="left">
                      <h3>Owner of Testament Functionalities</h3>
                      <button className="btn btn-secondary" disabled={this.state.account === '' ? true : false}>Get User Details</button>
                      <button className="btn btn-secondary" disabled={this.state.account === '' ? true : false}>Refresh Timeline</button>
                      <button className="btn btn-secondary" disabled={this.state.account === '' ? true : false}>View Current Testament</button>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div align="left">
                      <h5>Submit Testament</h5>
                    <form onSubmit={this.handleSubmitOfTestament}>
                      <label>
                        Amount to give to nominee:
                        <input type="text" value={this.state.valueOfTestament} onChange={this.handleChange} />
                      </label>
                      <br/>
                      <label>
                        Time (in unix timestamp):
                        <input type="number" value={this.state.timeRemaining} onChange={this.handleChange} />
                      </label>
                      <br/>
                      <label>
                        Days to extend :
                        <input type="text" value={this.state.daysToExtend} onChange={this.handleChange} />
                      </label>
                      <br/>
                      <label>
                        Nominees :
                        <input type="text" value={this.state.nominees} onChange={this.handleChange} />
                      </label>
                      <br/>
                      <input className="btn btn-primary" type="submit" value="Submit" disabled={this.state.account === '' ? true : false}/>
                    </form>
                    </div>
                  </div>
                </div>

                <label></label>

                <div class="row">
                  <div class="col">
                    <div align="left">
                      <h3>Nominee functionalities</h3>
                      <button className="btn btn-info" disabled={this.state.account === '' ? true : false}>Claim</button>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <form onSubmit={(event) => {
                      event.preventDefault()
                      //this.props.createTask(this.task.value)
                    }}>
                      <input
                        id="ClaimDate"
                        ref={(input) => {
                          this.task = input
                        }}
                        type="text"
                        className="form-control"
                        placeholder="Check claim date by entering owner address"
                        required />
                      <input type="submit" hidden={this.state.account == '' ? true : false} onClick={this.sampleFunction}/>
                    </form>
                  </div>
                </div>
                

              </div>




            );
          }}
        />

        <Route path="/dashboard" exact render={
          () => {
            return (
              <div className="container">
                hello {this.state.userName}
              </div>
            );
          }}


        ></Route>
      </Router>
    );
  }
}

export default App;
