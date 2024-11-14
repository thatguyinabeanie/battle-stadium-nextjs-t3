"use server";

import { and, db, desc, eq } from "@battle-stadium/db";
import { organizations, tournaments } from "@battle-stadium/db/schema";

function tournamentsLeftJoinOrganizations () {
  return db
    .select()
    .from(tournaments)
    .leftJoin(organizations, eq(tournaments.organizationId, organizations.id));
}

export async function getOrganizationTournaments (page = 1, pageSize = 20) {
  return await tournamentsLeftJoinOrganizations()
    .orderBy(desc(tournaments.startAt))
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}

export async function getSingleOrganizationTournaments (
  slug: string,
  page = 1,
  pageSize = 20,
) {
  const results = await tournamentsLeftJoinOrganizations()
    .where(eq(organizations.slug, slug))
    .orderBy(desc(tournaments.startAt))
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  return {
    tournaments: results.map(({ tournaments }) => tournaments),
    organization: results[0]?.organizations,
  };
}

export async function getSingleOrganizationSingleTournament (
  slug: string,
  tournamentId: number,
) {
  const results = await tournamentsLeftJoinOrganizations()
    .where(and(eq(organizations.slug, slug), eq(tournaments.id, tournamentId)))
    .orderBy(desc(tournaments.startAt))
    .limit(1);

  return {
    tournament: results[0]?.tournaments,
    organization: results[0]?.organizations,
  };
}
