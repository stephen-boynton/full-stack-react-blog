const pg = require("pg");
const Promise = require("bluebird");
const objection = require("objection");
const Model = objection.Model;
const Knex = require("knex");

const knex = Knex({
  client: "postgresql",
  version: "7.3.0",
  connection: process.env.DATABASE_URI
});

Model.knex(knex);

const schemaAuthor = knex.schema.createTableIfNotExists("Author", table => {
  table.increments("author_id").primary();
  table.string("name");
  table.string("username");
  table.string("pass");
  table.string("avatar");
  table.text("bio");
  table.timestamp("date_created").defaultTo(knex.fn.now());
});

const schemaPost = knex.schema.createTableIfNotExists("Post", table => {
  table.increments("post_id").primary();
  table.string("title");
  table.string("image");
  table.text("body");
  table.timestamp("date_created").defaultTo(knex.fn.now());
  table
    .integer("author_id")
    .references("author_id")
    .inTable("Author");
  table.boolean("featured").defaultTo(false);
});

const schemaTag = knex.schema.createTableIfNotExists("Tag", table => {
  table.increments("tag_id").primary();
  table.string("tag");
  table
    .integer("post_id")
    .references("post_id")
    .inTable("Post");
});

const schemaComment = knex.schema.createTableIfNotExists("Comment", table => {
  table.increments("comment_id").primary();
  table.text("title");
  table.text("comment");
  table
    .integer("post_id")
    .references("post_id")
    .inTable("Post");
  table
    .integer("author_id")
    .references("author_id")
    .inTable("Author");
  table.timestamp("date_created").defaultTo(knex.fn.now());
  table.boolean("featured").defaultTo(false);
});

schemaAuthor.then();
schemaPost.then();
schemaComment.then();
schemaTag.then();

// Author model.
class Author extends Model {
  static get tableName() {
    return "Author";
  }
}

class Post extends Model {
  static get tableName() {
    return "Post";
  }
  static get relationMappings() {
    return {
      postAuthor: {
        relation: Model.BelongsToOneRelation,
        modelClass: Author,
        join: {
          from: "Post.author_id",
          to: "Author.author_id"
        }
      },
      postComments: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: "Post.post_id",
          to: "Comment.post_id"
        }
      }
    };
  }
}

class Tag extends Model {
  static get tableName() {
    return "Tag";
  }
  static get relationMappings() {
    return {
      tagPost: {
        relation: Model.BelongsToOneRelation,
        modelClass: Post,
        join: {
          from: "Tag.post_id",
          to: "Post.post_id"
        }
      }
    };
  }
}

class Comment extends Model {
  static get tableName() {
    return "Comment";
  }

  static get relationMappings() {
    return {
      commentAuthor: {
        relation: Model.BelongsToOneRelation,
        modelClass: Author,
        join: {
          from: "Comment.author_id",
          to: "Author.author_id"
        }
      },

      commentPost: {
        relation: Model.BelongsToOneRelation,
        modelClass: Post,
        join: {
          from: "Comment.post_id",
          to: "Post.post_id"
        }
      }
    };
  }
}

module.exports = {
  schemaAuthor,
  schemaComment,
  schemaPost,
  schemaTag,
  Author,
  Comment,
  Tag,
  Post
};
