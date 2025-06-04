
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ArtistSubscription} from "./ArtistSubscription.sol";
import {Dao} from "./Dao.sol";
import {Ownable} from "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";

contract ArtistSubmission is Ownable {
    error Subscription_Expired();
    error Reached_Max_Submissions_This_Week();

    event SubmissionCreated(
        uint256 indexed submissionId,
        address indexed artist,
        string contentHash
    );

    uint256 public s_submissionId; // Auto-incrementing ID for each new submission.

    mapping(uint256 => Submission) public s_submissions;

    ArtistSubscription public s_artistSubscription;
    Dao public s_dao;

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

    function setDao(address _dao) public onlyOwner {
        s_dao = Dao(_dao);
    }

    function getSubmission(
        uint256 _submissionId
    ) public view returns (Submission memory) {
        return s_submissions[_submissionId];
    }
}
