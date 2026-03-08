import { Address, TonClient, WalletContractV4, WalletContractV5R1 } from "@ton/ton";
import { mnemonicToWalletKey } from "@ton/crypto"
// import { getHttpEndpoint } from "@orbs-network/ton-access";


export async function walletConfig() {
    const mnemonic  = process.env.OWNER_NEMONIC as string;
    const keyPair = await mnemonicToWalletKey(mnemonic.split(' '));

    // Create the wallet contract instance
    const wallet = WalletContractV4.create({
        publicKey : keyPair.publicKey,
        workchain: 0
    });

    // Connect to the network
    /* sometime getHttpEndpoint that function can working properly for the reson
      I used that link
    */

    // const endPoint = await getHttpEndpoint();
    const endpoint = "https://testnet.toncenter.com/api/v2/jsonRPC";
    const client = new TonClient({ endpoint });
    const walletContract = client.open(wallet);
    console.log(`Wallet address: ${ walletContract.address.toString()}`);
    return {
        wallet: walletContract,
        keyPair: keyPair
    };
}
