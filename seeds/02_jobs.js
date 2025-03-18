/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("jobs").del();
  await knex("jobs").insert([
    {
      user_id: 1, // Replace with an existing user ID
      company_name: "Google",
      job_title: "Software Engineer",
      job_location: "Toronto, ON",
      application_date: "2024-03-10",
      job_status: "Applied",
      job_description: "Develop and maintain software applications.",
      recruiter_name: "John Doe",
      recruiter_email: "john.doe@google.com",
      recruiter_phone: "+1-123-456-7890",
      salary: 120000,
      notes: "Applied through LinkedIn.",
    },
    {
      user_id: 2, // Replace with an existing user ID
      company_name: "Amazon",
      job_title: "Product Manager",
      job_location: "Waterloo,ON",
      application_date: "2024-03-05",
      job_status: "Interviewing",
      job_description: "Manage product development and strategy.",
      recruiter_name: "Jane Smith",
      recruiter_email: "jane.smith@amazon.com",
      recruiter_phone: "+1-987-654-3210",
      salary: 150000,
      notes: "Scheduled for a phone interview.",
    },
    {
      user_id: 2, // Replace with an existing user ID
      company_name: "Microsoft",
      job_title: "Data Scientist",
      job_location: "Montreal, QC",
      application_date: "2024-03-01",
      job_status: "Rejected",
      job_description: "Analyze and interpret complex data sets.",
      recruiter_name: "David Lee",
      recruiter_email: "david.lee@microsoft.com",
      recruiter_phone: "",
      salary: 100000,
      notes: "Received rejection email.",
    },
  ]);
}
