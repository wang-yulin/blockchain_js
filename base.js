import crypto from "crypto"
const SHA256 = message => crypto.createHash("sha256").update(message).digest("hex")

class Block {
  constructor(timestamp = "", data = []) {
    this.timestamp = timestamp
    this.data = data
    this.hash = this.getHash()
    //previous block hash
    this.prevHash = ""
    this.nonce = 0
  }

  getHash() {
    return SHA256(this.prevHash + this.timestamp + this.nonce + JSON.stringify(this.data));
  }

  mine(difficulty) {
    while (!this.hash.startsWith(Array(difficulty + 1).join("0"))) {
      console.log("this.hash", this.nonce, this.hash);
      this.nonce++
      this.hash = this.getHash()
    }
  }

}

class Blockchain {
  constructor() {
    this.chain = [new Block(Date.now().toString())]
    this.difficulty = 1
    this.blockTime = 30000
  }

  //get the latest block
  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(block) {
    block.prevHash = this.getLastBlock().hash
    block.hash = block.getHash()
    block.mine(this.difficulty)

    this.chain.push(Object.freeze(block))
    this.difficulty += Date.now() - parseInt(this.getLastBlock().timestamp) < this.blockTime ? 1 : -1
  }

  isValid(blockchain = this) {
    for (let i = 1; i < blockchain.chain.length; i++) {
      const currentBlock = blockchain.chain[i];
      const prevBlock = blockchain.chain[i - 1];

      // Check validation
      if (currentBlock.hash !== currentBlock.getHash() || prevBlock.hash !== currentBlock.prevHash) {
        return false;
      }
    }

    return true;
  }
}

export { Block, Blockchain }