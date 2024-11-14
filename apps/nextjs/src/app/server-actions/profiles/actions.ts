"use server";

import { db, eq } from "@battle-stadium/db";
import { profiles } from "@battle-stadium/db/schema";

export async function getProfiles () {
  return await db.query.profiles.findMany();
}

export async function getProfile (username: string) {
  return await db.query.profiles.findFirst({
    where: eq(profiles.username, username),
  });
}

export async function getProfilesByAccountId (id: number) {
  return await db.query.profiles.findMany({
    where: eq(profiles.accountId, id),
  });
}

export async function createProfile (username: string, accountId: number) {
  const insertValue = {
    accountId,
    username,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  return await db.insert(profiles).values(insertValue).returning();
}
