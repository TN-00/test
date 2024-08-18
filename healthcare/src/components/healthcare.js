import React, {useState, useEffect} from 'react';
import {ethers} from 'ethers';

const Healthcare = () => {
    //defining states
    const [contract, setContract] = useState();
    const [account, setAccount] = useState();
    const [owner, setOwner] = useState(null);
    const [provider, setProvider] = useState();
    const [signer, setSigner] = useState();
    const [providerAddress, setProviderAddress] = useState();
    const [patientID, setPatientID] = useState('');
    const [patientRecords, setPatientRecords] = useState([]); //storing in a form of array
    const [diagnosis, setDiagnosis] = useState();
    const [treatment, setTreatment] = useState();


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
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "doctorAddress",
                    "type": "address"
                }
            ],
            "name": "DoctorAdded",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "patientAddress",
                    "type": "address"
                }
            ],
            "name": "PatientAdded",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "name": "PatientRecordAdded",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "PatientHealthRecordCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "addDoctor",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_patientId",
                    "type": "address"
                }
            ],
            "name": "addPatient",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "patientRecordId",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "diagnosis",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "prescription",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "id",
                    "type": "address"
                }
            ],
            "name": "addPatientRecord",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "displayPatient",
            "outputs": [],
            "stateMutability": "nonpayable",
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
            "name": "displayPatientRecord",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "patientRecordId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "id",
                            "type": "address"
                        },
                        {
                            "internalType": "string",
                            "name": "diagnosis",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "prescription",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "timestamp",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct PatientHealthRecord.PatientRecord[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "doctors",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "id",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "doctorId",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "doctorName",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "editPatient",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_patientId",
                    "type": "address"
                }
            ],
            "name": "getPatientExists",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getSenderRole",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "patientRecords",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "patientRecordId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "id",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "diagnosis",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "prescription",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "timestamp",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "patients",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "id",
                    "type": "address"
                },
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
                    "internalType": "uint256",
                    "name": "age",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]

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

                // const ownerAddress = await contract.getOwner();
                const ownerAddress = await contract.address;
                setOwner(accountAddress.toLowerCase() === ownerAddress.toLowerCase());
            } catch (error) {
                console.error("error connecting to wallet: ", error)
            }
        };
        connectWallet();
    }, []);

    const authorizeProvider = async () => {
        // only owner can run this function
        if(owner === contract.address){
            try{
                const tx = await contract.authorizeProvider(providerAddress);
                await tx.wait();
                //to raise an alert
                alert(`provider ${providerAddress} authorized successfully`)
            } catch(error){
                console.log(`provider ${providerAddress} failed to authorized`)
            }
        } else {
            //to raise an alert
            alert("Only contract can authorize different providers")
        }
        
    }

    const fetchPatientRecords = async () => {
        try {
            const records = await contract.getPatientRecords(patientID);
            setPatientRecords(records);
            console.log(records);
        }catch(error){
            console.log("Cannot fetch patient records")
        }
    }

    const addPatientRecord = async () => {
        try {
            const transaction = await contract.addPatientRecord(patientID, "John", diagnosis, treatment);
            await transaction.wait();
            fetchPatientRecords();
            
        }catch(error){
            console.log("Error adding records", error)
        }
    }

    return(
        <>
            <div className='form-section2'>
                <h2>Fetch Patient Records</h2>
                <input className='input-field' type='text' placeholder='Enter patient ID' value={patientID} onChange={(e) => setPatientID(e.target.value)}/>
                <button className='action-button' onClick={fetchPatientRecords}>Fetch records</button>
            </div>

            <div className='form-section'>
                <h2>Authorize Healthcare Provider</h2>
                <input className='input-field'
                    type='text'
                    placeholder='Provider Address'
                    value={providerAddress}
                    onChange={(e) => setProviderAddress(e.target.value)}
                />
                <button className='action-btn'
                    onClick={authorizeProvider}
                >Authorise provider</button>
            </div>

            <div className='form-section'>
                <h2>Add patient record</h2>
                <input className='input-field'
                    type='text'
                    placeholder='Diagnosis'
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                />

                <input className='input-field'
                    type='text'
                    placeholder='Treatment'
                    value={treatment}
                    onChange={(e) => setTreatment(e.target.value)}
                />
                <button className='action-btn'
                   onClick={addPatientRecord}
                >Add patient record</button>
            </div>

            <div className='form-section'>
                <h2>Patient record</h2>
                {patientRecords.map((record, index) => (
                    <div key={index}>
                        <p>Record ID: {record.recordID.toNumber()}</p>
                        <p>Record ID: {new Date}</p>
                    </div>
                ))}
            </div>
            
        </>
        
    )

}

export default Healthcare;