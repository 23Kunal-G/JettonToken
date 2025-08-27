import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Stuct } from '../build/Stuct/Stuct_Stuct';
import '@ton/test-utils';

describe('Stuct', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let stuct: SandboxContract<Stuct>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        stuct = blockchain.openContract(await Stuct.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await stuct.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            null,
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: stuct.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and stuct are ready to use
    });
});
