import "./App.css";

import {
	getLedgerWallet,
	getMathWallet,
	getPhantomWallet,
	getSolflareWallet,
	getSolletWallet,
	getSolongWallet,
	getTorusWallet,
} from "@solana/wallet-adapter-wallets";
import { useMemo } from "react";
import { Home } from "./pages/home";
import { HashRouter, Route, Switch } from "react-router-dom";
import { WalletProvider } from "@solana/wallet-adapter-react";

function App() {
	const wallets = useMemo(
		() => [
			getPhantomWallet(),
			getSolflareWallet(),
			getTorusWallet({
				options: {
					// TODO: Get your own tor.us wallet client Id
					clientId:
						"BOM5Cl7PXgE9Ylq1Z1tqzhpydY0RVr8k90QQ85N7AKI5QGSrr9iDC-3rvmy0K_hF0JfpLMiXoDhta68JwcxS1LQ",
				},
			}),
			getLedgerWallet(),
			getSolongWallet(),
			getMathWallet(),
			getSolletWallet(),
		],
		[]
	);
	return (
		<HashRouter basename={"/"}>
			{/* <ConnectionProvider> */}
			<WalletProvider wallets={wallets} autoConnect>
				{/* <AccountsProvider>
						<MarketProvider> */}
				<Switch>
					<Route exact path="/" component={() => <Home />} />
					{/* <Route
										exact
										path="/faucet"
										children={<FaucetView />}
									/> */}
				</Switch>
				{/* </MarketProvider>
					</AccountsProvider> */}
			</WalletProvider>
			{/* </ConnectionProvider> */}
		</HashRouter>
	);
}

export default App;
