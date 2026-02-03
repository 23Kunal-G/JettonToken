import { Address, toNano } from '@ton/core';
import { JettonToken } from '../build/JettonToken/JettonToken_JettonToken';
import { NetworkProvider } from '@ton/blueprint';
import { buildOnchainMetadata } from '../utils/jetton-helpers';

export async function run(provider: NetworkProvider) {
     const jettonParams = {
        name: "Mushafa Token",
        description: "This is a test token for testing purposes only.",
        symbol: "MUSH",
        image: "https://azure-elegant-gibbon-704.mypinata.cloud/ipfs/bafybeibcyncpqdatxt2nh6bmkjkuqzclqotshfliggvvk6levro66y32du",
    };

    const totalSupply = 1000_000_000_000n;
    const owner = Address.parse(process.env.JETTON_TOKEN_OWNER_ADDRESS as string);
    

    // Create content Cell
    let content = buildOnchainMetadata(jettonParams);
    const jettonToken = provider.open(await JettonToken.fromInit(owner, content, totalSupply));

    await jettonToken.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Mint',
            amount: 100_000_000_000n, // 100 tokens with 9 decimals
            receiver: owner,
        },
    );

    await provider.waitForDeploy(jettonToken.address);
    console.log('JettonToken deployed to', jettonToken.address.toString());

    // run methods on `jettonToken`
}
