# Tsuki 🌙

## 📌 Project Overview

**Tsuki** is a decentralized anime art NFT protocol designed to support artists and reward creativity in a fair, gamified, and community-driven ecosystem.

Built on the **Xsolla zkEVM Testnet**, the protocol enables artists to create and monetize their artwork via NFTs, with mechanisms for governance, randomness, fair revenue sharing, and IPFS-based metadata storage.

---

## 🔁 Workflow

### 1. **Artist Onboarding**
- Artists first **buy a subscription** (Basic, Premium, or Pro).
- Subscriptions unlock access to DAO voting and submission rights.

### 2. **Artwork Submission**
- Subscribed artists **submit their artwork** (metadata + image).
- All assets are uploaded and stored via **IPFS**.

### 3. **DAO Review**
- Other active artists with valid subscriptions **vote on submissions**.
- If approved by the DAO, the artwork becomes eligible for minting.

### 4. **NFT Minting**
- Approved artwork is **minted as NFTs** with full metadata.
- Creator address, image link (IPFS), timestamp, and more are stored on-chain.

### 5. **Buying NFTs**
- Users visit the website and **purchase an NFT**.
- The system randomly selects **an unsold NFT** from the pool.
- This randomness adds an **element of surprise and rarity** for buyers.

### 6. **Revenue Sharing with Creators**
- When a random NFT is sold:
  - A **percentage of the sale** goes to the original artist.
  - Royalty tiers:
    - **Basic** subscription → 5%
    - **Premium** subscription → 10%
    - **Pro** subscription → 15%

---

## 🕹️ Use Cases

### 🎮 In-Game Collectibles
- NFTs can be used as characters, weapons, accessories, or skins in anime-themed games.
- Gamified rarity with randomized distribution enhances player engagement.

### 💎 Rarity-Driven Market Dynamics
- Random NFT assignment mimics **loot box mechanics** without compromising decentralization.
- Drives collector psychology with **scarcity and surprise**.

### 🧑‍🎨 Creator Recognition & Incentives
- Artists are incentivized through **automated royalties** based on sales.
- DAO voting helps ensure **only high-quality artwork** gets minted.

### 🔓 Access Tokens
- NFTs can double as access keys for exclusive:
  - Discord communities
  - Events or game beta tests
  - Limited drops or early content previews

### 🗳️ Artist-Only DAO Governance
- Governance is **exclusive to artists** with active subscriptions.
- Prevents spam, ensures curated content, and allows creators to **steer the direction** of the platform.

---

## 📜 Deployed Contract Addresses

| Contract              | Address                                      |
|-----------------------|----------------------------------------------|
| TsukiNFT              | `0x67d1069BDfa29AeBD4B062F3353606D1234BF960` |
| Dao                   | `0xf7084A4f9b9cBd31bC90A8CF6CFc5BED24b06116` |
| NFTSale               | `0x3146732E82752EFCf38F82bC863CD3A08E4518BF` |
| ArtistSubscription    | `0x1096DB1Be51621f711499F4a18F69e2D8606Cd4e` |
| ArtistSubmission      | `0x6ab2257CEE44fd351E4e675a35006DA6734EdA36` |

---

## 🔮 Future Additions

- **On-chain trait-based rarity scores**
- **Metadata composability** (e.g., NFT fusion or upgrades)
- DAO-curated **seasonal themes or art contests**
- **Staking NFTs** for XP or seasonal perks
- IPFS mirror redundancy via **Filecoin integrations**
- Real-time **royalty analytics dashboards**

---

## ⚙️ Technical Summary

- **Contracts Written In**: Solidity  
- **Deployment Network**: Xsolla zkEVM Testnet  
- **Architecture**:
  - IPFS for image + metadata
  - Role-based access for DAO votes and submissions
  - Random assignment logic in purchase function
  - Tiered royalty structure on sales

## 📺 Demo

Watch the demo video here: [YouTube - Tsuki Demo](https://www.youtube.com/watch?v=P8fAKpsU9yc)

## Live Demo

Check out the deployed project here: [Tsuki Frontend](https://tsukii-one.vercel.app/)

