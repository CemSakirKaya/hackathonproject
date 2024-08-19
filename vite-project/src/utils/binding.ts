import {
  AbstractProvider,
  Contract,
  JsonRpcSigner,
  ethers,
  isError,
} from "ethers";
const provider = new ethers.JsonRpcProvider(
  "https://sepolia-rollup.arbitrum.io/rpc",
);

export const PUBLIC_CONTRACT_ADDRESS =
  "0x1811fb541909390bb3ecb08a30799e7c0870e214";

export const LaunchPadManagerAbi = `[ { "type": "function", "name": "LaunchPadsLenght", "inputs": [], "outputs": [ { "name": "", "type": "uint256", "internalType": "uint256" } ], "stateMutability": "view" }, { "type": "function", "name": "createLaunchPadFromExist", "inputs": [ { "name": "token_", "type": "address", "internalType": "address" }, { "name": "launchpad_pools_", "type": "tuple[]", "internalType": "struct CreatePool[]", "components": [ { "name": "poolTokenAddress", "type": "address", "internalType": "address" }, { "name": "launchTokenAmount", "type": "uint256", "internalType": "uint256" } ] }, { "name": "launchPadTime_", "type": "uint256", "internalType": "uint256" } ], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "launchPads", "inputs": [ { "name": "", "type": "uint256", "internalType": "uint256" } ], "outputs": [ { "name": "", "type": "address", "internalType": "contract LaunchPad" } ], "stateMutability": "view" }, { "type": "function", "name": "listLaunchPads", "inputs": [], "outputs": [ { "name": "", "type": "address[]", "internalType": "contract LaunchPad[]" } ], "stateMutability": "view" } ]`;
export const LaunchPadPoolAbi = `[ { "type": "constructor", "inputs": [ { "name": "token_", "type": "address", "internalType": "address" }, { "name": "pools_", "type": "tuple[]", "internalType": "struct CreatePool[]", "components": [ { "name": "poolTokenAddress", "type": "address", "internalType": "address" }, { "name": "launchTokenAmount", "type": "uint256", "internalType": "uint256" } ] }, { "name": "launchPadTime_", "type": "uint256", "internalType": "uint256" } ], "stateMutability": "nonpayable" }, { "type": "function", "name": "getLaunchPadData", "inputs": [], "outputs": [ { "name": "", "type": "tuple", "internalType": "struct LaunchPadDataView", "components": [ { "name": "isStarted", "type": "bool", "internalType": "bool" }, { "name": "pools", "type": "tuple[]", "internalType": "struct PoolData[]", "components": [ { "name": "poolTokenAddress", "type": "address", "internalType": "address" }, { "name": "launchTokenAmount", "type": "uint256", "internalType": "uint256" }, { "name": "poolAddress", "type": "address", "internalType": "address" } ] }, { "name": "launchTokenAddress", "type": "address", "internalType": "address" }, { "name": "totalLaunchTokenAmount", "type": "uint256", "internalType": "uint256" }, { "name": "launchToken", "type": "address", "internalType": "address" }, { "name": "launchpadTime", "type": "uint256", "internalType": "uint256" } ] } ], "stateMutability": "view" }, { "type": "function", "name": "owner", "inputs": [], "outputs": [ { "name": "", "type": "address", "internalType": "address" } ], "stateMutability": "view" }, { "type": "function", "name": "pools", "inputs": [ { "name": "", "type": "uint256", "internalType": "uint256" } ], "outputs": [ { "name": "poolTokenAddress", "type": "address", "internalType": "address" }, { "name": "launchTokenAmount", "type": "uint256", "internalType": "uint256" }, { "name": "poolAddress", "type": "address", "internalType": "address" } ], "stateMutability": "view" }, { "type": "function", "name": "renounceOwnership", "inputs": [], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "startPools", "inputs": [], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "transferOwnership", "inputs": [ { "name": "newOwner", "type": "address", "internalType": "address" } ], "outputs": [], "stateMutability": "nonpayable" }, { "type": "event", "name": "OwnershipTransferred", "inputs": [ { "name": "previousOwner", "type": "address", "indexed": true, "internalType": "address" }, { "name": "newOwner", "type": "address", "indexed": true, "internalType": "address" } ], "anonymous": false }, { "type": "error", "name": "OwnableInvalidOwner", "inputs": [ { "name": "owner", "type": "address", "internalType": "address" } ] }, { "type": "error", "name": "OwnableUnauthorizedAccount", "inputs": [ { "name": "account", "type": "address", "internalType": "address" } ] } ]`;
export const LaunchPadAbi = `[ { "type": "constructor", "inputs": [ { "name": "poolTokenAddress_", "type": "address", "internalType": "address" }, { "name": "launchTokenAddress_", "type": "address", "internalType": "address" } ], "stateMutability": "nonpayable" }, { "type": "function", "name": "claimToken", "inputs": [], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "dexAddress", "inputs": [], "outputs": [ { "name": "", "type": "address", "internalType": "address" } ], "stateMutability": "view" }, { "type": "function", "name": "getLockedAmount", "inputs": [ { "name": "addr", "type": "address", "internalType": "address" } ], "outputs": [ { "name": "", "type": "uint256", "internalType": "uint256" } ], "stateMutability": "view" }, { "type": "function", "name": "isStarted", "inputs": [], "outputs": [ { "name": "", "type": "bool", "internalType": "bool" } ], "stateMutability": "view" }, { "type": "function", "name": "launchPadContractAddress", "inputs": [], "outputs": [ { "name": "", "type": "address", "internalType": "address" } ], "stateMutability": "view" }, { "type": "function", "name": "launchPadEndDate", "inputs": [], "outputs": [ { "name": "", "type": "uint256", "internalType": "uint256" } ], "stateMutability": "view" }, { "type": "function", "name": "lockToken", "inputs": [ { "name": "amount", "type": "uint256", "internalType": "uint256" } ], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "owner", "inputs": [], "outputs": [ { "name": "", "type": "address", "internalType": "address" } ], "stateMutability": "view" }, { "type": "function", "name": "poolTokenAmount", "inputs": [], "outputs": [ { "name": "", "type": "uint256", "internalType": "uint256" } ], "stateMutability": "view" }, { "type": "function", "name": "renounceOwnership", "inputs": [], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "startPool", "inputs": [ { "name": "launchPadTime_", "type": "uint256", "internalType": "uint256" } ], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "totalAvgLock", "inputs": [], "outputs": [ { "name": "", "type": "uint256", "internalType": "uint256" } ], "stateMutability": "view" }, { "type": "function", "name": "transferOwnership", "inputs": [ { "name": "newOwner", "type": "address", "internalType": "address" } ], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "unlockToken", "inputs": [], "outputs": [], "stateMutability": "nonpayable" }, { "type": "event", "name": "OwnershipTransferred", "inputs": [ { "name": "previousOwner", "type": "address", "indexed": true, "internalType": "address" }, { "name": "newOwner", "type": "address", "indexed": true, "internalType": "address" } ], "anonymous": false }, { "type": "error", "name": "OwnableInvalidOwner", "inputs": [ { "name": "owner", "type": "address", "internalType": "address" } ] }, { "type": "error", "name": "OwnableUnauthorizedAccount", "inputs": [ { "name": "account", "type": "address", "internalType": "address" } ] } ]`;

type CreatePool = {
  poolTokenAddress: String;
  launchTokenAmount: Number;
};

const launchPadManagerContractNoSigner = new Contract(
  PUBLIC_CONTRACT_ADDRESS,
  LaunchPadManagerAbi,
  provider,
);

//it will return the address of launchpads
export async function listLaunchPadsAddress() {
  try {
    let result = await launchPadManagerContractNoSigner.listLaunchPads();
    return result;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

//it will take launchPad address and return launchPad Data
export async function getLaunchPadData(address: string) {
  try {
    const launchPadContract = new Contract(
      PUBLIC_CONTRACT_ADDRESS,
      LaunchPadManagerAbi,
    );
    let result = await launchPadContract.getLaunchPadData(address);
    return result;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function createLaunchPadFromExist(
  signer: JsonRpcSigner,
  token: string,
  launchpad_pools: CreatePool[],
  launchPadTime: Number,
) {
  try {
    const launchPadContract = new Contract(
      PUBLIC_CONTRACT_ADDRESS,
      LaunchPadManagerAbi,
      signer,
    );
    let tx = await launchPadContract.createLaunchPadFromExist(
      token,
      launchpad_pools,
      launchPadTime,
    );
    return await tx.wait();
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function startPools(signer: JsonRpcSigner, address: string) {
  try {
    const launchPadContract = new Contract(address, LaunchPadAbi, signer);
    let tx = await launchPadContract.startPools();
    return await tx.wait();
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function getLockedAmount(signer: JsonRpcSigner, address: string) {
  try {
    const launchPadPoolContract = new Contract(
      address,
      LaunchPadPoolAbi,
      signer,
    );
    let tx = await launchPadPoolContract.getLockedAmount();
    return await tx.wait();
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function claimToken(
  signer: JsonRpcSigner,
  address: string,
  amount: Number,
) {
  try {
    const launchPadPoolContract = new Contract(
      address,
      LaunchPadPoolAbi,
      signer,
    );
    let tx = await launchPadPoolContract.claimToken(amount);
    return await tx.wait();
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function lockToken(
  signer: JsonRpcSigner,
  address: string,
  amount: Number,
) {
  try {
    const launchPadPoolContract = new Contract(
      address,
      LaunchPadPoolAbi,
      signer,
    );
    let tx = await launchPadPoolContract.unlockToken(amount);
    return await tx.wait();
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function unlockToken(signer: JsonRpcSigner, address: string) {
  try {
    const launchPadPoolContract = new Contract(
      address,
      LaunchPadPoolAbi,
      signer,
    );
    let tx = await launchPadPoolContract.unlockToken();
    return await tx.wait();
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function createToken(signer: JsonRpcSigner, address: string) {
  try {
    const launchPadPoolContract = new Contract(
      address,
      LaunchPadPoolAbi,
      signer,
    );
    let tx = await launchPadPoolContract.unlockToken();
    return await tx.wait();
  } catch (e) {
    console.log(e);
    throw e;
  }
}
