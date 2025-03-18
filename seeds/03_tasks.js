/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("tasks").del();
  await knex("tasks").insert([
    {
      user_id: 1,
      task_title: "Follow up on Google application",
      task_status: "To Do",
      duedate: "2024-03-15",
    },
    {
      user_id: 2,
      task_title: "Prepare for Amazon interview",
      task_status: "In Progress",
      duedate: "2024-03-12",
    },
    {
      user_id: 1,
      task_title: "Update LinkedIn profile",
      task_status: "Done",
      duedate: "2024-03-10",
    },
  ]);
}
