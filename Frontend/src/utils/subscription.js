import { ethers } from "ethers";

const subscribe = async(subscriptionType, price) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const abi = [{"type":"constructor","inputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"getMaxSubmissionsPerWeek","inputs":[{"name":"_type","type":"uint8","internalType":"enum ArtistSubscription.SubscriptionType"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getPercentageRoyalties","inputs":[{"name":"_type","type":"uint8","internalType":"enum ArtistSubscription.SubscriptionType"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getSubscription","inputs":[{"name":"_artist","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"tuple","internalType":"struct ArtistSubscription.Subscription","components":[{"name":"artist","type":"address","internalType":"address"},{"name":"subscriptionType","type":"uint8","internalType":"enum ArtistSubscription.SubscriptionType"},{"name":"expirationDate","type":"uint256","internalType":"uint256"},{"name":"lastWeekSubmissions","type":"uint256","internalType":"uint256"},{"name":"lastSubmission","type":"uint256","internalType":"uint256"}]}],"stateMutability":"view"},{"type":"function","name":"getSubscriptionPrice","inputs":[{"name":"_type","type":"uint8","internalType":"enum ArtistSubscription.SubscriptionType"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"isArtistSubscribed","inputs":[{"name":"_artist","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"renewSubscription","inputs":[{"name":"_type","type":"uint8","internalType":"enum ArtistSubscription.SubscriptionType"},{"name":"_duration","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"s_isArtist","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"s_maxSubmissionsPerWeek","inputs":[{"name":"","type":"uint8","internalType":"enum ArtistSubscription.SubscriptionType"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"s_percentageRoyalties","inputs":[{"name":"","type":"uint8","internalType":"enum ArtistSubscription.SubscriptionType"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"s_subscriptionPrices","inputs":[{"name":"","type":"uint8","internalType":"enum ArtistSubscription.SubscriptionType"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"s_subscriptions","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"artist","type":"address","internalType":"address"},{"name":"subscriptionType","type":"uint8","internalType":"enum ArtistSubscription.SubscriptionType"},{"name":"expirationDate","type":"uint256","internalType":"uint256"},{"name":"lastWeekSubmissions","type":"uint256","internalType":"uint256"},{"name":"lastSubmission","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"subscribe","inputs":[{"name":"_type","type":"uint8","internalType":"enum ArtistSubscription.SubscriptionType"},{"name":"_duration","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"payable"},{"type":"event","name":"SubscriptionCreated","inputs":[{"name":"artist","type":"address","indexed":true,"internalType":"address"},{"name":"subscriptionType","type":"uint8","indexed":false,"internalType":"enum ArtistSubscription.SubscriptionType"},{"name":"expirationDate","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"SubscriptionRenewed","inputs":[{"name":"artist","type":"address","indexed":true,"internalType":"address"},{"name":"subscriptionType","type":"uint8","indexed":false,"internalType":"enum ArtistSubscription.SubscriptionType"},{"name":"expirationDate","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"error","name":"Already_Subscribed","inputs":[]},{"type":"error","name":"Insufficient_Payment","inputs":[]},{"type":"error","name":"Not_Artist","inputs":[]}];
    const address = "0x60d355DFA8B93E99D0555D159ab990E613028DCa";

    const contract = new ethers.Contract(address, abi, signer);
    const duration = 30 * 24 * 60 * 60;

    let type;
    if (subscriptionType == "Basic Plan")
    {
        price = "0.05"
        type = 0;
    }
    if (subscriptionType == "Premium Plan")
    {
        price = "0.1"
        type = 1;
    }
    if (subscriptionType == "Pro Plan")
    {
        price = "0.2"
        type = 2;
    }
    const priceInEther = ethers.parseEther(price);

    const tx = await contract.subscribe(type, duration, {
        value: priceInEther
    })

    console.log("subscription transaction sent, tx hash: ", tx.hash);
    await tx.wait();
    console.log("Subscription made");
}

export default subscribe;
