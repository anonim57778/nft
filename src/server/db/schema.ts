import { relations } from "drizzle-orm";
import {
  index,
  integer,
  pgEnum,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";
import { z } from "zod";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `art_${name}`);

export const files = createTable("files", {
  id: varchar("id", { length: 255 })
  .notNull()
  .primaryKey()
  .$defaultFn(() => crypto.randomUUID()),
	fileName: varchar("file_name", { length: 255 }),
	fileSize: integer("file_size"),
	contentType: varchar("content_type", { length: 255 }),
	objectId: varchar("object_id", { length: 255 }).notNull().unique(),
	createdAt: timestamp("created_at", { withTimezone: true })
		.notNull()
		.defaultNow(),
});

export const roleUserEnum = pgEnum("role_user_enum", ["USER", "ARTIST", "ADMIN"]); 
export const RoleUserSchema = z.enum(roleUserEnum.enumValues);
export type Role = z.infer<typeof RoleUserSchema>;

export const users = createTable("user", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: roleUserEnum("role").notNull().default("USER"),
  sold: integer("sold").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  imageId: varchar("image_id", { length: 255 })
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const artsCategoriesEnum = pgEnum("arts_categories_enum", ["ART", "COLLECTIBLES", "MUSIC", "PHOTOGRAPHY", "VIDEO", "UTILITY", "SPORT", "VIRTUAL"]);
export const ArtCategorySchema = z.enum(artsCategoriesEnum.enumValues);
export type ArtCategoryEnum = z.infer<typeof ArtCategorySchema>;

export const arts = createTable("arts", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  imageId: varchar("image_id", { length: 255 }),
  categories: artsCategoriesEnum("categories").notNull().array(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  ownerId: varchar("owner_id", { length: 255 }).notNull().references(() => users.id),
  price: integer("price").notNull(),
});

export const artsRelations = relations(arts, ({ one }) => ({
  owner: one(users, { fields: [arts.ownerId], references: [users.id] }),
}));

export const collections = createTable("collection", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  imageIds: varchar("image_ids", { length: 255 }).notNull().array(),
  categories: artsCategoriesEnum("categories").notNull().array(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  ownerId: varchar("owner_id", { length: 255 }).notNull().references(() => users.id),
  price: integer("price").notNull(),
});

export const collectionsRelations = relations(collections, ({ one }) => ({
  owner: one(users, { fields: [collections.ownerId], references: [users.id] }),
}));

export const subscriptions = createTable("subscription", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  email: varchar("email", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),  
})

export const accounts = createTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_userId_idx").on(account.userId),
  })
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  })
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);
