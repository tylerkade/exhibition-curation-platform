import { db } from "@vercel/postgres";
import { users } from "../lib/placeholder_data";

const client = await db.connect();

async function dropTables() {
  await client.sql`DROP TABLE IF EXISTS users`;
}

async function seedUsers() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      user_id SERIAL PRIMARY KEY,
      username VARCHAR(32) NOT NULL UNIQUE,
      name VARCHAR(255) NOT NULL,
      exhibits JSON
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      return client.sql`
        INSERT INTO users (username, name, exhibits)
        VALUES (${user.username}, ${user.name}, ${JSON.stringify(user.exhibits, null, ' ' )});
      `;
    })
  );

  return insertedUsers;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await dropTables();
    await seedUsers();
    await client.sql`COMMIT`;

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
