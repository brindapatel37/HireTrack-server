/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("jobs").del();
  await knex("jobs").insert([
    {
      name: "Alice Smith",
      username: "alicesmith",
      password: "password_1",
    },
    {
      name: "Bob Johnson",
      username: "bobjohnson",
      password: "password_2",
    },
  ]);
}
