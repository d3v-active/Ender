# DeFi Dashboard Prompt Template

## Overview
A high‑quality prompt for generating a **DeFi dashboard** that visualises lending, borrowing, liquidity pools, and yield farming metrics.

## Prompt Structure
```
You are a senior blockchain UI/UX architect. Create a comprehensive DeFi dashboard for **[Platform Name]** on **[Chain]**.

### Context
- Target audience: crypto‑savvy investors and DeFi analysts.
- Core modules: Lending, Borrowing, Liquidity Pools, Yield Farming, TVL, APR/APY tables, risk metrics.
- Design constraints: responsive, dark‑mode ready, gas‑optimised data fetching.

### Requirements
1. **Layout**: Provide a wireframe description (header, sidebar, main panels).
2. **Components**: List React (or Next.js) components with props, state shape, and data sources.
3. **Data Queries**: Suggest GraphQL/Subgraph queries, or direct RPC calls.
4. **Visualisation**: Recommend chart types (candlestick, area, bar) and libraries (Chart.js, Recharts).
5. **Security**: Highlight re‑entrancy checks, oracle trust, and user‑wallet integration.
6. **Example Code**: Include a minimal functional component snippet.

### Output Format
- Use Markdown with code fences labelled `tsx` for TypeScript/React examples.
- Provide a table of component props.
- End with a **README** style summary.
```
