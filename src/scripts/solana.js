import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import {
  Program,
  AnchorProvider,
  web3,
  utils,
  BN,
} from "@project-serum/anchor";

import idl from "../config/idl.json";

const programId = new PublicKey(idl.metadata.address);
const network = clusterApiUrl("devnet");
const opts = {
  preflightCommitment: "processed",
};
const { SystemProgram } = web3;

const createHub = async (hubName, kwhPrice, totalPorts) => {
  const provider = getProvider();
  const program = new Program(idl, programId, provider);

  console.log(
    "creating a new hub for user ",
    provider.wallet.publicKey.toString()
  );

  const [hub] = await PublicKey.findProgramAddress(
    [
      utils.bytes.utf8.encode("tcc_bc_smart_contract"),
      provider.wallet.publicKey.toBuffer(),
    ],
    program.programId
  );

  console.log(programId.toString());
  console.log(hub.toString());
  await program.methods
    .create(hubName, new BN(kwhPrice), new BN(totalPorts))
    .accounts({
      hub: hub,
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
