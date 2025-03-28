import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi";
import { clusterApiUrl } from "@solana/web3.js";
import { readFile } from "fs/promises";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import "dotenv/config"

const kp = getKeypairFromEnvironment("SECRET_KEY");

const umi = createUmi(clusterApiUrl("devnet"));

const keypair = umi.eddsa.createKeypairFromSecretKey(kp.secretKey);
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

const IMAGE_FILE = "./nft_image.jpg"

const IMG_URI = "https://gateway.irys.xyz/HjDq8RSxtgX5DBoqNyGjGWhtsCPpGzqab6bBADTuBSFd";

export async function uploadImage() {
    try {
      console.log("Uploading image...");
      const img = await readFile(IMAGE_FILE);
  
      const imgConverted = createGenericFile(new Uint8Array(img), "image/png");
  
      const [myUri] = await umi.uploader.upload([imgConverted]);
  
      console.log("Done with URI:", myUri);
    } catch (err) {
      console.error("[uploadImage] failed with error:", err);
    }
  }
  uploadImage();