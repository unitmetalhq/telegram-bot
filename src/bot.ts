import { Bot } from "gramio"
import { createPublicClient, http } from "viem"
import { mainnet } from "viem/chains"
import { checkTheChainAbi } from "../lib/abis/checkTheChainAbi.ts"
import { config } from "./config.ts"

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(config.MAINNET_RPC_URL),
})

// start command
export const bot = new Bot(config.BOT_TOKEN)
  .command("start", context => context.send("Hi!"))
  .onStart(({ info }) => console.log(`✨ Bot ${info.username} was started!`))

// price command
bot.command("price", async (context) => {
  // make sure it's eth only
  if (context.args === "eth") {
    const priceData = await publicClient.readContract({
      address: "0x0000000000cDC1F8d393415455E382c30FBc0a84", // CheckTheChain contract address
      abi: checkTheChainAbi, // CheckTheChain contract abi
      functionName: "checkPrice", // checkPrice function
      args: ["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"], // WETH address
    })
    return context.send(`🔖 Ethereum[ETH]\n\n💰 ${priceData[1]}
    `)
  }

  // if it's not eth, send an error
  return context.send("Only eth is supported for now")
})
