import React, {useState, useEffect} from 'react';
import {ethers} from 'ethers';

const Healthcare = () => {
    //defining states
    const [contract, setContract] = useState();
    const [account, setAccount] = useState();
    const [owner, setOwner] = useState();
    const [provider, setProvider] = useState();
    const [signer, setSigner] = useState();

    //Getting contract Address
    const contractAddress = "0xdAA3cb6DEa9B23d256D091294f49a859d28FB82f";
    const contractAddress2= "0xf1ec29Beb05b144AAf70D408b956848943524F38";
    const contractABI = [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "patientID",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "patientName",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "diagnosis",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "treatment",
                    "type": "string"
                }
            ],
            "name": "addRecord",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "provider",
                    "type": "address"
                }
            ],
            "name": "authorizedProvider",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getOwner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "patientID",
                    "type": "uint256"
                }
            ],
            "name": "getPatientRecords",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "recordID",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "patientName",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "diagnosis",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "treatment",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "timestamp",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct HealthcareRecords.Record[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];

    useEffect(() => {
        const connectWallet = async () => {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send('eth_requestAccounts', []);
                const signer = provider.getSigner();
                setProvider(provider);
                setSigner(signer);

                const accountAddress = await signer.getAddress();
                setAccount(accountAddress);
                console.log("account address is:" , accountAddress)
                
                const contract = new ethers.Contract(contractAddress2, contractABI);
                setContract(contract);

                const ownerAddress = await contract.getOwner();

                setOwner(accountAddress.toLowerCase() === ownerAddress.toLowerCase());
            } catch (error) {
                console.error("error connecting to wallet: ", error)
            }
        };
        connectWallet();
    }, []);

    return(
        <div className='container'>
            <h1>Connecting React app and meta mask</h1>
            <p className='account-info'>Connect account: {account}</p>
            <p className='owner-info'>Contract owner: {owner}</p> 
        </div>
    )

}

export default Healthcare;