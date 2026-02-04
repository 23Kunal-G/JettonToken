import { NetworkProvider } from "@ton/blueprint";
import { Address } from "@ton/core";
import { TonClient } from "@ton/ton";

export async function run(provider: NetworkProvider) {
    const ui = provider.ui();
    const receiver = ui.inputAddress(`Enter the token recipent address`);
    const amount = BigInt(await ui.input(`Enter the mint amount`));

    const tokenAddr = Address.parse(process.env.JETTON_TOKEN_MASTER_ADDRESS as string);
    const ownerWallet = TonClient
}