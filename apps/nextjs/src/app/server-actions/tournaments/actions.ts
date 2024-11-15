"use server";

import type { FetchOptions } from "openapi-fetch";

import { db, eq } from "@battle-stadium/db";
import {
  organizations,
  players,
  profiles,
  tournaments,
} from "@battle-stadium/db/schema";

import type { paths } from "~/lib/api/openapi-v1";
import { BattleStadiumApiClient, defaultConfig } from "~/lib/api";

export async function getTournament(tournament_id: number) {
  const result = await db
    .select()
    .from(tournaments)
    .leftJoin(organizations, eq(tournaments.organizationId, organizations.id))
    .where(eq(tournaments.id, tournament_id))
    .orderBy(tournaments.startAt);

  return result.length > 0 && result[0]
    ? {
        tournament: result[0].tournaments,
        organization: result[0].organizations,
      }
    : null;
}

export async function getTournaments(page = 1, pageSize = 20) {
  return await db.query.tournaments.findMany({
    orderBy: (tournaments, { desc }) => desc(tournaments.startAt),
    limit: pageSize,
    offset: (page - 1) * pageSize,
  });
}

interface TournamentRegistration {
  tournamentId: number;
  inGameName: string;
  profileId: number;
  pokemonTeamId?: number;
  showCountryFlag: boolean;
}

export async function postTournamentRegistration(
  {
    tournamentId,
    inGameName,
    profileId,
    pokemonTeamId,
    showCountryFlag,
  }: TournamentRegistration,
  options?: FetchOptions<paths["/tournaments/{tournament_id}/players"]["post"]>,
) {
  const registrationOptions: FetchOptions<
    paths["/tournaments/{tournament_id}/players"]["post"]
  > = {
    ...defaultConfig("postTournamentRegistration"),
    ...options,
    params: {
      query: {
        in_game_name: inGameName,
        profile_id: profileId,
        pokemon_team_id: pokemonTeamId,
        show_country_flag: showCountryFlag,
      },
      path: {
        tournament_id: tournamentId,
      },
    },
  };

  const resp = await BattleStadiumApiClient().POST(
    "/tournaments/{tournament_id}/players",
    registrationOptions,
  );
  return resp.data;
}

export async function getTournamentPlayers(tournament_id: number) {
  return await db
    .select()
    .from(players)
    .leftJoin(profiles, eq(players.profileId, profiles.id))
    .where(eq(players.tournamentId, tournament_id))
    .orderBy(players.createdAt);
}
