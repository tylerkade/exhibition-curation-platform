import { db } from "@vercel/postgres";
import { users, exhibits, exhibit_artworks } from "../lib/placeholder_data";

const client = await db.connect();

async function dropTables() {
  await client.sql`DROP TABLE IF EXISTS exhibit_artworks`;
  await client.sql`DROP TABLE IF EXISTS exhibits`;
  await client.sql`DROP TABLE IF EXISTS users`;
}

async function seedUsers() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      user_id SERIAL PRIMARY KEY,
      username VARCHAR(32) NOT NULL UNIQUE,
      name VARCHAR(255) NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      return client.sql`
        INSERT INTO users (username, name)
        VALUES (${user.username}, ${user.name});
      `;
    })
  );

  return insertedUsers;
}

async function seedExhibits() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS exhibits (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(user_id) NOT NULL,
      name VARCHAR(255) NOT NULL
    );
  `;

  const insertedExhibits = await Promise.all(
    exhibits.map(async (exhibit) => {
      return client.sql`
        INSERT INTO exhibits (user_id, name)
        VALUES (${exhibit.user_id}, ${exhibit.name})
      `;
    })
  );
  return insertedExhibits;
}

async function seedExhibitArtworks() {
  await client.sql`
      CREATE TABLE IF NOT EXISTS exhibit_artworks (
        exhibit_id INT REFERENCES exhibits(id) NOT NULL,
        artwork_id VARCHAR(255)
      );
    `;

  const insertedExhibitArtworks = await Promise.all(
    exhibit_artworks.map(
      (exhibit_artwork) => client.sql`
          INSERT INTO exhibit_artworks (exhibit_id, artwork_id)
          VALUES (${exhibit_artwork.exhibit_id}, ${exhibit_artwork.artwork_id});
        `
    )
  );

  return insertedExhibitArtworks;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await dropTables();
    await seedUsers();
    await seedExhibits();
    await seedExhibitArtworks();
    await client.sql`COMMIT`;

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}