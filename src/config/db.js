const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const connectToDb = async () => {
  try {
    await prisma.$connect();
    const query = await prisma.$queryRaw`SELECT current_database();`;
    console.log(`✅ DB conectada: ${query[0].current_database}`);
  } catch (error) {
    console.error("❌ Error conectando DB:", error);
    process.exit(1);
  }
};

module.exports = {
  prisma,
  connectToDb,
};
