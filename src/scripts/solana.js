import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { Program, AnchorProvider, web3 } from "@project-serum/anchor";

import idl from "../config/idl.json";

const programId = new PublicKey(idl.metadata.address);
const network = clusterApiUrl("devnet");
const opts = {
  preflightCommitment: "processed",
};
const { SystemProgram } = web3;

const createHub = async (hubName, kwhPrice, totalPorts) => {
  console.log("creating a new hub");
  try {
    const provider = getProvider();
    const program = new Program(idl, programId, provider);

    const hub = await PublicKey.findProgramAddress(program.programId);

    await program.rpc.create(hubName, kwhPrice, totalPorts, {
      accounts: {
        hub,
        user: provider.wallet.publicKey,
        SystemProgram: SystemProgram.programId,
      },
    });

    console.log(`created a new hub with address ${hub.toString()}`);
  } catch (error) {
    console.error(`failed to create a hub ${error}`);
  }
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
