import { Block, Blockchain } from "./base.js";

const myChain = new Blockchain()

myChain.addBlock(new Block(Date.now().toString(), { from: "John", to: "Bob", amount: 100 }))
myChain.addBlock(new Block(Date.now().toString(), { from: "Aaron", to: "Bob", amount: 100 }))
console.log(myChain);