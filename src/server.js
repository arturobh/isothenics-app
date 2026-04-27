require("dotenv").config();
const { connectToDb } = require("./config/db");
const app = require("./app");

const startServer = async () => {
  try {
    await connectToDb();

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error starting server:", error);
    process.exit(1);
  }
};

startServer();
