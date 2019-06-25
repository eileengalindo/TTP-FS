const db = require('../server/db');
const User = require('../server/db/models/user');
const Stock = require('../server/db/models/stocks');

async function seed() {
  await db.sync({ force: true });
  console.log('in seed function');

  const users = await Promise.all([
    User.create({
      firstName: 'Eileen',
      lastName: 'Galindo',
      email: 'galindo.eileen@gmail.com',
      password: '123456',
      isAdmin: false
    }),
    User.create({
      firstName: 'Henry',
      lastName: 'Rodes',
      email: 'rodes.henry@gmail.com',
      password: '123456',
      isAdmin: false
    }),
    User.create({
      firstName: 'Lisa',
      lastName: 'Wallow',
      email: 'wallow.lisa@gmail.com',
      password: '123456',
      isAdmin: false
    })
  ]);
  console.log(`seeded ${users.length} users`);

  const stocks = await Promise.all([
    Stock.create({
      ticker: 'APPL',
      quantity: 100,
      action: 'buy',
      totalValue: 19571,
      userId: 1
    }),
    Stock.create({
      ticker: 'FB',
      quantity: 52,
      action: 'buy',
      totalValue: 980148,
      userId: 1
    }),
    Stock.create({
      ticker: 'TWTR',
      quantity: 102,
      action: 'sell',
      totalValue: 354246,
      userId: 2
    })
  ]);

  console.log(`seeded ${stocks.length} stocks`);
}

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

if (module === require.main) {
  runSeed();
}

module.exports = seed;
