import "dotenv/config"

import { 
    Connection,
    LAMPORTS_PER_SOL,
    clusterApiUrl 
} from "@solana/web3.js";

import { 
    airdropIfRequired,
    getKeypairFromEnvironment
 } from "@solana-developers/helpers";

const keypair = getKeypairFromEnvironment("SECRET_KEY");
const connection = new Connection(clusterApiUrl("devnet"));

const pubkey = keypair.publicKey;


(async () => {
    await airdropIfRequired(connection, pubkey, LAMPORTS_PER_SOL, 0);
    const balanceInLamports = await connection.getBalance(pubkey);
    console.log(`${pubkey.toString()} has balance ${balanceInLamports}`);
})();


