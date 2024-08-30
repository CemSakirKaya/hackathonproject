import {
  AbstractProvider,
  Contract,
  JsonRpcSigner,
  ethers,
  isError,
} from "ethers";
const provider = new ethers.JsonRpcProvider("https://sepolia.drpc.org");

export const PUBLIC_CONTRACT_ADDRESS =
  "0xA280800246ff8cf65AFe388efF461930E46cd6eF";
export const PUBLIC_ERC20PROXY_ADDRESS =
  "0xB488e502fFEBEB9b289599a8472b9BD37B952a28";
export const ERC20Abi = `[ { "constant": true, "inputs": [], "name": "name", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "approve", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "balance", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transfer", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" } ], "name": "allowance", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Transfer", "type": "event" } ]`;
export const LaunchPadManagerAbi = `[ { "type": "function", "name": "LaunchPadsLenght", "inputs": [], "outputs": [ { "name": "", "type": "uint256", "internalType": "uint256" } ], "stateMutability": "view" }, { "type": "function", "name": "createLaunchPadFromExist", "inputs": [ { "name": "token_", "type": "address", "internalType": "address" }, { "name": "launchpad_pools_", "type": "tuple[]", "internalType": "struct CreatePool[]", "components": [ { "name": "poolTokenAddress", "type": "address", "internalType": "address" }, { "name": "launchTokenAmount", "type": "uint256", "internalType": "uint256" } ] }, { "name": "launchPadTime_", "type": "uint256", "internalType": "uint256" } ], "outputs": [ { "name": "", "type": "address", "internalType": "contract LaunchPad" } ], "stateMutability": "nonpayable" }, { "type": "function", "name": "launchPads", "inputs": [ { "name": "", "type": "uint256", "internalType": "uint256" } ], "outputs": [ { "name": "", "type": "address", "internalType": "contract LaunchPad" } ], "stateMutability": "view" }, { "type": "function", "name": "listLaunchPads", "inputs": [], "outputs": [ { "name": "", "type": "address[]", "internalType": "contract LaunchPad[]" } ], "stateMutability": "view" } ]`;
export const LaunchPadAbi = `[ { "type": "constructor", "inputs": [ { "name": "token_", "type": "address", "internalType": "address" }, { "name": "pools_", "type": "tuple[]", "internalType": "struct CreatePool[]", "components": [ { "name": "poolTokenAddress", "type": "address", "internalType": "address" }, { "name": "launchTokenAmount", "type": "uint256", "internalType": "uint256" } ] }, { "name": "launchPadTime_", "type": "uint256", "internalType": "uint256" } ], "stateMutability": "nonpayable" }, { "type": "function", "name": "getLaunchPadData", "inputs": [], "outputs": [ { "name": "", "type": "tuple", "internalType": "struct LaunchPadDataView", "components": [ { "name": "isStarted", "type": "bool", "internalType": "bool" }, { "name": "pools", "type": "tuple[]", "internalType": "struct PoolData[]", "components": [ { "name": "poolTokenAddress", "type": "address", "internalType": "address" }, { "name": "launchTokenAmount", "type": "uint256", "internalType": "uint256" }, { "name": "poolAddress", "type": "address", "internalType": "address" } ] }, { "name": "launchTokenAddress", "type": "address", "internalType": "address" }, { "name": "totalLaunchTokenAmount", "type": "uint256", "internalType": "uint256" }, { "name": "launchToken", "type": "address", "internalType": "address" }, { "name": "launchpadTime", "type": "uint256", "internalType": "uint256" } ] } ], "stateMutability": "view" }, { "type": "function", "name": "owner", "inputs": [], "outputs": [ { "name": "", "type": "address", "internalType": "address" } ], "stateMutability": "view" }, { "type": "function", "name": "pools", "inputs": [ { "name": "", "type": "uint256", "internalType": "uint256" } ], "outputs": [ { "name": "poolTokenAddress", "type": "address", "internalType": "address" }, { "name": "launchTokenAmount", "type": "uint256", "internalType": "uint256" }, { "name": "poolAddress", "type": "address", "internalType": "address" } ], "stateMutability": "view" }, { "type": "function", "name": "renounceOwnership", "inputs": [], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "startPools", "inputs": [], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "transferOwnership", "inputs": [ { "name": "newOwner", "type": "address", "internalType": "address" } ], "outputs": [], "stateMutability": "nonpayable" }, { "type": "event", "name": "OwnershipTransferred", "inputs": [ { "name": "previousOwner", "type": "address", "indexed": true, "internalType": "address" }, { "name": "newOwner", "type": "address", "indexed": true, "internalType": "address" } ], "anonymous": false }, { "type": "error", "name": "OwnableInvalidOwner", "inputs": [ { "name": "owner", "type": "address", "internalType": "address" } ] }, { "type": "error", "name": "OwnableUnauthorizedAccount", "inputs": [ { "name": "account", "type": "address", "internalType": "address" } ] } ]`;
export const LaunchPadPoolAbi = `[ { "type": "constructor", "inputs": [ { "name": "poolTokenAddress_", "type": "address", "internalType": "address" }, { "name": "launchTokenAddress_", "type": "address", "internalType": "address" } ], "stateMutability": "nonpayable" }, { "type": "function", "name": "claimToken", "inputs": [], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "dexAddress", "inputs": [], "outputs": [ { "name": "", "type": "address", "internalType": "address" } ], "stateMutability": "view" }, { "type": "function", "name": "getLockedAmount", "inputs": [ { "name": "addr", "type": "address", "internalType": "address" } ], "outputs": [ { "name": "", "type": "uint256", "internalType": "uint256" } ], "stateMutability": "view" }, { "type": "function", "name": "isStarted", "inputs": [], "outputs": [ { "name": "", "type": "bool", "internalType": "bool" } ], "stateMutability": "view" }, { "type": "function", "name": "launchPadContractAddress", "inputs": [], "outputs": [ { "name": "", "type": "address", "internalType": "address" } ], "stateMutability": "view" }, { "type": "function", "name": "launchPadEndDate", "inputs": [], "outputs": [ { "name": "", "type": "uint256", "internalType": "uint256" } ], "stateMutability": "view" }, { "type": "function", "name": "lockToken", "inputs": [ { "name": "amount", "type": "uint256", "internalType": "uint256" } ], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "owner", "inputs": [], "outputs": [ { "name": "", "type": "address", "internalType": "address" } ], "stateMutability": "view" }, { "type": "function", "name": "poolTokenAmount", "inputs": [], "outputs": [ { "name": "", "type": "uint256", "internalType": "uint256" } ], "stateMutability": "view" }, { "type": "function", "name": "renounceOwnership", "inputs": [], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "startPool", "inputs": [ { "name": "launchPadTime_", "type": "uint256", "internalType": "uint256" } ], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "totalAvgLock", "inputs": [], "outputs": [ { "name": "", "type": "uint256", "internalType": "uint256" } ], "stateMutability": "view" }, { "type": "function", "name": "transferOwnership", "inputs": [ { "name": "newOwner", "type": "address", "internalType": "address" } ], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "unlockToken", "inputs": [], "outputs": [], "stateMutability": "nonpayable" }, { "type": "event", "name": "OwnershipTransferred", "inputs": [ { "name": "previousOwner", "type": "address", "indexed": true, "internalType": "address" }, { "name": "newOwner", "type": "address", "indexed": true, "internalType": "address" } ], "anonymous": false }, { "type": "error", "name": "OwnableInvalidOwner", "inputs": [ { "name": "owner", "type": "address", "internalType": "address" } ] }, { "type": "error", "name": "OwnableUnauthorizedAccount", "inputs": [ { "name": "account", "type": "address", "internalType": "address" } ] } ]`;
export const ERC20CreatorProxyAbi = `[ { "type": "function", "name": "createToken", "inputs": [ { "name": "initialSupply", "type": "uint256", "internalType": "uint256" }, { "name": "name", "type": "string", "internalType": "string" } ], "outputs": [ { "name": "", "type": "address", "internalType": "address" } ], "stateMutability": "nonpayable" } ] `;
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

export async function approve(
  signer: JsonRpcSigner,
  contractAddress: string,
  to: string,
  amount: string,
) {
  try {
    const tokenContract = new Contract(contractAddress, ERC20Abi, signer);
    const tx = await tokenContract.approve(to, amount);
    console.log(tx);
    return await tx.wait();
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function transfer(
  signer: JsonRpcSigner,
  contractAddress: string,
  to: string,
  amount: string,
) {
  try {
    const tokenContract = new Contract(contractAddress, ERC20Abi, signer);
    const tx = await tokenContract.transfer(to, amount);
    console.log(tx);
    return await tx.wait();
  } catch (e) {
    console.log(e);
    throw e;
  }
}

//it will take launchPad address and return launchPad Data
export async function getLaunchPadData(signer, address: string) {
  try {
    const launchPadContract = new Contract(address, LaunchPadAbi, signer);
    let result = await launchPadContract.getLaunchPadData();
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
    console.log(tx);
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

export async function createToken(
  signer: JsonRpcSigner,
  name: string,
  initialSupply: string,
) {
  try {
    const tokenCreatorProxyContract = new Contract(
      PUBLIC_ERC20PROXY_ADDRESS,
      ERC20CreatorProxyAbi,
      signer,
    );
    let tx = await tokenCreatorProxyContract.createToken(initialSupply, name);
    return await tx.wait();
  } catch (e) {
    console.log(e);
    throw e;
  }
}
