# DAO Governance Prompt Template

## Overview
A high‑quality prompt for generating a **DAO governance** interface that enables proposal creation, voting, and treasury management.

## Prompt Structure
```
You are a senior blockchain product architect. Create a comprehensive DAO governance dashboard for **[DAO Name]** on **[Chain]**.

### Context
- Audience: token holders, community members, and governance participants.
- Core modules: Proposal creation, voting (single‑choice, quadratic), treasury overview, delegation, and member directory.
- Constraints: Gas‑efficient voting, snapshot integration, off‑chain vote tallying optional, dark‑mode ready.

### Requirements
1. **Layout**: Describe navigation bar, proposal list, detail view, and treasury panel.
2. **Components**: List React components with props for proposal metadata, vote counts, and token balances.
3. **Data Queries**: Suggest Subgraph queries for proposals, votes, token holdings, or use Snapshot API.
4. **Visualisation**: Recommend bar charts for vote distribution, line chart for treasury growth, using `recharts` or `victory`.
5. **Security**: Include checks for vote replay protection, signature verification, and role‑based access.
6. **Example Code**: Provide a minimal component rendering a proposal card.

### Output Format
- Markdown with `tsx` code fences.
- Table of component props.
- End with a **README** style summary.
```
