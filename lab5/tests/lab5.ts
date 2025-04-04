import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Lab5 } from "../target/types/lab5";
import { publicKey } from "@coral-xyz/anchor/dist/cjs/utils";
import { assert, use } from "chai";

describe("lab5", () => {
  // Configure the client to use the local cluster.
  const web3 = anchor.web3;

  const provider = anchor.AnchorProvider.env();

  anchor.setProvider(provider);

  const program = anchor.workspace.lab5 as Program<Lab5>;

  const user = (provider.wallet as anchor.Wallet).payer;

  before(async() => {
    const balance = await provider.connection.getBalance(user.publicKey);
    const balanceInSol = balance / web3.LAMPORTS_PER_SOL;
    const formattedBalance = new Intl.NumberFormat().format(balanceInSol);
    console.log(`Balance: ${formattedBalance} SOL`);
  });
  

  it("Is initialized!", async () => {
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });

  it("Save a user's favorites to the blockchain", async() => {
    const favoriteNumber = new anchor.BN(317);
    const favoriteColor = "orange";
    const favoriteHobbies = ["skiing", "walking"];

    await program.methods
      .setFavorites(favoriteColor, favoriteNumber, favoriteHobbies)
      .signers ([user])
      .rpc();


    const favoritesPdaAndBump = web3.PublicKey.findProgramAddressSync(
      [Buffer.from("favorites"), user.publicKey.toBuffer()],
      program.programId
    );

    const favoritesPda = favoritesPdaAndBump[0];
    const dataFromPda = await program.account.favorites.fetch(favoritesPda);
    assert.equal(dataFromPda.color, favoriteColor);
    assert.equal(dataFromPda.number.toNumber(), favoriteNumber.toNumber());
    assert.deepEqual(dataFromPda.hobbies, favoriteHobbies);
    
  });

  it("Doesn't let people write to favorites for other users", async() =>{
    const randomUser = anchor.web3.Keypair.generate();
    try{
      await program.methods
        .setFavorites("red", new anchor.BN(201), ["sing"])
        .signers([randomUser])
        .rpc();
    }catch (error){
      const errorMessage = (error as Error).message;
      console.log(`Error message ... ${errorMessage}`);
      assert.isTrue(errorMessage.includes("unknown signer"));
    }
  });

});