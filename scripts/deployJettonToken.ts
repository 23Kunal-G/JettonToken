import { toNano } from '@ton/core';
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

    const totalSupply = 1000;
    const owner = process.env.JETTON_TOKEN_OWNER_ADDRESS;
    

    // Create content Cell
    let content = buildOnchainMetadata(jettonParams);
    const jettonToken = provider.open(await JettonToken.fromInit());

    await jettonToken.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        null,
    );

    await provider.waitForDeploy(jettonToken.address);
    console.log('JettonToken deployed to', jettonToken.address);

    // run methods on `jettonToken`
}
