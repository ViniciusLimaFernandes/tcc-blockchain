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

export const createHub = async (hubName, kwhPrice, totalPorts) => {
  const keypair = web3.Keypair.generate();
  const provider = getProvider();
  const program = new Program(idl, programId, provider);

  console.log(
    "creating a new hub for user ",
    provider.wallet.publicKey.toString()
  );

  console.log(program);

  let tx = await program.methods
    .create(new BN(kwhPrice), new BN(totalPorts), hubName)
    .accounts({
      hub: keypair.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: web3.SystemProgram.programId,
    })
    .signers([keypair])
    .rpc();

  console.log(`created a new hub, transaction hash ${tx}`);
};

export const getAllHubs = () => {
  const provider = getProvider();
  const program = new Program(idl, programId, provider);

  let hubs = [];

  program.account.hub.all().then((blockchainHubs) => {
    blockchainHubs.map((h, index) => {
      const hub = {
        publicKey: h.publicKey.toString(),
        name: h.account.name.toString(),
        price: Number(h.account.kwhPrice),
        usages: Number(h.account.usages),
        ports: Number(h.account.totalPorts),
        balance: Number(h.account.balance),
      };

      hubs.push(hub);
    });
  });

  return hubs;
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
