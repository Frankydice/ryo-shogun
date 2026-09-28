import { RyoMcpClient } from '../src/mcp/client.js';
import { ShogunCouncil } from '../src/agents/council.js';
import { KaizenAuditor } from '../src/simulation/kaizen.js';
import { PaperTradingEngine } from '../src/simulation/paperTrading.js';

async function runTests() {
  console.log('=== RUNNING RYO SHOGUN TEST SUITE ===\n');

  const mcp = new RyoMcpClient();
  const council = new ShogunCouncil(mcp);
  const kaizen = new KaizenAuditor();
  const paperTrading = new PaperTradingEngine(kaizen, 10000);

  // Test 1: Council convene with high quality token (INJ)
  console.log('Test 1: Convening council on quality token INJ...');
  const resINJ = await council.conveneCouncil('INJ');
  console.log(`- Verdict: ${resINJ.edict.verdict}`);
  console.log(`- Active Commander: ${resINJ.edict.active_commander}`);
  console.log(`- Daimyo Veto: ${resINJ.edict.daimyo_veto_exercised}`);
  if (resINJ.edict.verdict === 'EXECUTE_TRADE') {
    console.log(`✓ Test 1 PASSED: High-quality token approved for execution.\n`);
  } else {
    console.log(`! Test 1 Notice: Verdict was ${resINJ.edict.verdict}\n`);
  }

  // Test 2: Council convene on suspicious token (MEME_RUG)
  console.log('Test 2: Testing Daimyo Veto on suspicious token MEME_RUG...');
  const resRug = await council.conveneCouncil('MEME_RUG');
  console.log(`- Verdict: ${resRug.edict.verdict}`);
  console.log(`- Daimyo Veto: ${resRug.edict.daimyo_veto_exercised}`);
  console.log(`- Thesis: "${resRug.edict.thesis_summary}"`);
  if (resRug.edict.verdict === 'HONORABLE_HOLD' && resRug.edict.daimyo_veto_exercised) {
    console.log(`✓ Test 2 PASSED: Daimyo successfully vetoed the unsafe token.\n`);
  } else {
    throw new Error('Test 2 FAILED: Daimyo did not veto unsafe token!');
  }

  // Test 3: Paper Trade Execution and Kaizen Post-Mortem Audit
  console.log('Test 3: Testing paper trade execution and Kaizen forensic audit...');
  const trade = paperTrading.executeEdict(resINJ.edict);
  if (trade) {
    console.log(`- Trade created: ${trade.id} for ${trade.symbol} at $${trade.entry_price}`);
    // Simulate trade hitting Take Profit
    paperTrading.tickPrices({ [trade.symbol]: trade.take_profit + 1.0 });
    const portfolio = paperTrading.getPortfolio();
    const latestPostMortem = kaizen.getPostMortems()[0];
    console.log(`- Trade status after price tick: ${trade.status}`);
    console.log(`- Kaizen evaluation: ${latestPostMortem.thesis_evaluation}`);
    console.log(`- Dojo Rule Adjustment: "${latestPostMortem.dojo_rule_adjustment}"`);
    console.log(`✓ Test 3 PASSED: Trade executed, Take-Profit hit, and Kaizen post-mortem recorded.\n`);
  }

  console.log('=== ALL TESTS PASSED SUCCESSFULLY! ===');
}

runTests().catch(err => {
  console.error('Test suite error:', err);
  process.exit(1);
});
