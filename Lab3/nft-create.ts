import { createGenericFile, createSignerFromKeypair, signerIdentity,  generateSigner, percentAmount} from "@metaplex-foundation/umi";
import { clusterApiUrl } from "@solana/web3.js";
import { readFile } from "fs/promises";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import { createNft, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { base58 } from "@metaplex-foundation/umi/serializers";
import "dotenv/config"

const kp = getKeypairFromEnvironment("SECRET_KEY");

const umi = createUmi(clusterApiUrl("devnet"));

const keypair = umi.eddsa.createKeypairFromSecretKey(kp.secretKey);
const signer = createSignerFromKeypair(umi, keypair);

umi.use(mplTokenMetadata());
umi.use(signerIdentity(signer));

const IMAGE_FILE = "./nft_image.jpg"

const IMG_URI = "https://gateway.irys.xyz/HjDq8RSxtgX5DBoqNyGjGWhtsCPpGzqab6bBADTuBSFd";

const METADATA_URI = "https://gateway.irys.xyz/2hoUrQnaLbmUzfwge91kXWp3FBjUdS3tffJeYaZdjPje";

async function createMyNft() {
    try {
      const mint = generateSigner(umi);
  
      let tx = createNft(umi, {
        name: "Comets Husky",
        mint,
        authority: signer,
        sellerFeeBasisPoints: percentAmount(100),
        isCollection: false,
        uri: METADATA_URI,
      });
  
      let result = await tx.sendAndConfirm(umi);
      const signature = base58.deserialize(result.signature);
  
      console.log("Done! with sig:", signature);
    } catch (error) {
      console.error("[createMyNft] Failed with:", error);
    }
  }
createMyNft();
