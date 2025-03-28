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

const METADATA_URI = "https://gateway.irys.xyz/2hoUrQnaLbmUzfwge91kXWp3FBjUdS3tffJeYaZdjPje";

async function uploadMetadata() {
    try{
        const metadata={
            name: "Comets Husky",
            symbol: "CRUG",
            description: "This is a nice husky",
            image: IMG_URI,
            attributes: [
                { trait_type: "Color", value: "gray" },
                { trait_type: "Material", value: "steel" },
                { trait_type: "Size", value: "very big" },
            ],
            properties: {
                files: [{ type: "image/png", uri: IMG_URI }],
            },
        };
        const metadataUri = await umi.uploader.uploadJson(metadata);

        console.log("Done with metadata URI:", metadataUri);
    }catch(error){
        console.error("[uploadMetadata] Failed with:", error);
    }

}
uploadMetadata();
