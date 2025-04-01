import { Connection,
     clusterApiUrl,
      PublicKey,
} from "@solana/web3.js";

import{
    getExplorerLink,
    getKeypairFromEnvironment,
}from "@solana-developers/helpers";

import { getAssociatedTokenAddressSync, 
    getOrCreateAssociatedTokenAccount, 
    transferChecked 
} from "@solana/spl-token";

import "dotenv/config"

const MINT = new PublicKey("5gVWytRgbW9PCSPFk7YwGEuFFgDayMx2PSBVjfXh2DDo");
const SRC = new PublicKey("3ULwLEGfADLi59QkBUKsoaH5JzJTFDPYYHWdu3y2vnpH");
const DST = new PublicKey("G5CTYWYNtoZLdiwL9aU9BH4VGgqdRYbr95SsL41ggDrJ");

async function transferToken(mint: PublicKey, source: PublicKey, dest: PublicKey, amount: number) {

    console.log(`Transfering token ${mint}...`);

    const connection = new Connection(clusterApiUrl("devnet"));

    const kp = getKeypairFromEnvironment("SECRET_KEY");

    const sourceAta = getAssociatedTokenAddressSync(mint, source);

    const destAta = await getOrCreateAssociatedTokenAccount(connection, kp, mint, dest);

    const sig = await transferChecked(connection, kp, sourceAta, mint, destAta.address, kp, amount, 9);

    const link = getExplorerLink("tx", sig, "devnet");

    console.log(`Done with link ${link}`);
}

transferToken(MINT, SRC, DST, 2*10**9);