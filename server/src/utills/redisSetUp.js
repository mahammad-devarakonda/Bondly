const redis = require("redis");

const client = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: process.env.REDIS_PORT || 6379,
  },
});

client.on("connect", () => console.log("✅ Redis Connected!"));
client.on("error", (err) => console.error("❌ Redis Connection Error:", err));

(async () => {
  try {
    await client.connect();
    console.log("🔗 Redis Client Connected Successfully!");
  } catch (error) {
    console.error("❌ Redis Connection Failed:", error);
  }
})();

module.exports = client;
