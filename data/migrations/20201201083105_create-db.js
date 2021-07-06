
exports.up = function(knex) {
    return knex.schema
        .createTable('users', (tbl) => {
            tbl.increments();
            tbl.string('hash', 128).notNullable();
            tbl.string('username', 64).notNullable();
            tbl.string('email', 128).notNullable();
            tbl.unique('username');
        })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};
