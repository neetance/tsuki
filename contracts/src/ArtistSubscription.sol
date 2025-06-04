// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ArtistSubscription {
    // Errors
    error Already_Subscribed();
    error Insufficient_Payment();
    error Not_Artist();

    // Events
    event SubscriptionCreated(
        address indexed artist,
        SubscriptionType subscriptionType,
        uint256 expirationDate
    );
    event SubscriptionRenewed(
        address indexed artist,
        SubscriptionType subscriptionType,
        uint256 expirationDate
    );

    // Enums and Mappings
    enum SubscriptionType {
        BASIC,
        PREMIUM,
        PRO
    }

    mapping(address => Subscription) public s_subscriptions;
    mapping(address => bool) public s_isArtist;
    mapping(SubscriptionType => uint256) public s_subscriptionPrices;
    mapping(SubscriptionType => uint256) public s_percentageRoyalties;
    mapping(SubscriptionType => uint256) public s_maxSubmissionsPerWeek;

    // Structs
    struct Subscription {
        address artist;
        SubscriptionType subscriptionType;
        uint256 expirationDate;
        uint256 lastWeekSubmissions;
        uint256 lastSubmission;
    }

    constructor() {
        s_subscriptionPrices[SubscriptionType.BASIC] = 0.01 ether;
        s_subscriptionPrices[SubscriptionType.PREMIUM] = 0.05 ether;
        s_subscriptionPrices[SubscriptionType.PRO] = 0.1 ether;

        s_percentageRoyalties[SubscriptionType.BASIC] = 5;
        s_percentageRoyalties[SubscriptionType.PREMIUM] = 10;
        s_percentageRoyalties[SubscriptionType.PRO] = 15;

        s_maxSubmissionsPerWeek[SubscriptionType.BASIC] = 2;
        s_maxSubmissionsPerWeek[SubscriptionType.PREMIUM] = 5;
        s_maxSubmissionsPerWeek[SubscriptionType.PRO] = 10;
    }

    // Functions

    /**
     * @dev Subscribes an artist to a subscription type with a specified duration.
     * @param _type The type of subscription (BASIC, PREMIUM, PRO).
     * @param _duration The duration of the subscription in seconds.
     * NOTE: The sender must send the exact amount of ether required for the subscription type.
     */
    function subscribe(
        SubscriptionType _type,
        uint256 _duration
    ) public payable {
        if (s_isArtist[msg.sender]) revert Already_Subscribed();
        if (msg.value < s_subscriptionPrices[_type]) {
            revert Insufficient_Payment();
        }

        s_isArtist[msg.sender] = true;
        s_subscriptions[msg.sender] = Subscription({
            artist: msg.sender,
            subscriptionType: _type,
            expirationDate: block.timestamp + _duration,
            lastWeekSubmissions: 0,
            lastSubmission: 0
        });

        emit SubscriptionCreated(
            msg.sender,
            _type,
            block.timestamp + _duration
        );
    }

    /**
     * @dev Renews an artist's subscription with a specified type and duration.
     * @param _type The type of subscription (BASIC, PREMIUM, PRO).
     * @param _duration The duration of the subscription in seconds.
     * NOTE: The sender must send the exact amount of ether required for the subscription type.
     */
    function renewSubscription(
        SubscriptionType _type,
        uint256 _duration
    ) public payable {
        Subscription storage subscription = s_subscriptions[msg.sender];
        if (subscription.expirationDate >= block.timestamp) {
            revert Already_Subscribed();
        }
        if (!s_isArtist[msg.sender]) revert Not_Artist();
        if (msg.value < s_subscriptionPrices[_type]) {
            revert Insufficient_Payment();
        }

        subscription.subscriptionType = _type;
        subscription.expirationDate = block.timestamp + _duration;

        emit SubscriptionRenewed(
            msg.sender,
            _type,
            block.timestamp + _duration
        );
    }

    /**
     * @dev Retrieves the subscription details of an artist.
     * @param _artist The address of the artist whose subscription details are to be retrieved.
     * @return The Subscription struct containing the artist's subscription details.
     * NOTE: If the artist is not subscribed, the function will return a default Subscription struct with zero values.
     */
    function getSubscription(
        address _artist
    ) public view returns (Subscription memory) {
        return s_subscriptions[_artist];
    }

    /**
     * @dev Checks if an artist is subscribed.
     * @param _artist The address of the artist to check.
     * @return A boolean indicating whether the artist is subscribed or not.
     */
    function isArtistSubscribed(address _artist) public view returns (bool) {
        return s_isArtist[_artist];
    }

    /**
     * @dev Retrieves the subscription price for a given subscription type.
     * @param _type The type of subscription (BASIC, PREMIUM, PRO).
     * @return The price of the subscription in wei.
     */
    function getSubscriptionPrice(
        SubscriptionType _type
    ) public view returns (uint256) {
        return s_subscriptionPrices[_type];
    }

    /**
     * @dev Retrieves the percentage royalties for a given subscription type.
     * @param _type The type of subscription (BASIC, PREMIUM, PRO).
     * @return The percentage royalties for the subscription type.
     */
    function getPercentageRoyalties(
        SubscriptionType _type
    ) public view returns (uint256) {
        return s_percentageRoyalties[_type];
    }

    /**
     * @dev Retrieves the maximum number of submissions allowed per week for a given subscription type.
     * @param _type The type of subscription (BASIC, PREMIUM, PRO).
     * @return The maximum number of submissions allowed per week for the subscription type.
     */
    function getMaxSubmissionsPerWeek(
        SubscriptionType _type
    ) public view returns (uint256) {
        return s_maxSubmissionsPerWeek[_type];
    }
}
