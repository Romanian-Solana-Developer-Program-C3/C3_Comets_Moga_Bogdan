import {Keypair} from "@solana/web3.js";

const keypair = Keypair.generate();

console.log("Keypair generated successfully!");
console.log("Public key", keypair.publicKey.toBase58());
console.log("SecretKey", keypair.secretKey)