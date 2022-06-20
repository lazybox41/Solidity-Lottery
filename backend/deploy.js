const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { abi, evm } = require("./compile");

const provider = new HDWalletProvider(
	"two move shiver smart piece purity rough accident disease image hero satisfy",
	"https://rinkeby.infura.io/v3/0e8b0966c27c4f018a1123c4149d8c77"
);

const web3 = new Web3(provider);

const deploy = async () => {
	const accounts = await web3.eth.getAccounts();

	console.log("Attempting to deploy from account", accounts[0]);

	const result = await new web3.eth.Contract(abi)
		.deploy({ data: evm.bytecode.object })
		.send({ gas: "1000000", from: accounts[0] });

	console.log(JSON.stringify(abi));
	console.log("Contract deployed to", result.options.address);
	provider.engine.stop();
};
deploy();
