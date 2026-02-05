import { NetworkProvider } from "@ton/blueprint";
import { Address, beginCell } from "@ton/core";
import { walletConfig } from "../wallet/walletConfig";

export async function run(provider: NetworkProvider) {
    const ui = provider.ui();
    const receiver = await ui.inputAddress(`Enter the token recipent address`);
    const amount = BigInt(await ui.input(`Enter the mint amount`));

    const tokenAddr = Address.parse(process.env.JETTON_TOKEN_MASTER_ADDRESS as string);
    const ownerWallet = await walletConfig();

    const msgBody = beginCell()
    .storeUint(0x49079133,32)
    .storeAddress(receiver)
    .storeCoins(amount)
    .endCell()

    let seqno = await ownerWallet.getSeqno();
    if (seqno) {
        
    }
    ownerWallet.send(msgBody);
}