import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { Program, AnchorProvider, web3, utils } from "@project-serum/anchor";

import idl from "../config/idl.json";

const programId = new PublicKey(idl.metadata.address);
const network = clusterApiUrl("devnet");
const opts = {
  preflightCommitment: "processed",
};
const { SystemProgram } = web3;

const createHub = async (hubName, kwhPrice, totalPorts) => {
  console.log("creating a new hub");
  const provider = getProvider();
  const program = new Program(idl, programId, provider);

  const hub = await PublicKey.findProgramAddress(
    [
      utils.bytes.utf8.encode("tcc-bc-smart-contract"),
      provider.wallet.publicKey.toBuffer(),
    ],
    program.programId
  );

  await program.methods
    .create(hubName, kwhPrice, totalPorts)
    .accounts({
      hub,
      user: provider.wallet.publicKey,
      systemProgram: web3.SystemProgram.programId,
    })
    .rpc();

  console.log(`created a new hub with address ${hub.toString()}`);
};

const getProvider = () => {
  const connection = new Connection(network, opts.preflightCommitment);
  const provider = new AnchorProvider(
    connection,
    window.solana,
    opts.preflightCommitment
  );
  return provider;
};

export default createHub;
