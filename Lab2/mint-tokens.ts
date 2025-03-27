import { getOrCreateAssociatedTokenAccount, 
    mintTo, 
    createMint } from "@solana/spl-token";
import{
    getExplorerLink,
    getKeypairFromEnvironment,
}from "@solana-developers/helpers";

import { Connection, clusterApiUrl, PublicKey, Keypair } from "@solana/web3.js";

import "dotenv/config"



const MINT = new PublicKey("5gVWytRgbW9PCSPFk7YwGEuFFgDayMx2PSBVjfXh2DDo");

async function mintToken(amount: number, mint: PublicKey) {

    console.log(`Minting token ${mint.toBase58()}`);

    const connection = new Connection(clusterApiUrl("devnet"));

    const kp = getKeypairFromEnvironment("SECRET_KEY");

    const ata = await getOrCreateAssociatedTokenAccount(
        connection, 
        kp,
        mint, 
        kp.publicKey);

    const sig = await mintTo(connection, kp, mint, ata.address, kp, amount);
    
    const link = getExplorerLink("tx", sig, "devnet");

    console.log(`Done with link: ${link}`);

}

mintToken(10*10**9, MINT);