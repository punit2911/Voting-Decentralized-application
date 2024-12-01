import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import VotingContract from './contracts/Voting.json';

function App() {
  const [account, setAccount] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const init = async () => {
      const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = VotingContract.networks[networkId];
      const instance = new web3.eth.Contract(VotingContract.abi, deployedNetwork && deployedNetwork.address);

      setAccount(accounts[0]);
      setContract(instance);
      loadCandidates(instance);
    };

    init();
  }, []);

  const loadCandidates = async (instance) => {
    const candidatesCount = await instance.methods.candidatesCount().call();
    const candidatesList = [];
    for (let i = 1; i <= candidatesCount; i++) {
      const candidate = await instance.methods.candidates(i).call();
      candidatesList.push(candidate);
    }
    setCandidates(candidatesList);
  };

  const addCandidate = async (name) => {
    if (!name) {
      alert("Candidate name cannot be empty!");
      return;
    }

    try {
      await contract.methods.addCandidate(name).send({ from: account });
      console.log("Candidate added:", name);
      loadCandidates(contract);
    } catch (error) {
      console.error("Error adding candidate:", error.message || error);
      alert("Failed to add candidate. See console for details.");
    }
  };

  return (
    <div>
      <h1>Voting DApp</h1>
      <h2>Your Account: {account}</h2>
      <h3>Candidates:</h3>
      <ul>
        {candidates.map(candidate => (
          <li key={candidate.id}>{candidate.name} - Votes: {candidate.voteCount}</li>
        ))}
      </ul>
      <button onClick={() => addCandidate(prompt("Enter candidate name"))}>Add Candidate</button>
    </div>
  );
}

export default App;
