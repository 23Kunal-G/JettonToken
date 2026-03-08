import "./trait.tact";
import "./messages.tact";
import "./stuct.tact";

contract JettonToken with Jetton  {
    totalSupply: Int as coins;
    owner: Address;
    content: Cell;
    mintable: Bool;

    maxSupply: Int as coins;

    init(owner: Address, content: Cell, maxSupply: Int) {
        self.totalSupply = 0;
        self.owner = owner;
        self.mintable = true;
        self.content = content;

        self.maxSupply = maxSupply; // Initial Setting for maxSupply
    }

    receive(msg: Mint) {
        let ctx: Context = context();
        require(ctx.sender == self.owner, "Not Owner");
        require(self.mintable, "Can't Mint Anymore");
        self.mint(msg.receiver, msg.amount, self.owner); // (to, amount, responseDestination)
    }

    receive(msg: MintClose) {
        let ctx: Context = context();
        require(ctx.sender == self.owner, "Not Owner");
        self.mintable = false;
    }

    receive(msg: IncreaseMaxSupply) {
        let ctx: Context = context();
        require(ctx.sender == self.owner, "Not Owner");
        require(msg.newMaxSupply > self.maxSupply, "New max supply must be greater than current max supply");
        self.maxSupply = msg.newMaxSupply;
    }
}
