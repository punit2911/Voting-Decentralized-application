// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    struct Voter {
        bool voted;
        uint vote;
    }

    address public owner;
    mapping(uint => Candidate) public candidates;
    mapping(address => Voter) public voters;
    uint public candidatesCount;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can execute this.");
        _;
    }

    modifier hasNotVoted() {
        require(!voters[msg.sender].voted, "You have already voted.");
        _;
    }

    modifier validCandidate(uint _candidateId) {
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate.");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addCandidate(string memory _name) public onlyOwner {
        require(bytes(_name).length > 0, "Candidate name cannot be empty."); // Ensure name is not empty
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote(uint _candidateId) public hasNotVoted validCandidate(_candidateId) {
        voters[msg.sender].voted = true;
        voters[msg.sender].vote = _candidateId;
        candidates[_candidateId].voteCount++;
    }

    function getCandidate(uint _candidateId) public view validCandidate(_candidateId) returns (uint, string memory, uint) {
        Candidate memory candidate = candidates[_candidateId];
        return (candidate.id, candidate.name, candidate.voteCount);
    }

    function getTotalCandidates() public view returns (uint) {
        return candidatesCount;
    }
}

