import { pgTable, index, uniqueIndex, foreignKey, bigserial, varchar, bigint, timestamp, integer, boolean, text, numeric, date } from "drizzle-orm/pg-core"
import type { AnyPgColumn, ForeignKeyBuilder, IndexBuilder } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm"

export const formats = pgTable("formats", {
  id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
  name: varchar().notNull(),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  gameId: bigint("game_id", { mode: "number" }),
  createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).notNull(),
  updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).notNull(),
},
  (table): Record<string, IndexBuilder | ForeignKeyBuilder> => {
    return {
      indexFormatsOnGameId: index("index_formats_on_game_id").using("btree", table.gameId.asc().nullsLast()),
      indexFormatsOnNameAndGameId: uniqueIndex("index_formats_on_name_and_game_id").using("btree", table.name.asc().nullsLast(), table.gameId.asc().nullsLast()),
      fkRailsA0E0605606: foreignKey({
        columns: [table.gameId],
        foreignColumns: [games.id],
        name: "fk_rails_a0e0605606"
      }),
    }
  });

export const tournaments = pgTable("tournaments", {
  id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
  name: varchar().notNull(),
  startAt: timestamp("start_at", { precision: 6, mode: 'string' }),
  createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).notNull(),
  updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).notNull(),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  organizationId: bigint("organization_id", { mode: "number" }),
  checkInStartAt: timestamp("check_in_start_at", { precision: 6, mode: 'string' }),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  gameId: bigint("game_id", { mode: "number" }),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  formatId: bigint("format_id", { mode: "number" }),
  endedAt: timestamp("ended_at", { precision: 6, mode: 'string' }),
  registrationStartAt: timestamp("registration_start_at", { precision: 6, mode: 'string' }),
  registrationEndAt: timestamp("registration_end_at", { precision: 6, mode: 'string' }),
  playerCap: integer("player_cap"),
  autostart: boolean().default(false).notNull(),
  startedAt: timestamp("started_at", { precision: 6, mode: 'string' }),
  lateRegistration: boolean("late_registration").default(true).notNull(),
  teamlistsRequired: boolean("teamlists_required").default(true).notNull(),
  openTeamSheets: boolean("open_team_sheets").default(true).notNull(),
  endAt: timestamp("end_at", { precision: 6, mode: 'string' }),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  limitlessId: bigint("limitless_id", { mode: "number" }),
  published: boolean().default(false).notNull(),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  currentPhaseId: bigint("current_phase_id", { mode: "number" }),
},
  (table): Record<string, IndexBuilder | ForeignKeyBuilder> => {
    return {
      indexTournamentsOnCurrentPhaseId: index("index_tournaments_on_current_phase_id").using("btree", table.currentPhaseId.asc().nullsLast()),
      indexTournamentsOnFormatId: index("index_tournaments_on_format_id").using("btree", table.formatId.asc().nullsLast()),
      indexTournamentsOnGameId: index("index_tournaments_on_game_id").using("btree", table.gameId.asc().nullsLast()),
      indexTournamentsOnLimitlessId: uniqueIndex("index_tournaments_on_limitless_id").using("btree", table.limitlessId.asc().nullsLast()).where(sql`(limitless_id IS NOT NULL)`),
      indexTournamentsOnOrganizationId: index("index_tournaments_on_organization_id").using("btree", table.organizationId.asc().nullsLast()),
      fkRails8Ef7Ba6258: foreignKey({
        columns: [table.gameId],
        foreignColumns: [games.id],
        name: "fk_rails_8ef7ba6258"
      }),
      fkRails325Ccadea6: foreignKey({
        columns: [table.organizationId],
        foreignColumns: [organizations.id],
        name: "fk_rails_325ccadea6"
      }),
      fkRails40Bc0Fb494: foreignKey({
        columns: [table.currentPhaseId],
        foreignColumns: [phases.id],
        name: "fk_rails_40bc0fb494"
      }),
    }
  });

export const pokemon = pgTable("pokemon", {
  id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
  species: varchar(),
  ability: varchar(),
  teraType: varchar("tera_type"),
  nature: varchar(),
  item: varchar(),
  move1: varchar(),
  move2: varchar(),
  move3: varchar(),
  move4: varchar(),
  createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).notNull(),
  updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).notNull(),
  nickname: varchar(),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  pokemonTeamId: bigint("pokemon_team_id", { mode: "number" }).default(0).notNull(),
  form: varchar(),
  position: integer().default(0).notNull(),
  gender: integer().default(2).notNull(),
  shiny: boolean().default(false).notNull(),
  evHp: integer("ev_hp"),
  evAtk: integer("ev_atk"),
  evDef: integer("ev_def"),
  evSpa: integer("ev_spa"),
  evSpd: integer("ev_spd"),
  evSpe: integer("ev_spe"),
  ivHp: integer("iv_hp"),
  ivAtk: integer("iv_atk"),
  ivDef: integer("iv_def"),
  ivSpa: integer("iv_spa"),
  ivSpd: integer("iv_spd"),
  ivSpe: integer("iv_spe"),
},
  (table): Record<string, IndexBuilder | ForeignKeyBuilder> => {
    return {
      indexPokemonOnPokemonTeamId: index("index_pokemon_on_pokemon_team_id").using("btree", table.pokemonTeamId.asc().nullsLast()),
      indexPokemonOnPokemonTeamIdAndPosition: uniqueIndex("index_pokemon_on_pokemon_team_id_and_position").using("btree", table.pokemonTeamId.asc().nullsLast(), table.position.asc().nullsLast()),
      fkRails5B6022737B: foreignKey({
        columns: [table.pokemonTeamId],
        foreignColumns: [pokemonTeams.id],
        name: "fk_rails_5b6022737b"
      }),
    }
  });

export const pokemonTeams = pgTable("pokemon_teams", {
  id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
  createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).notNull(),
  updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).notNull(),
  published: boolean().default(true).notNull(),
  name: varchar(),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  formatId: bigint("format_id", { mode: "number" }).notNull(),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  gameId: bigint("game_id", { mode: "number" }).notNull(),
  archivedAt: timestamp("archived_at", { precision: 6, mode: 'string' }),
  pokepasteId: varchar("pokepaste_id"),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  profileId: bigint("profile_id", { mode: "number" }),
},
  (table): Record<string, IndexBuilder | ForeignKeyBuilder> => {
    return {
      indexPokemonTeamsOnFormatId: index("index_pokemon_teams_on_format_id").using("btree", table.formatId.asc().nullsLast()),
      indexPokemonTeamsOnGameId: index("index_pokemon_teams_on_game_id").using("btree", table.gameId.asc().nullsLast()),
      fkRails6E351688B8: foreignKey({
        columns: [table.formatId],
        foreignColumns: [formats.id],
        name: "fk_rails_6e351688b8"
      }),
      fkRailsE0513D6A9C: foreignKey({
        columns: [table.gameId],
        foreignColumns: [games.id],
        name: "fk_rails_e0513d6a9c"
      }),
      fkRails7Bf8C65391: foreignKey({
        columns: [table.profileId],
        foreignColumns: [profiles.id],
        name: "fk_rails_7bf8c65391"
      }),
    }
  });

export const rounds = pgTable("rounds", {
  id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  phaseId: bigint("phase_id", { mode: "number" }).notNull(),
  createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).notNull(),
  updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).notNull(),
  roundNumber: integer("round_number").default(1).notNull(),
  startedAt: timestamp("started_at", { precision: 6, mode: 'string' }),
  endedAt: timestamp("ended_at", { precision: 6, mode: 'string' }),
},
  (table): Record<string, IndexBuilder | ForeignKeyBuilder> => {
    return {
      indexRoundsOnPhaseId: index("index_rounds_on_phase_id").using("btree", table.phaseId.asc().nullsLast()),
      indexRoundsOnPhaseIdAndRoundNumber: uniqueIndex("index_rounds_on_phase_id_and_round_number").using("btree", table.phaseId.asc().nullsLast(), table.roundNumber.asc().nullsLast()),
    }
  });

export const tournamentFormats = pgTable("tournament_formats", {
  id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  tournamentId: bigint("tournament_id", { mode: "number" }).notNull(),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  formatId: bigint("format_id", { mode: "number" }).notNull(),
  createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).notNull(),
  updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).notNull(),
},
  (table): Record<string, IndexBuilder | ForeignKeyBuilder> => {
    return {
      indexTournamentFormatsOnFormatId: index("index_tournament_formats_on_format_id").using("btree", table.formatId.asc().nullsLast()),
      indexTournamentFormatsOnTournamentId: index("index_tournament_formats_on_tournament_id").using("btree", table.tournamentId.asc().nullsLast()),
      fkRails08C15D3C37: foreignKey({
        columns: [table.formatId],
        foreignColumns: [formats.id],
        name: "fk_rails_08c15d3c37"
      }),
      fkRailsC679052Dc0: foreignKey({
        columns: [table.tournamentId],
        foreignColumns: [tournaments.id],
        name: "fk_rails_c679052dc0"
      }),
    }
  });

export const matchGames = pgTable("match_games", {
  id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  matchId: bigint("match_id", { mode: "number" }).notNull(),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  winnerId: bigint("winner_id", { mode: "number" }),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  loserId: bigint("loser_id", { mode: "number" }),
  createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).notNull(),
  updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).notNull(),
  gameNumber: integer("game_number").default(1).notNull(),
  endedAt: timestamp("ended_at", { precision: 6, mode: 'string' }),
  startedAt: timestamp("started_at", { precision: 6, mode: 'string' }),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  reporterProfileId: bigint("reporter_profile_id", { mode: "number" }),
},
  (table): Record<string, IndexBuilder | ForeignKeyBuilder> => {
    return {
      indexMatchGamesOnLoserId: index("index_match_games_on_loser_id").using("btree", table.loserId.asc().nullsLast()),
      indexMatchGamesOnMatchId: index("index_match_games_on_match_id").using("btree", table.matchId.asc().nullsLast()),
      indexMatchGamesOnWinnerId: index("index_match_games_on_winner_id").using("btree", table.winnerId.asc().nullsLast()),
      fkRails76Cefaebc0: foreignKey({
        columns: [table.matchId],
        foreignColumns: [matches.id],
        name: "fk_rails_76cefaebc0"
      }),
      fkRailsA2C90Fc36D: foreignKey({
        columns: [table.loserId],
        foreignColumns: [players.id],
        name: "fk_rails_a2c90fc36d"
      }),
      fkRailsBe3D6Ef1Eb: foreignKey({
        columns: [table.winnerId],
        foreignColumns: [players.id],
        name: "fk_rails_be3d6ef1eb"
      }),
      fkRails8599A8B8Df: foreignKey({
        columns: [table.reporterProfileId],
        foreignColumns: [profiles.id],
        name: "fk_rails_8599a8b8df"
      }),
    }
  });

export const clerkUsers = pgTable("clerk_users", {
  id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
  clerkUserId: varchar("clerk_user_id").notNull(),
  createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).notNull(),
  updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).notNull(),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  accountId: bigint("account_id", { mode: "number" }),
},
  (table): Record<string, IndexBuilder | ForeignKeyBuilder> => {
    return {
      indexClerkUsersOnAccountId: index("index_clerk_users_on_account_id").using("btree", table.accountId.asc().nullsLast()),
      indexClerkUsersOnClerkUserId: uniqueIndex("index_clerk_users_on_clerk_user_id").using("btree", table.clerkUserId.asc().nullsLast()),
      fkRails982E94E92D: foreignKey({
        columns: [table.accountId],
        foreignColumns: [accounts.id],
        name: "fk_rails_982e94e92d"
      }),
    }
  });

export const accounts = pgTable("accounts", {
  email: varchar().default('').notNull(),
  createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).notNull(),
  updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).notNull(),
  unlockToken: varchar("unlock_token"),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  pronouns: varchar().default('').notNull(),
  jti: varchar().default('invalid').notNull(),
  name: varchar(),
  imageUrl: text("image_url"),
  admin: boolean().default(false).notNull(),
  id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  defaultProfileId: bigint("default_profile_id", { mode: "number" }),
  archivedAt: timestamp("archived_at", { precision: 6, mode: 'string' }),
  country: varchar(),
  timezone: varchar(),
},
  (table): Record<string, IndexBuilder | ForeignKeyBuilder> => {
    return {
      indexAccountsOnEmail: uniqueIndex("index_accounts_on_email").using("btree", table.email.asc().nullsLast()),
      indexAccountsOnJti: uniqueIndex("index_accounts_on_jti").using("btree", table.jti.asc().nullsLast()),
      indexAccountsOnUnlockToken: uniqueIndex("index_accounts_on_unlock_token").using("btree", table.unlockToken.asc().nullsLast()),
      fkRailsCee78B4B7D: foreignKey({
        columns: [table.defaultProfileId],
        foreignColumns: [profiles.id],
        name: "fk_rails_cee78b4b7d"
      }),
    }
  });

export const players = pgTable("players", {
  id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  tournamentId: bigint("tournament_id", { mode: "number" }).notNull(),
  createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).notNull(),
  updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).notNull(),
  teamSheetSubmitted: boolean("team_sheet_submitted").default(false).notNull(),
  checkedInAt: timestamp("checked_in_at", { mode: 'string' }),
  inGameName: varchar("in_game_name").default('').notNull(),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  pokemonTeamId: bigint("pokemon_team_id", { mode: "number" }),
  dropped: boolean().default(false).notNull(),
  disqualified: boolean().default(false).notNull(),
  roundWins: integer("round_wins").default(0).notNull(),
  roundLosses: integer("round_losses").default(0).notNull(),
  gameWins: integer("game_wins").default(0).notNull(),
  gameLosses: integer("game_losses").default(0).notNull(),
  resistance: numeric({ precision: 5, scale: 2 }),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  accountId: bigint("account_id", { mode: "number" }).default(0),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  profileId: bigint("profile_id", { mode: "number" }).notNull(),
  showCountryFlag: boolean("show_country_flag").default(true).notNull(),
},
  (table): Record<string, IndexBuilder | ForeignKeyBuilder> => {
    return {
      indexPlayersOnAccountId: index("index_players_on_account_id").using("btree", table.accountId.asc().nullsLast()),
      indexPlayersOnPokemonTeamId: index("index_players_on_pokemon_team_id").using("btree", table.pokemonTeamId.asc().nullsLast()),
      indexPlayersOnTournamentId: index("index_players_on_tournament_id").using("btree", table.tournamentId.asc().nullsLast()),
      fkRailsAeec102047: foreignKey({
        columns: [table.pokemonTeamId],
        foreignColumns: [pokemonTeams.id],
        name: "fk_rails_aeec102047"
      }),
      fkRailsF96Ec8A72F: foreignKey({
        columns: [table.tournamentId],
        foreignColumns: [tournaments.id],
        name: "fk_rails_f96ec8a72f"
      }),
      fkRails224Cac07Ce: foreignKey({
        columns: [table.accountId],
        foreignColumns: [accounts.id],
        name: "fk_rails_224cac07ce"
      }),
      fkRailsC31Cf6Bf09: foreignKey({
        columns: [table.profileId],
        foreignColumns: [profiles.id],
        name: "fk_rails_c31cf6bf09"
      }),
    }
  });

export const games = pgTable("games", {
  id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
  name: varchar(),
  createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).notNull(),
  updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).notNull(),
},
  (table): Record<string, IndexBuilder | ForeignKeyBuilder> => {
    return {
      indexGamesOnLowerName: uniqueIndex("index_games_on_lower_name").using("btree", sql`lower((name)::text)`),
    }
  });

export const profiles = pgTable("profiles", {
  username: varchar().notNull(),
  createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).notNull(),
  updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).notNull(),
  imageUrl: varchar("image_url"),
  slug: varchar(),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  accountId: bigint("account_id", { mode: "number" }),
  id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
  archivedAt: timestamp("archived_at", { precision: 6, mode: 'string' }),
  default: boolean().default(false).notNull(),
  type: varchar().default('Profile').notNull(),
},
  (table): Record<string, IndexBuilder | ForeignKeyBuilder> => {
    return {
      indexProfilesOnAccountId: index("index_profiles_on_account_id").using("btree", table.accountId.asc().nullsLast()),
      indexProfilesOnSlug: uniqueIndex("index_profiles_on_slug").using("btree", table.slug.asc().nullsLast()),
      indexProfilesOnUsername: uniqueIndex("index_profiles_on_username").using("btree", table.username.asc().nullsLast()),
      fkRailsE424190865: foreignKey({
        columns: [table.accountId],
        foreignColumns: [accounts.id],
        name: "fk_rails_e424190865"
      }),
    }
  });

export const friendlyIdSlugs = pgTable("friendly_id_slugs", {
  id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
  slug: varchar().notNull(),
  sluggableId: integer("sluggable_id").notNull(),
  sluggableType: varchar("sluggable_type", { length: 50 }),
  scope: varchar(),
  createdAt: timestamp("created_at", { precision: 6, mode: 'string' }),
},
  (table): Record<string, IndexBuilder | ForeignKeyBuilder> => {
    return {
      indexFriendlyIdSlugsOnSlugAndSluggableType: index("index_friendly_id_slugs_on_slug_and_sluggable_type").using("btree", table.slug.asc().nullsLast(), table.sluggableType.asc().nullsLast()),
      indexFriendlyIdSlugsOnSlugAndSluggableTypeAndScope: uniqueIndex("index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope").using("btree", table.slug.asc().nullsLast(), table.sluggableType.asc().nullsLast(), table.scope.asc().nullsLast()),
      indexFriendlyIdSlugsOnSluggableTypeAndSluggableId: index("index_friendly_id_slugs_on_sluggable_type_and_sluggable_id").using("btree", table.sluggableType.asc().nullsLast(), table.sluggableId.asc().nullsLast()),
    }
  });

export const schemaMigrations = pgTable("schema_migrations", {
  version: varchar().primaryKey().notNull(),
});

export const arInternalMetadata = pgTable("ar_internal_metadata", {
  key: varchar().primaryKey().notNull(),
  value: varchar(),
  createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).notNull(),
  updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).notNull(),
});

export const organizationStaffMembers = pgTable("organization_staff_members", {
  id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  organizationId: bigint("organization_id", { mode: "number" }).notNull(),
  createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).notNull(),
  updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).notNull(),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  accountId: bigint("account_id", { mode: "number" }),
},
  (table): Record<string, IndexBuilder | ForeignKeyBuilder> => {
    return {
      indexOrganizationStaffMembersOnAccountId: index("index_organization_staff_members_on_account_id").using("btree", table.accountId.asc().nullsLast()),
      indexOrganizationStaffMembersOnOrganizationId: index("index_organization_staff_members_on_organization_id").using("btree", table.organizationId.asc().nullsLast()),
      fkRailsA177A0142C: foreignKey({
        columns: [table.organizationId],
        foreignColumns: [organizations.id],
        name: "fk_rails_a177a0142c"
      }),
      fkRails65Be078Ae6: foreignKey({
        columns: [table.accountId],
        foreignColumns: [accounts.id],
        name: "fk_rails_65be078ae6"
      }),
    }
  });

export const phasePlayers = pgTable("phase_players", {
  id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  playerId: bigint("player_id", { mode: "number" }).notNull(),
  phaseType: varchar("phase_type").notNull(),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  phaseId: bigint("phase_id", { mode: "number" }).notNull(),
  createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).notNull(),
  updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).notNull(),
},
  (table): Record<string, IndexBuilder | ForeignKeyBuilder> => {
    return {
      indexPhasePlayersOnPlayerId: index("index_phase_players_on_player_id").using("btree", table.playerId.asc().nullsLast()),
      indexTournamentPhasePlayersOnPhase: index("index_tournament_phase_players_on_phase").using("btree", table.phaseType.asc().nullsLast(), table.phaseId.asc().nullsLast()),
      fkRails71Fbe65D92: foreignKey({
        columns: [table.playerId],
        foreignColumns: [players.id],
        name: "fk_rails_71fbe65d92"
      }),
    }
  });

export const phases = pgTable("phases", {
  id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  tournamentId: bigint("tournament_id", { mode: "number" }).notNull(),
  numberOfRounds: integer("number_of_rounds"),
  createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).notNull(),
  updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).notNull(),
  type: varchar().notNull(),
  name: varchar(),
  bestOf: integer("best_of").default(3).notNull(),
  startedAt: timestamp("started_at", { precision: 6, mode: 'string' }),
  endedAt: timestamp("ended_at", { precision: 6, mode: 'string' }),
  order: integer().default(0).notNull(),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  currentRoundId: bigint("current_round_id", { mode: "number" }),
},
  (table): Record<string, IndexBuilder | ForeignKeyBuilder> => {
    return {
      indexPhasesOnCurrentRoundId: index("index_phases_on_current_round_id").using("btree", table.currentRoundId.asc().nullsLast()),
      indexPhasesOnTournamentId: index("index_phases_on_tournament_id").using("btree", table.tournamentId.asc().nullsLast()),
      indexPhasesOnType: index("index_phases_on_type").using("btree", table.type.asc().nullsLast()),
      fkRails75E775589E: foreignKey({
        columns: [table.tournamentId],
        foreignColumns: [tournaments.id],
        name: "fk_rails_75e775589e"
      }),
      fkRails2909E41898: foreignKey({
        columns: [table.currentRoundId],
        foreignColumns: [rounds.id],
        name: "fk_rails_2909e41898"
      }),
    }
  });

export const organizations = pgTable("organizations", {
  id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
  name: varchar(),
  description: text(),
  createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).notNull(),
  updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).notNull(),
  logoUrl: varchar("logo_url"),
  partner: boolean().default(false).notNull(),
  hidden: boolean().default(false).notNull(),
  slug: varchar(),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  limitlessOrgId: bigint("limitless_org_id", { mode: "number" }),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  ownerId: bigint("owner_id", { mode: "number" }),
},
  (table) => {
    return {
      indexOrganizationsOnName: uniqueIndex("index_organizations_on_name").using("btree", table.name.asc().nullsLast()),
      indexOrganizationsOnOwnerId: index("index_organizations_on_owner_id").using("btree", table.ownerId.asc().nullsLast()),
      indexOrganizationsOnSlug: uniqueIndex("index_organizations_on_slug").using("btree", table.slug.asc().nullsLast()),
      fkRailsAb574863F6: foreignKey({
        columns: [table.ownerId],
        foreignColumns: [accounts.id],
        name: "fk_rails_ab574863f6"
      }),
    }
  });

export const matches = pgTable("matches", {
  id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  roundId: bigint("round_id", { mode: "number" }).notNull(),
  tableNumber: integer("table_number"),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  playerOneId: bigint("player_one_id", { mode: "number" }),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  playerTwoId: bigint("player_two_id", { mode: "number" }),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  winnerId: bigint("winner_id", { mode: "number" }),
  createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).notNull(),
  updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).notNull(),
  playerOneCheckIn: timestamp("player_one_check_in", { precision: 6, mode: 'string' }),
  playerTwoCheckIn: timestamp("player_two_check_in", { precision: 6, mode: 'string' }),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  loserId: bigint("loser_id", { mode: "number" }),
  endedAt: timestamp("ended_at", { precision: 6, mode: 'string' }),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  tournamentId: bigint("tournament_id", { mode: "number" }),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  phaseId: bigint("phase_id", { mode: "number" }),
  bye: boolean().default(false).notNull(),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  resetById: bigint("reset_by_id", { mode: "number" }),
},
  (table) => {
    return {
      indexMatchesOnLoserId: index("index_matches_on_loser_id").using("btree", table.loserId.asc().nullsLast()),
      indexMatchesOnPhaseId: index("index_matches_on_phase_id").using("btree", table.phaseId.asc().nullsLast()),
      indexMatchesOnPlayerOneId: index("index_matches_on_player_one_id").using("btree", table.playerOneId.asc().nullsLast()),
      indexMatchesOnPlayerTwoId: index("index_matches_on_player_two_id").using("btree", table.playerTwoId.asc().nullsLast()),
      indexMatchesOnRoundAndPlayersUnique: uniqueIndex("index_matches_on_round_and_players_unique").using("btree", table.roundId.asc().nullsLast(), table.playerOneId.asc().nullsLast(), table.playerTwoId.asc().nullsLast()),
      indexMatchesOnTournamentId: index("index_matches_on_tournament_id").using("btree", table.tournamentId.asc().nullsLast()),
      indexMatchesOnWinnerId: index("index_matches_on_winner_id").using("btree", table.winnerId.asc().nullsLast()),
      fkRails973A5646Ac: foreignKey({
        columns: [table.loserId],
        foreignColumns: [players.id],
        name: "fk_rails_973a5646ac"
      }),
      fkRailsBfcd6A3C9F: foreignKey({
        columns: [table.playerOneId],
        foreignColumns: [players.id],
        name: "fk_rails_bfcd6a3c9f"
      }),
      fkRailsB58C6C3513: foreignKey({
        columns: [table.playerTwoId],
        foreignColumns: [players.id],
        name: "fk_rails_b58c6c3513"
      }),
      fkRails9D0Deeb219: foreignKey({
        columns: [table.winnerId],
        foreignColumns: [players.id],
        name: "fk_rails_9d0deeb219"
      }),
      fkRailsE7C0250650: foreignKey({
        columns: [table.roundId],
        foreignColumns: [rounds.id],
        name: "fk_rails_e7c0250650"
      }),
      fkRails700Eaa2935: foreignKey({
        columns: [table.tournamentId],
        foreignColumns: [tournaments.id],
        name: "fk_rails_700eaa2935"
      }),
      fkRails36Efc9F0F5: foreignKey({
        columns: [table.phaseId],
        foreignColumns: [phases.id],
        name: "fk_rails_36efc9f0f5"
      }),
      fkRailsAf814604Cc: foreignKey({
        columns: [table.resetById],
        foreignColumns: [accounts.id],
        name: "fk_rails_af814604cc"
      }),
    }
  });

export const chatMessages = pgTable("chat_messages", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  matchId: bigint("match_id", { mode: "number" }).notNull(),
  content: text(),
  messageType: varchar("message_type"),
  sentAt: timestamp("sent_at", { precision: 6, mode: 'string' }),
  id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  accountId: bigint("account_id", { mode: "number" }),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  profileId: bigint("profile_id", { mode: "number" }).notNull(),
},
  (table): Record<string, IndexBuilder | ForeignKeyBuilder> => {
    return {
      indexChatMessagesOnAccountId: index("index_chat_messages_on_account_id").using("btree", table.accountId.asc().nullsLast()),
      indexChatMessagesOnMatchId: index("index_chat_messages_on_match_id").using("btree", table.matchId.asc().nullsLast()),
      fkRailsF9Ae4172Ee: foreignKey({
        columns: [table.matchId],
        foreignColumns: [matches.id],
        name: "fk_rails_f9ae4172ee"
      }),
      fkRails918Ef7Acc4: foreignKey({
        columns: [table.accountId],
        foreignColumns: [accounts.id],
        name: "fk_rails_918ef7acc4"
      }),
      fkRailsF531Ed39E3: foreignKey({
        columns: [table.profileId],
        foreignColumns: [profiles.id],
        name: "fk_rails_f531ed39e3"
      }),
    }
  });

export const rk9Tournaments = pgTable("rk9_tournaments", {
  id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
  rk9Id: varchar("rk9_id").notNull(),
  name: varchar().notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).notNull(),
  updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).notNull(),
},
  (table): Record<string, IndexBuilder | ForeignKeyBuilder> => {
    return {
      indexRk9TournamentsOnEndDate: index("index_rk9_tournaments_on_end_date").using("btree", table.endDate.asc().nullsLast()),
      indexRk9TournamentsOnName: uniqueIndex("index_rk9_tournaments_on_name").using("btree", table.name.asc().nullsLast()),
      indexRk9TournamentsOnRk9Id: uniqueIndex("index_rk9_tournaments_on_rk9_id").using("btree", table.rk9Id.asc().nullsLast()),
      indexRk9TournamentsOnStartAndEndDate: index("index_rk9_tournaments_on_start_and_end_date").using("btree", table.startDate.asc().nullsLast(), table.endDate.asc().nullsLast()),
      indexRk9TournamentsOnStartDate: index("index_rk9_tournaments_on_start_date").using("btree", table.startDate.asc().nullsLast()),
    }
  });
