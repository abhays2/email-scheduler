/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("emails", function (table) {
    table.increments("id").primary();
    table.string("recipient");
    table.string("sender");
    table.string("subject");
    table.string("body");
    table.string("status").defaultTo("created"); // scheduled, sent, failed, deleted
    table.timestamp("scheduledTime").defaultTo(knex.fn.now());
    table.string("mandrillId");
    table.string("response");
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("emails");
};

