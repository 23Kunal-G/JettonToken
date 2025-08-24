import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { JettonToken } from '../build/JettonToken/JettonToken_JettonToken';
import '@ton/test-utils';

describe('JettonToken', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let jettonToken: SandboxContract<JettonToken>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        jettonToken = blockchain.openContract(await JettonToken.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await jettonToken.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            null,
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: jettonToken.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and jettonToken are ready to use
    });
});
