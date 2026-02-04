import { TonClient, WalletContractV5R1 } from "@ton/ton";
import { mnemonicToWalletKey } from "@ton/crypto"
// import { getHttpEndpoint } from "@orbs-network/ton-access";


export async function walletConfig() {
    const mnemonic  = process.env.OWNER_NEMONIC_V5 as string;
    const keyPair = await mnemonicToWalletKey(mnemonic.split(''));

    // Create the wallet contract instance
    const wallet = WalletContractV5R1.create({
        publicKey : keyPair.publicKey,
        workchain: 0
    });

    // Connect to the network
    /* sometime getHttpEndpoint that function can working properly for the resone
      I used that link
    */

    // const endPoint = await getHttpEndpoint();
    const endpoint = "https://testnet.toncenter.com/api/v2/openapi.json";
    const client = new TonClient({ endpoint });
    const walletContract = client.open(wallet);
}
