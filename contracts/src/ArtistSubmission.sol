// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ArtistSubscription} from "./ArtistSubscription.sol";
import {Dao} from "./Dao.sol";
import {Ownable} from "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";

contract ArtistSubmission is Ownable {
    // Errors
    error Subscription_Expired();
    error Reached_Max_Submissions_This_Week();

    // Events
    event SubmissionCreated(
        uint256 indexed submissionId,
        address indexed artist,
        string contentHash
    );

    // State variables
    uint256 public s_submissionId; // Auto-incrementing ID for each new submission.

    mapping(uint256 => Submission) public s_submissions;

    ArtistSubscription public s_artistSubscription;
    Dao public s_dao;

    // Structs
    struct Submission {
        uint256 id; // For each unique submission (by any artist) , we create an id
        uint256 timestamp;
        address artist;
        string contentHash;
    }

    constructor(address _artistSubscription) Ownable(msg.sender) {
        s_artistSubscription = ArtistSubscription(_artistSubscription);
        s_submissionId = 0;
    }

    // Functions

    /**
     * @dev: Creates a new submission by an artist, which will be proposed to the DAO for review.
     * @param _contentHash The cid hash of the metadata and the artwork on ipfs.
     * @return submissionId The ID of the newly created submission.
     */
    function newSubmission(
        string memory _contentHash
    ) public returns (uint256) {
        if (!s_artistSubscription.isArtistSubscribed(msg.sender)) {
            revert ArtistSubscription.Not_Artist();
        }

        ArtistSubscription.Subscription
            memory subscription = s_artistSubscription.getSubscription(
                msg.sender
            );

        if (subscription.expirationDate < block.timestamp) {
            revert Subscription_Expired();
        }
        if (
            subscription.lastWeekSubmissions >=
            s_artistSubscription.getMaxSubmissionsPerWeek(
                subscription.subscriptionType
            )
        ) revert Reached_Max_Submissions_This_Week();
        subscription.lastWeekSubmissions++;
        subscription.lastSubmission = block.timestamp;

        Submission memory submission = Submission({
            id: s_submissionId,
            timestamp: block.timestamp,
            artist: msg.sender,
            contentHash: _contentHash
        });
        s_submissions[s_submissionId] = submission;
        s_dao.newSubmissionProposal(submission);
        s_submissionId++;

        emit SubmissionCreated(s_submissionId, msg.sender, _contentHash);
        return s_submissionId - 1;
    }

    /**
     * @dev Sets the DAO contract address that will handle the submission proposals.
     * @param _dao The address of the DAO contract that will handle the submission proposals.
     * NOTE: This function can only be called by the owner of the contract.
     */
    function setDao(address _dao) public onlyOwner {
        s_dao = Dao(_dao);
    }

    /**
     * @dev Retrieves a submission by its ID.
     * @param _submissionId The ID of the submission to retrieve.
     * @return The Submission struct containing the details of the submission.
     */
    function getSubmission(
        uint256 _submissionId
    ) public view returns (Submission memory) {
        return s_submissions[_submissionId];
    }
}
