import Punto2JSON from "../build/contracts/Punto2.json"
import Web3 from 'web3';
var contract = require('@truffle/contract');
import {ethers} from 'ethers';

export const load = async () => {

    await loadWeb3();
    const addressAccount = await loadAccount();
    const punto2Contract = await loadContract();

    return {addressAccount, punto2Contract };
};

export const returnContract = async () => {
    const punto2Contract = await loadContract();

    return {punto2Contract};
}

export const consultCertificates = async (id) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = await provider.getSigner();
    const punto2Contract = new ethers.Contract("0x51889B23c145B71Af0267129e4d2059337729FB9", Punto2JSON, signer)
    const certified = await punto2Contract.checkCertified(id);
    // const consult = await punto2Contract.checkCertified(id)

    return certified
}

export const addCertificates = async (id, studentName, date, courseName) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = await provider.getSigner();
    const punto2Contract = new ethers.Contract("0x51889B23c145B71Af0267129e4d2059337729FB9", Punto2JSON, signer)
    const certified = await punto2Contract.addCertified(id, studentName, date, courseName);
    

    return certified;
}

export const addAddress = async(newAddressAccount) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = await provider.getSigner();
    const punto2Contract = new ethers.Contract("0x51889B23c145B71Af0267129e4d2059337729FB9", Punto2JSON, signer)
    await punto2Contract.autorizeAddress(newAddressAccount);
    return "The new address was added correctly"
}
// const loadTasks = async (punto2Contract, addressAccount) => {
//     const tasksCount = await punto2Contract.tasksCount(addressAccount);
//     const tasks = [];
//     for (var i = 0; i < tasksCount; i++) {
//         const task = await punto2Contract.tasks(addressAccount, i);
//         tasks.push(task);
//     }
//     return tasks
// };

const loadContract = async () => {

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    
    const punto2Contract = new ethers.Contract("0x2209D5ff752581A86C4C45F145308aaf17D72461", Punto2JSON, provider)
    // const theContract = contract(Punto2JSON);
    // theContract.setProvider(web3.eth.currentProvider);
    // console.log("Gemiditos")
    // console.log(web3.eth.givenProvider)
    // const punto2Contract = await theContract.deployed();
    return punto2Contract
};

const loadAccount = async () => {
    const addressAccount = await web3.eth.getCoinbase();
    return addressAccount;
};

const loadWeb3 = async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await ethereum.enable();
            // Acccounts now exposed
            web3.eth.sendTransaction({/* ... */});
        } catch (error) {
            // User denied account access...
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */});
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
};