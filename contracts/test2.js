const Web3 = require('web3');

// Connect to the Binance Smart Chain (Testnet)
const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');

// Contract ABI (Application Binary Interface)
const contractAbi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "bytes",
				"name": "_payload",
				"type": "bytes"
			}
		],
		"name": "transferFunds",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
// Contract address
const contractAddress = '0xD900FFb0c6e3D982aA34e479331375F3cb351179';

//destination address
const yourAddress = '0xC78fb93a84cfAfa295e8824C176F5B52654974D3';

// new instance of the contract
const contract = new web3.eth.Contract(contractAbi, contractAddress);

// Function to receive Testnet BNB
async function receiveTestnetBNB() {
  try {
    // Getting payload to receive Testnet BNB
    const payload = contract.methods.transferFunds(yourAddress, '0x').encodeABI();

    //new transaction object
    const txObject = {
      from: yourAddress,
      to: contractAddress,
      data: payload,
      gas: 200000 
    };

    // Estimating the gas required for the transaction
    const gas = await web3.eth.estimateGas(txObject);

    // Set the gas limit
    txObject.gas = gas;

    // Send the transaction
    const receipt = await web3.eth.sendTransaction(txObject);

    console.log('Transaction receipt:', receipt);
  } catch (error) {
    console.error('Error receiving Testnet BNB:', error);
  }
}

// Call the function to receive Testnet BNB
receiveTestnetBNB();