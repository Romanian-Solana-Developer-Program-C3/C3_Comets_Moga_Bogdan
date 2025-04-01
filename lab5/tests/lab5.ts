import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Lab5 } from "../target/types/lab5";
import { publicKey } from "@coral-xyz/anchor/dist/cjs/utils";

describe("lab5", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.lab5 as Program<Lab5>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });

  it("Save a user's favorites", async() => {
    const favoritesPdaAndBump = await publicKey.findProgramAddress(
      []
    )
  })
});
