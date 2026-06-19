# NFT Marketplace Prompt Template

## Overview
A high‑quality prompt for generating an **NFT marketplace** UI that handles minting, buying, selling, and auctioning NFTs.

## Prompt Structure
```
You are a senior blockchain product designer. Create a comprehensive NFT marketplace for **[Platform Name]** on **[Chain]**.

### Context
- Audience: NFT collectors, creators, and artists.
- Core features: Minting, Listing, Fixed‑price sales, English/Auction sales, royalty management.
- Constraints: Gas‑efficient contract interactions, wallet‑connect integration, responsive design.

### Requirements
1. **Layout**: Describe header, collection grid, item detail modal.
2. **Components**: List React components with props for NFT metadata, price, owner.
3. **Data Queries**: Propose RPC calls or TheGraph queries to fetch token metadata and ownership.
4. **Visualisation**: Recommend gallery grid, carousel for NFT previews, using libraries like `react‑photo‑gallery`.
5. **Security**: Include checks for signature verification, replay protection, and royalty enforcement.
6. **Example Code**: Provide a minimal component displaying an NFT card.

### Output Format
- Markdown with `tsx` code fences.
- Table of component props.
- End with a **README** style summary.
```
