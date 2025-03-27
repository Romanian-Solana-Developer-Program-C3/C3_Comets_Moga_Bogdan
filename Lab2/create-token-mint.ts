import{
    getExplorerLink,
    getKeypairFromEnvironment,
}from "@solana-developers/helpers";

import {createMint} from "@solana/spl-token";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import "dotenv/config"

async function createTokenMint() {

    console.log(`Creating mint...`);

    const kp = getKeypairFromEnvironment("SECRET_KEY");

    console.log(`Public key: ${kp.publicKey}`);

    const connection = new Connection(clusterApiUrl("devnet"));

    const mint = await createMint(connection, kp, kp.publicKey, null, 9);

    const link = getExplorerLink("address",mint.toBase58(),"devnet");
    
    console.log(`created mint ${link}`)
}
createTokenMint();