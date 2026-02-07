import { NetworkProvider } from "@ton/blueprint";
import { Address, beginCell, internal, SendMode, toNano } from "@ton/core";
import { walletConfig } from "../wallet/walletConfig";

export async function run(provider: NetworkProvider) {
    const ui = provider.ui();
    
    try {
        // Get user input
        const receiver = await ui.inputAddress(`Enter the token recipient address`);
        const amountInput = await ui.input(`Enter the mint amount`);
        const amount = BigInt(amountInput);
        
        // Validate amount
        if (amount <= 0n) {
            throw new Error("Mint amount must be positive");
        }

        // Get token master address
        const tokenAddr = Address.parse(process.env.JETTON_TOKEN_MASTER_ADDRESS as string);
        if (!tokenAddr) {
            throw new Error("JETTON_TOKEN_MASTER_ADDRESS not set in environment");
        }

        const ownerWallet = await walletConfig();

        // Build mint message body (op::mint from jetton standard)
        const msgBody = beginCell()
            .storeUint(0x49079133, 32)  // op::mint
            .storeUint(0, 64)   // query_id
            .storeAddress(receiver)
            .storeCoins(amount)
            .endCell();

        // Get current seqno
        const seqno = await ownerWallet.wallet.getSeqno();
        
        ui.write(`Sending mint transaction...`);
        ui.write(`Recipient: ${receiver.toString()}`);
        ui.write(`Amount: ${amount.toString()}`);
        ui.write(`Current seqno: ${seqno}`);

        // Send transaction
        await ownerWallet.wallet.sendTransfer({
            secretKey: ownerWallet.keyPair.secretKey,
            seqno: seqno,
            messages: [
                internal({
                    to: tokenAddr,
                    value: toNano('0.05'),
                    body: msgBody
                })
            ],
            sendMode: SendMode.CARRY_ALL_REMAINING_BALANCE
        });

        // Wait for transaction confirmation
        ui.write(`Waiting for transaction confirmation...`);
        let currentSeqno = seqno;
        while (currentSeqno === seqno) {
            await sleep(1500);
            currentSeqno = await ownerWallet.wallet.getSeqno();
        }
        
        ui.write(`Mint transaction confirmed!`);
        ui.write(`New seqno: ${currentSeqno}`);
        
    } catch (error) {
        ui.write(`Error: ${error instanceof Error ? error.message : String(error)}`);
        throw error;
    }
}

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}