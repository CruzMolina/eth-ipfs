const assert = require("assert");
const ganache = require("../../lottery/node_modules/ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const { interface, bytecode } = require("../compile");

let _contract;
let accounts;
let txHash;
let inputHash;
let transactionReceipt;

beforeEach(async () => {
  // initialize accounts
  accounts = await web3.eth.getAccounts();
  // create JSON contract object to test
  _contract = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: "3000000" });
  // initialize & send/store test hash
  inputHash = "sample_hash";
  await _contract.methods
    .sendHash(inputHash)
    .send({ from: accounts[0] }, (error, transactionHash) => {
      txHash = transactionHash;
    });
});

describe("eth-ipfs Contract", () => {
  it("deploys a contract", () => {
    assert.ok(_contract.options.address);
  });

  it("shows contract address to users", () => {
    const contract_address = _contract.options.address;
    assert.equal(contract_address, _contract.options.address);
  });

  it("stores and returns hash generated from a file", async () => {
    const outputHash = await _contract.methods
      .getHash()
      .call({ from: accounts[0] });

    assert.equal(inputHash, outputHash);
  });

  it("stores and retrieves transactionHash properly", async () => {
    await web3.eth.getTransactionReceipt(txHash, (err, txReceipt) => {
      //  console.log(txReceipt);
      transactionReceipt = txReceipt;
    });

    assert.equal(txHash, transactionReceipt.transactionHash);
  });

  it("retrieves gas used and block number for a given sendHash transaction", async () => {
    assert.ok(transactionReceipt.gasUsed, transactionReceipt.blockNumber);
  });
});
