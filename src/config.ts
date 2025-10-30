import env from "env-var"

export const config = {
  NODE_ENV: env
    .get("NODE_ENV")
    .default("development")
    .asEnum(["production", "test", "development"]),
  BOT_TOKEN: env.get("BOT_TOKEN").required().asString(),

  LOCK_STORE: env.get("LOCK_STORE").default("memory").asEnum(["memory"]),

  MAINNET_RPC_URL: env.get("MAINNET_RPC_URL").required().asString(),
}
