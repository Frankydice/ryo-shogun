# RYO Shogun (将軍) — Autonomous Council & Dojo Terminal

> **Official BUIDL for RYO-CHAN Hackathon 2026**  
> **Dual-Track Submission**: Track 1 (Autonomous Agents) & Track 2 (Dashboards & Interfaces)  
> **Awards Targeted**: Track 1 1st Place ($3,500), Track 2 1st Place ($2,000), Social Media Award ($200), Grand Prize (Trip to Tokyo HQ).

---

## ⛩️ Executive Overview

Most automated trading bots fail in crypto because they rely on a single static prompt or monolithic strategy that breaks the moment market conditions rotate from a trending expansion into a choppy, low-liquidity range.

**RYO Shogun** solves this by introducing a **Regime-Adaptive Autonomous Council of Three Samurai Archetypes**. Using the official RYO-CHAN Model Context Protocol (MCP) research tools, command of the portfolio dynamically transfers between three specialized agents based on real-time market regimes:

1. **The Ronin (浪人 — Momentum Scout)**: Active during high-greed bull trends. Executes high-velocity trend breakouts.
2. **The Shinobi (忍 — Stealth Accumulation)**: Active during chop and rotation. Identifies on-chain whale accumulation and oversold divergence.
3. **The Daimyo (大名 — Capital Guardian)**: Holds **absolute veto authority**. Enforces strict capital preservation if honeypot flags, unlocked liquidity, or contract vulnerabilities exist.

All decisions culminate in **The Shogun's Edict** — an executive decree featuring a **30-Second Morning Brief**, verifiable reasoning trails, paper trade execution with stop-loss/take-profit targets, and automated **Kaizen forensic post-mortems**.

---

## 🏛️ Architecture & The 7 RYO Research Tools

```
                           ┌────────────────────────┐
                           │   RYO-CHAN MCP Tools   │
                           │(https://app-ryochan.com│
                           │       /api/mcp)        │
                           └───────────┬────────────┘
                                       │
                         [ market_overview regime ]
                                       │
              ┌────────────────────────┼────────────────────────┐
              ▼                        ▼                        ▼
       [ Bull Expansion ]       [ Rotation / Chop ]      [ High Risk / Rug ]
      ┌───────────────┐        ┌───────────────────┐    ┌───────────────────┐
      │  THE RONIN    │        │    THE SHINOBI    │    │    THE DAIMYO     │
      │ Momentum Scout│        │ Silent Reversal   │    │ Capital Guardian  │
      │ scan_market   │        │ deep_analysis     │    │ check_safety      │
      │ analyze_token │        │ compare_tokens    │    │ supported_tokens  │
      └───────┬───────┘        └─────────┬─────────┘    └─────────┬─────────┘
              │                          │                        │
              │                          │                  (ABSOLUTE VETO)
              └──────────────────────────┼────────────────────────┘
                                         │
                           ┌─────────────▼────────────┐
                           │   THE SHOGUN'S EDICT     │
                           │ Structured Execution:    │
                           │ Entry · SL · TP · R:R    │
                           │ + Bushido Reasoning Trail│
                           └─────────────┬────────────┘
                                         │
              ┌──────────────────────────┴──────────────────────────┐
              ▼                                                     ▼
    ┌───────────────────┐                                 ┌───────────────────┐
    │   DOJO TERMINAL   │                                 │   KAIZEN LEDGER   │
    │ 30s Market Brief  │                                 │ Forensic Audits   │
    │ Council Debate UI │                                 │ Thesis vs Luck    │
    │ 1-Click X Cards   │                                 │ Rule Adjustments  │
    └───────────────────┘                                 └───────────────────┘
```

### The 7 RYO MCP Tools Mapping
* `market_overview`: Assesses global regime (`bull_expansion`, `rotation`, `fear_distribution`) to trigger the Commander Handover Ceremony.
* `scan_market`: Scans top trending tokens across Ethereum, Arbitrum, and Base.
* `analyze_token`: Evaluates RSI, MACD signals, moving averages, and volatility ATR.
* `deep_analysis`: Examines whale concentration, net on-chain inflows, and derivatives open interest.
* `compare_tokens`: Runs comparative head-to-head token valuations.
* `check_safety`: Inspects honeypots, liquidity lock percentages, mint functions, and contract red flags.
* `supported_tokens`: Validates eligible token universes across EVM chains.

---

## ⚡ Quickstart (Install & Run)

### 1. Prerequisites
* **Node.js** v18+ (tested on Node v24)
* **npm** v9+
* *(Optional)* Python 3.10+ for the standalone Python CLI

### 2. Installation
Clone the repository and install all dependencies in one command:
```bash
# Install root, server, and client dependencies
npm run install:all
```

### 3. Environment Configuration
Copy the template configuration:
```bash
cp .env.example .env
```
*(Note: If you have received your `ryo_mcp_...` key from the organizers on Discord/Telegram, paste it into `RYO_MCP_KEY`. Otherwise, RYO Shogun gracefully runs in its deterministic Bushido simulation mode with honest provenance tracking).*

### 4. Launch the Full Application
```bash
npm run dev
```
* **Dojo Dashboard**: [`http://localhost:5173`](http://localhost:5173)
* **Shogun API Server**: [`http://localhost:3001`](http://localhost:3001)

### 5. Running the Standalone Python CLI *(Optional)*
```bash
# Run council scan
python python_cli/shogun_agent.py

# Or target a specific token directly
python python_cli/shogun_agent.py INJ
```

---

## 🧪 Automated Test Suite

Verify council state machine transitions, Daimyo veto enforcements, and paper trade execution:
```bash
cd server
npm test
```

---

## 🏆 Key Innovations for Hackathon Judges

| Criterion | How RYO Shogun Delivers |
| :--- | :--- |
| **Track 1: Cause & Effect** | Every trade edict produces an immutable step-by-step reasoning transcript linking tool inputs directly to trade actions. |
| **Track 2: 30-Second Clarity** | The top executive banner answers *"What changed today and what should I do?"* in under 30 seconds. |
| **Honest Data Provenance** | Distinguishes `[LIVE_MCP]` vs `[LOCAL_FALLBACK]` provenance; never fabricates numbers when APIs fail. |
| **Simulated Paper Trading** | Complete risk management suite with calculated Entry, SL, TP, Risk:Reward, and automated Kaizen forensic audits. |
| **Social Media Award** | Integrated 1-click **"Export Proof of Thesis"** generator that renders aesthetic samurai cards ready to post on X (Twitter). |

---

## 📜 License
MIT License · Built by **Bushido Labs** for the RYO-CHAN Hackathon 2026.
