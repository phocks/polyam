import { ethers } from "npm:ethers@5";
import {
  ApiKeyCreds,
  Chain,
  ClobClient,
  Side,
} from "npm:@polymarket/clob-client@4";
import * as R from "https://deno.land/x/ramda@v0.27.2/mod.ts";

const URL =
  "https://polymarket.com/api/profile/activity" +
  "?user=0x9d84ce0306f8551e02efef1680475fc0f1dc1344" +
  "&limit=10&offset=0";

const getLatestTrades = async (tradesUrl: string) => {
  const response = await fetch(tradesUrl);

  const data = await response.json();

  return data;
};

const filterTradesGreaterThan = (trades: any, timestamp: number) => {
  return trades.filter((trade: any) => trade.timestamp > timestamp);
};

// Run on on main execution not module import
if (import.meta.main) {
  const trades = await getLatestTrades(URL);
  const newTrades = filterTradesGreaterThan(trades, 1721447415);

  console.log(Date.now() / 1000);

  const kv = await Deno.openKv();

  const state = {
    username: "ada",
  };

  const result = await kv.set(["state"], state);
}
