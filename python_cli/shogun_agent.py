#!/usr/bin/env python3
"""
RYO Shogun (将軍) — Python Autonomous Council CLI
Autonomous Trading Council for RYO-CHAN Hackathon 2026
"""

import sys
import json
import time
from urllib import request, error

# Force UTF-8 on Windows terminals
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

API_BASE = "http://localhost:3001"

def print_banner():
    print("""
    ====================================================================
    ██████╗ ██╗   ██╗ ██████╗     ███████╗██╗  ██╗ ██████╗  ██████╗ ██╗   ██╗███╗   ██╗
    ██╔══██╗╚██╗ ██╔╝██╔═══██╗    ██╔════╝██║  ██║██╔═══██╗██╔════╝ ██║   ██║████╗  ██║
    ██████╔╝ ╚████╔╝ ██║   ██║    ███████╗███████║██║   ██║██║  ███╗██║   ██║██╔██╗ ██║
    ██╔══██╗  ╚██╔╝  ██║   ██║    ╚════██║██╔══██║██║   ██║██║   ██║██║   ██║██║╚██╗██║
    ██║  ██║   ██║   ╚██████╔╝    ███████║██║  ██║╚██████╔╝╚██████╔╝╚██████╔╝██║ ╚████║
    ╚═╝  ╚═╝   ╚═╝    ╚═════╝     ╚══════╝╚═╝  ╚═╝ ╚═════╝  ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝
               [ 将軍 · DOJO COUNCIL TERMINAL · TOKYO 2026 ]
    ====================================================================
    """)

def fetch_json(endpoint, data=None):
    url = f"{API_BASE}{endpoint}"
    try:
        req = request.Request(url, headers={'Content-Type': 'application/json'})
        body = json.dumps(data).encode('utf-8') if data else None
        with request.urlopen(req, data=body, timeout=10) as response:
            return json.loads(response.read().decode())
    except error.URLError as e:
        print(f"[!] Could not connect to RYO Shogun server at {url}. Ensure server is running (`npm run dev:server`).")
        print(f"    Error: {e}")
        return None

def main():
    print_banner()
    
    # Check status
    status = fetch_json("/api/status")
    if not status:
        sys.exit(1)
        
    print(f"[*] Connected to Shogun Server: {status.get('status')}")
    print(f"[*] MCP Mode: {status.get('mcp', {}).get('mode')}")
    print(f"[*] Server Time: {status.get('server_time')}\n")

    target_symbol = sys.argv[1] if len(sys.argv) > 1 else None
    
    print(f"[*] Convening Council of Three on candidate: {target_symbol or 'AUTO-SCAN'}...")
    convene_res = fetch_json("/api/council/convene", {"symbol": target_symbol} if target_symbol else {})
    if not convene_res:
        sys.exit(1)

    edict = convene_res.get("edict", {})
    opinions = convene_res.get("opinions", [])

    print("\n" + "="*60)
    print(f"   THE SHOGUN'S EDICT: {edict.get('verdict')} on {edict.get('target_symbol', 'MARKET')}")
    print("="*60)
    print(f"► Commander in Charge: {edict.get('active_commander')}")
    print(f"► Macro Regime:        {edict.get('regime')}")
    print(f"► Conviction Score:    {int((edict.get('confidence_score', 0) * 100))}%")
    print(f"► Risk:Reward Ratio:   1 : {edict.get('risk_reward_ratio', 'N/A')}")
    print(f"► Entry / SL / TP:     ${edict.get('entry_price', '—')} / SL: ${edict.get('stop_loss', '—')} / TP: ${edict.get('take_profit', '—')}")
    print(f"► Daimyo Veto:         {'EXERCISED (BLOCKED)' if edict.get('daimyo_veto_exercised') else 'PASSED'}")
    print(f"\n30-SECOND EXECUTIVE BRIEF:\n{edict.get('thirty_second_brief')}")

    print("\n--- INDIVIDUAL COUNCIL STANCES ---")
    for op in opinions:
        print(f"[{op.get('role')}]: {op.get('stance')} ({int(op.get('conviction', 0)*100)}% Conviction)")
        print(f"   Quote: \"{op.get('reasoning')}\"")
        print(f"   Tools: {', '.join(op.get('toolsCalled', []))}\n")

    # Fetch updated portfolio
    state = fetch_json("/api/state")
    if state and "portfolio" in state:
        p = state["portfolio"]
        print("="*60)
        print(f"DOJO TREASURY: Balance: ${p.get('balanceUsd'):,.2f} | Net PnL: ${p.get('realizedPnlUsd', 0) + p.get('unrealizedPnlUsd', 0):,.2f} | Open: {p.get('openPositionsCount')}")
        print("="*60)

if __name__ == "__main__":
    main()
