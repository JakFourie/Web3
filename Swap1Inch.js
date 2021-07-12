//https://docs.1inch.io/api/nodejs-web3-example

require('dotenv').config();
const Web3 = require('web3')
const web3 = new Web3('https://polygon-mainnet.infura.io/v3/7a2d659fe6604d0cb3e02cd329626792')

const axios = require('axios');                         //used for getting api data, install with "yarn add axios"
const { ethers } = require('ethers');                   //full ethereum wallet written as a javascript module, documentation here: https://docs.ethers.io/v5/getting-started/

var privateKey = Buffer.from(process.env.PRIVATE_KEY, 'hex');//private key in hex with a leading 0x

// Sign up for a free dedicated RPC URL at https://rpc.maticvigil.com/, https://ankr.com, https://infura.io/ or other hosted node providers.
const MATICprovider = new ethers.providers.JsonRpcProvider('https://polygon-mainnet.infura.io/v3/7a2d659fe6604d0cb3e02cd329626792'); //rpc can be replaced with an ETH or BSC RPC 
const wallet = new ethers.Wallet(privateKey, MATICprovider);//connect the matic provider along with using the private key as a signer

// Read the deployed contract - PolyPUP Bone Token
const tokenAddress = '0x6bb45cEAC714c52342Ef73ec663479da35934bf7'
const contractABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegator","type":"address"},{"indexed":true,"internalType":"address","name":"fromDelegate","type":"address"},{"indexed":true,"internalType":"address","name":"toDelegate","type":"address"}],"name":"DelegateChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegate","type":"address"},{"indexed":false,"internalType":"uint256","name":"previousBalance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newBalance","type":"uint256"}],"name":"DelegateVotesChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DELEGATION_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DOMAIN_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint32","name":"","type":"uint32"}],"name":"checkpoints","outputs":[{"internalType":"uint32","name":"fromBlock","type":"uint32"},{"internalType":"uint256","name":"votes","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegatee","type":"address"}],"name":"delegate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegatee","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"delegateBySig","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegator","type":"address"}],"name":"delegates","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getCurrentVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"blockNumber","type":"uint256"}],"name":"getPriorVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"numCheckpoints","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];

const contract = new web3.eth.Contract(contractABI, tokenAddress)

/**
 * The driver of the program, this will execute anything you put in it
 */
async function driver() {

    boneBalance = await contract.methods.balanceOf(wallet.address).call()
    let callURL = 'https://api.1inch.exchange/v3.0/137/swap?fromTokenAddress='+tokenAddress+
    '&toTokenAddress=0xc2132d05d31c914a87c6611c10748aeb04b58e8f&' +
    'amount='+boneBalance+'&fromAddress=' +
    wallet.address +
    '&slippage=1';

    response = await axios.get('https://api.1inch.exchange/v3.0/1/tokens')
    stdTokens = response.data

    // only tokens need approval, MATIC does not
    //begin token approval
    if (!(tokenAddress == '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') && tokenAddress in stdTokens) //check if this is not the native token and is std supported token
    {
        nonce = await wallet.getTransactionCount() + 1;
        globalData = await approveApiCaller(boneBalance, tokenAddress, nonce)
        console.log(globalData);
        try {
            await wallet.sendTransaction(globalData["tx"]).then(
                (data) => {                                 //catch any errors
                    console.log(data);
                }
            );                                              //send the transaction
            console.log("Approval success");
        } catch (e) {
            console.log("Approval failure");
        }
    } else {
        console.log("Token is not a standard 1Inch token.");
    }//end token approval

    //begin api call and transaction sending
    nonce = await wallet.getTransactionCount() + 1;

    globalData = await apiCaller(callURL, nonce);       //call the api to get the data, and wait until it returns
    //console.log(globalData["tx"]);                    //log the data
    try {
        await wallet.sendTransaction(globalData["tx"]).then(
            (data) => {                                 //catch any errors
                console.log(data);
            }
        );                                              //send the transaction
        console.log("Transaction success");
    } catch (e) {
        console.log("Transaction failure");
    }
    //end api call and transaction sending
    process.exit(0);                                    //exit with code 0
}

/**
 * This will call the api to get an approve transaction, some tokens need to be approved to 0 before increasing again later
 * @param {the number of tokens that are requested to be unlocked, if "null" infinite will be unlocked } value 
 * @param {the token address of what tokens needs to be unlocked} tokenAddress
 * @param {the nonce of the transaction} nonce
 * @returns approve transaction data
 */
async function approveApiCaller(value, tokenAddress, nonce) {
    let url = 'https://api.1inch.exchange/v3.0/1/approve/calldata' +
        (value > -1 && value != null ? "?amount=" + value + "&" : "?") //tack on the value if it's greater than -1
        + "tokenAddress=" + tokenAddress            //complete the called URL
    let temp = await axios.get(url);                //get the api call
    temp = temp.data;                               //we only want the data object from the api call
    //we need to convert the gasPrice to hex
    delete temp.tx.gasPrice;
    delete temp.tx.gas;                             //ethersjs will find the gasLimit for users

    //we also need value in the form of hex
    let val = parseInt(temp.tx["value"]);			//get the value from the transaction
    val = '0x' + val.toString(16);				    //add a leading 0x after converting from decimal to hexadecimal
    temp.tx["value"] = val;						    //set the value of value in the transaction object

    return temp;                                    //return the data
}

/**
 * Will call the api and return the data needed
 * @param {the url of what api call you want} url 
 * @param {the nonce of the transaction, the user must keep track of this} nonce
 * @returns swap transaction
 */
async function apiCaller(url, nonce) {
    let temp = await axios.get(url);                //get the api call
    temp = temp.data;                               //we only want the data object from the api call
    delete temp.tx.gasPrice;                        //ethersjs will find the gasPrice needed
    delete temp.tx.gas;                             //ethersjs will find the gasLimit for users

    //we also need value in the form of hex
    let value = parseInt(temp.tx["value"]);			//get the value from the transaction
    value = '0x' + value.toString(16);				//add a leading 0x after converting from decimal to hexadecimal
    temp.tx["value"] = value;						//set the value of value in the transaction object. value referrs to how many of the native token

    //temp.tx["nonce"] = nonce;                     //ethersjs will find the nonce for the user
    //temp.tx.chainId = 137                         //this allows the transaction to NOT be replayed on other chains, ethersjs will find it for the user
    return temp;                                    //return the data
}

driver();