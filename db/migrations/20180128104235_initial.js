exports.up = async knex =>
  knex.schema
    .createTable('authors', table => {
      table.increments('id');
      table.string('firstName');
      table.string('lastName');
    })
    .createTable('books', table => {
      table.increments('id');
      table.string('title');
      table
        .integer('authorId')
        .unsigned()
        .references('authors.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
    .createTable('users', (table)=>{
      table.increments('id');
      table.string('password');
      table.string('email')
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.unique('email')
      // table.
    });

exports.down = async knex => knex.schema.dropTableIfExists('books').dropTableIfExists('authors').dropTableIfExists('users');
