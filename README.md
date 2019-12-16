# Cryptestament

Dapp for tracking user's testament and proof of death POC

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software 

```
Truffle v5.1.4 (core: 5.1.4)
Solidity v0.5.12 (solc-js)
Node v12.13.0
Web3.js v1.2.1
```

## Running the tests

Running:
truffle compile
truffle migrate
truffle test

Also ganache must be running on the system

## Use Cases
* If for example the user cannot defer the testament, then the nominees will receive the stored amount by the user.
* Can also act as a proof of death mechanism for users, and various entities can verify if the user is alive or deceased (to be extended in the future).

## Functionalities (Ver 1.0.0):
* Using Torus for singing in the web application.
* Update User Details like first name, last name and if the person is alive or not.
*	Check the user details by providing the user’s address.
*	Add testament onto the smart contract by providing the nominees, the time that is remaining and how many days to extend.
*	User can view his current testament.
*	Extend testament by the number of days specified in the testament.
*	Claim the testament which will be done by any one of the nominees by providing the testament owners public address.
*	Check the claim date by providing the testament owner’s address



## For Future Versions:
*	Include Multi-signature for verifying nominees
*	Include A signing verification on Update user to check if the call to the method is from our own server
*	Include IPFS to store user details
*	Create arbitrator functionalities in case of dispute
*	A person can have multiple testaments
*	Can add/remove nominees from a testament
*	Ability to manage testaments

