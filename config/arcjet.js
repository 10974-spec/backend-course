import arcjet, { shield, detectBot, tokenBucket } from "@arcjet";

const aj = arcjet({
 characteristics: ["ip.src"],
  key: process.env.ARCJET_KEY,
  rules: [
    // Shield protects your app from common attacks e.g. SQL injection
    shield({ mode: "LIVE" }),
    // Create a bot detection rule
    detectBot({
      mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
      // Block all bots except the following
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
        // Uncomment to allow these other common bot categories
        // See the full list at https://arcjet.com/bot-list
        //"CATEGORY:MONITOR", // Uptime monitoring services
        //"CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord
      ],
    }),
    // Create a token bucket rate limit rule
    tokenBucket({
      mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
      refillRate: 5,
      capacity: 10, // 100 tokens per interval
      interval: 10, // 60 seconds
    }),
  ],
});