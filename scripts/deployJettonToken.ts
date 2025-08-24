import { toNano } from '@ton/core';
import { JettonToken } from '../build/JettonToken/JettonToken_JettonToken';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const jettonToken = provider.open(await JettonToken.fromInit());

    await jettonToken.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        null,
    );

    await provider.waitForDeploy(jettonToken.address);

    // run methods on `jettonToken`
}
