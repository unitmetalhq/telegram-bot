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
  if (context.args === "eth") {
    const priceData = await publicClient.readContract({
      address: "0x0000000000cDC1F8d393415455E382c30FBc0a84",
      abi: checkTheChainAbi,
      functionName: "checkPrice",
      args: ["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"],
    })
    return context.send(`${priceData[1]}`)
  }

  return context.send(
    `Only eth is supported for now`,
  )
})
