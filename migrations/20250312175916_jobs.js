/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("jobs", (table) => {
    table.increments("id").primary();
    table
      .integer("user_id")
      .unsigned()
      .references("users.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.string("company_name").notNullable();
    table.string("job_title").notNullable();
    table.string("job_location").notNullable();
    table.date("application_date").notNullable();
    table.string("job_status").notNullable();
    table.text("job_description").notNullable();
    table.string("recruiter_name").notNullable();
    table.string("recruiter_email").notNullable();
    table.string("recruiter_phone").notNullable();
    table.integer("salary").notNullable();
    table.text("notes").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("jobs");
}
