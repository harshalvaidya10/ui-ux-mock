import { date, integer, json, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    credits: integer().default(5)
});

export const projectTable = pgTable('project', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    projectId: varchar().notNull(),
    projectName: varchar(),
    theme: varchar(),
    userInput: varchar(),
    device: varchar(),
    createdOn: date().defaultNow(),
    config: json(),
    projectVisualDescription: text(),
    userId: varchar().references(() => usersTable.email).notNull()
})

export const screenConfigTable = pgTable('screenConfig', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    projectId: varchar().references(()=>projectTable.projectId),
    screenId: varchar(),
    screenName: varchar(),
    purpose: varchar(),
    screenDescription: varchar(),
    code: text(),
})
//npx drizzle-kit push <-- for every changes in the table 
 