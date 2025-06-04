import { ethers } from "ethers";
import axios from 'axios';

const PINATA_API_KEY = import.meta.env.VITE_PINATA_API_KEY;
const PINATA_SECRET_API_KEY = import.meta.env.VITE_PINATA_SECRET_API_KEY;

const pinFileToIPFS = async (file) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  const formData = new FormData();
  formData.append('file', file);

  const res = await axios.post(url, formData, {
    maxBodyLength: 'Infinity',
    headers: {
      'Content-Type': 'multipart/form-data',
      pinata_api_key: PINATA_API_KEY,
      pinata_secret_api_key: PINATA_SECRET_API_KEY,
    },
  });

  return `ipfs://${res.data.IpfsHash}`;
};

const pinJSONToIPFS = async (metadata) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

  const res = await axios.post(url, metadata, {
    headers: {
      pinata_api_key: PINATA_API_KEY,
      pinata_secret_api_key: PINATA_SECRET_API_KEY,
    },
  });

  return `ipfs://${res.data.IpfsHash}`;
};

const submit = async (title, description, file) => {
  if (!file) {
    alert('No file provided');
    return;
  }

  const mimeType = file.type;
  const fileIpfsUri = await pinFileToIPFS(file);

  if (!mimeType.startsWith('image/')) {
    alert("Pinata/IPFS metadata must have an 'image' preview for ERC-721 compliance.");
    return;
  }

  const metadata = {
    name: title,
    description: description,
    image: fileIpfsUri,
  };

  const metadataUri = await pinJSONToIPFS(metadata);

  console.log('File IPFS URI:', fileIpfsUri);
  console.log('Metadata IPFS URI:', metadataUri);

   const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();


    const address = "0x6ab2257CEE44fd351E4e675a35006DA6734EdA36";
    const abi = [{"type":"constructor","inputs":[{"name":"_artistSubscription","type":"address","internalType":"address"}],"stateMutability":"nonpayable"},{"type":"function","name":"getSubmission","inputs":[{"name":"_submissionId","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"tuple","internalType":"struct ArtistSubmission.Submission","components":[{"name":"id","type":"uint256","internalType":"uint256"},{"name":"timestamp","type":"uint256","internalType":"uint256"},{"name":"artist","type":"address","internalType":"address"},{"name":"contentHash","type":"string","internalType":"string"}]}],"stateMutability":"view"},{"type":"function","name":"newSubmission","inputs":[{"name":"_contentHash","type":"string","internalType":"string"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"nonpayable"},{"type":"function","name":"owner","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"renounceOwnership","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"s_artistSubscription","inputs":[],"outputs":[{"name":"","type":"address","internalType":"contract ArtistSubscription"}],"stateMutability":"view"},{"type":"function","name":"s_dao","inputs":[],"outputs":[{"name":"","type":"address","internalType":"contract Dao"}],"stateMutability":"view"},{"type":"function","name":"s_submissionId","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"s_submissions","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"id","type":"uint256","internalType":"uint256"},{"name":"timestamp","type":"uint256","internalType":"uint256"},{"name":"artist","type":"address","internalType":"address"},{"name":"contentHash","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"setDao","inputs":[{"name":"_dao","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"transferOwnership","inputs":[{"name":"newOwner","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"event","name":"OwnershipTransferred","inputs":[{"name":"previousOwner","type":"address","indexed":true,"internalType":"address"},{"name":"newOwner","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"SubmissionCreated","inputs":[{"name":"submissionId","type":"uint256","indexed":true,"internalType":"uint256"},{"name":"artist","type":"address","indexed":true,"internalType":"address"},{"name":"contentHash","type":"string","indexed":false,"internalType":"string"}],"anonymous":false},{"type":"error","name":"Not_Artist","inputs":[]},{"type":"error","name":"OwnableInvalidOwner","inputs":[{"name":"owner","type":"address","internalType":"address"}]},{"type":"error","name":"OwnableUnauthorizedAccount","inputs":[{"name":"account","type":"address","internalType":"address"}]},{"type":"error","name":"Reached_Max_Submissions_This_Week","inputs":[]},{"type":"error","name":"Subscription_Expired","inputs":[]}];
    const contract = new ethers.Contract(address, abi, signer)

    const tx = await contract.newSubmission(metadataUri);
    console.log("Transaction sent, hash: ", tx.hash);
    await tx.wait();
    console.log("Submitted!");

  return metadataUri;
};

export default submit;
