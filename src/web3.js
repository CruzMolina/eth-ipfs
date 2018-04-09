// overrides metamask v0.2 for 1.0 version. 
// 1.0 allows async and await instead of promises


import Web3 from 'web3';

const web3 = new Web3(window.web3.currentProvider);

export default web3;
