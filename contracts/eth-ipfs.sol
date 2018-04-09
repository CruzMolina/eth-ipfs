pragma solidity ^0.4.17;

contract IPFS {
 string ipfsHash;

 function sendHash(string x) public {
   ipfsHash = x;
 }

 function getHash() public view returns (string) {
   return ipfsHash;
 }

}
