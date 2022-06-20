import React from "react";
import web3 from "./web3";
import lottery from "./lottery";

class App extends React.Component {
	state = { manager: "", players: [], balance: "", value: "", message: "" };
	async componentDidMount() {
		const manager = await lottery.methods.manager().call();
		const players = await lottery.methods.getPlayers().call();
		const balance = await web3.eth.getBalance(lottery.options.address);

		this.setState({ manager });
		this.setState({ players });
		this.setState({ balance });
	}

	onSubmit = async (event) => {
		event.preventDefault();

		this.setState({ message: "Waiting for txn" });

		const accounts = await web3.eth.getAccounts();
		await lottery.methods.enter().send({
			from: accounts[0],
			value: web3.utils.toWei(this.state.value),
		});

		this.setState({ message: "Txn completed" });
	};

	onClick = async () => {
		const accounts = await web3.eth.getAccounts();
		this.setState({ message: "Waiting for txn" });
		await lottery.methods.pickWinner().send({
			from: accounts[0],
		});
		this.setState({ message: "Winner picked" });
	};

	render() {
		return (
			<div>
				<h2>Lottery Contract</h2>
				<p>Contract is managed by {this.state.manager}</p>
				<p>
					There are {this.state.players.length} people in this contest
					to win {web3.utils.fromWei(this.state.balance, "ether")}{" "}
					ether
				</p>
				<hr />

				<form onSubmit={this.onSubmit}>
					<h4>Enter into contest</h4>
					<div>
						<label>Amount of eth to enter</label>
						<input
							value={this.state.value}
							onChange={(event) => {
								this.setState({
									value: event.target.value,
								});
							}}></input>
					</div>
					<button>Enter</button>
				</form>
				<hr />

				<h4>Pick Winner</h4>
				<button onClick={this.onClick}>Pick</button>

				<h1>{this.state.message}</h1>

				<hr />
			</div>
		);
	}
}
export default App;
