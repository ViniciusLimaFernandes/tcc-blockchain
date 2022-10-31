import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import {
  Program,
  AnchorProvider,
  web3,
  utils,
  BN,
} from "@project-serum/anchor";
import { totalCostInSol } from "./pricing";

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

  return tx;
};

export const useHub = async (totalKWh, kwhPrice, hubPublicKey) => {
  const provider = getProvider();
  const program = new Program(idl, programId, provider);

  console.log("using hub... ", provider.wallet.publicKey.toString());

  console.log(program);

  const costInSOL = await totalCostInSol(totalKWh, kwhPrice);

  let tx = await program.methods
    .useHub(new BN(costInSOL * web3.LAMPORTS_PER_SOL))
    .accounts({
      hub: hubPublicKey,
      user: provider.wallet.publicKey,
      systemProgram: web3.SystemProgram.programId,
    })
    .rpc();

  console.log(`using hub, transaction hash ${tx}`);

  return tx;
};

export const withdraw = async (hubPublicKey) => {
  const provider = getProvider();
  const program = new Program(idl, programId, provider);

  console.log("withdraw from hub ", hubPublicKey);

  console.log(program);

  let tx = await program.methods
    .withdraw()
    .accounts({
      hub: hubPublicKey,
      user: provider.wallet.publicKey,
    })
    .rpc();

  console.log(`withdraw from hub, transaction hash ${tx}`);

  return tx;
};

export const getAllHubs = () => {
  const provider = getProvider();
  const program = new Program(idl, programId, provider);

  let hubs = [];

  program.account.hub.all().then((blockchainHubs) => {
    blockchainHubs.map((h, index) => {
      const hub = {
        publicKeyObj: h.publicKey,
        publicKey: h.publicKey.toString(),
        name: h.account.name.toString(),
        price: Number(h.account.kwhPrice / 100),
        usages: Number(h.account.usages),
        ports: Number(h.account.totalPorts),
        balance: Number(h.account.balance / web3.LAMPORTS_PER_SOL),
        owner: h.account.owner.toString(),
      };

      hubs.push(hub);
    });

    hubs.sort((a, b) => (a.price > b.price ? 1 : -1));
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
