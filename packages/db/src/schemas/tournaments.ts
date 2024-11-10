import { sql } from "drizzle-orm";
import {
  bigint,
  bigserial,
  boolean,
  date,
  foreignKey,
  index,
  integer,
  pgTable,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

import { games } from "./games";
import { organizations } from "./organizations";
import { phases } from "./phases";

export const tournaments = pgTable(
  "tournaments",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    name: varchar(),
    startAt: timestamp("start_at", { precision: 6, mode: "string" }),
    createdAt: timestamp("created_at", {
      precision: 6,
      mode: "string",
    }).notNull(),
    updatedAt: timestamp("updated_at", {
      precision: 6,
      mode: "string",
    }).notNull(),
    organizationId: bigint("organization_id", { mode: "bigint" }),
    checkInStartAt: timestamp("check_in_start_at", {
      precision: 6,
      mode: "string",
    }),
    gameId: bigint("game_id", { mode: "bigint" }),
    formatId: bigint("format_id", { mode: "bigint" }),
    endedAt: timestamp("ended_at", { precision: 6, mode: "string" }),
    registrationStartAt: timestamp("registration_start_at", {
      precision: 6,
      mode: "string",
    }),
    registrationEndAt: timestamp("registration_end_at", {
      precision: 6,
      mode: "string",
    }),
    playerCap: integer("player_cap"),
    autostart: boolean().default(false).notNull(),
    startedAt: timestamp("started_at", { precision: 6, mode: "string" }),
    lateRegistration: boolean("late_registration").default(true).notNull(),
    teamlistsRequired: boolean("teamlists_required").default(true).notNull(),
    openTeamSheets: boolean("open_team_sheets").default(true).notNull(),
    endAt: timestamp("end_at", { precision: 6, mode: "string" }),
    limitlessId: bigint("limitless_id", { mode: "bigint" }),
    published: boolean().default(false).notNull(),
    currentPhaseId: bigint("current_phase_id", { mode: "bigint" }),
  },
  (table) => {
    return {
      indexTournamentsOnCurrentPhaseId: index(
        "index_tournaments_on_current_phase_id",
      ).using("btree", table.currentPhaseId.asc().nullsLast()),
      indexTournamentsOnFormatId: index("index_tournaments_on_format_id").using(
        "btree",
        table.formatId.asc().nullsLast(),
      ),
      indexTournamentsOnGameId: index("index_tournaments_on_game_id").using(
        "btree",
        table.gameId.asc().nullsLast(),
      ),
      indexTournamentsOnLimitlessId: uniqueIndex(
        "index_tournaments_on_limitless_id",
      )
        .using("btree", table.limitlessId.asc().nullsLast())
        .where(sql`(limitless_id IS NOT NULL)`),
      indexTournamentsOnOrganizationId: index(
        "index_tournaments_on_organization_id",
      ).using("btree", table.organizationId.asc().nullsLast()),
      fkRails8Ef7Ba6258: foreignKey({
        columns: [table.gameId],
        foreignColumns: [games.id],
        name: "fk_rails_8ef7ba6258",
      }),
      fkRails325Ccadea6: foreignKey({
        columns: [table.organizationId],
        foreignColumns: [organizations.id],
        name: "fk_rails_325ccadea6",
      }),
      fkRails40Bc0Fb494: foreignKey({
        columns: [table.currentPhaseId],
        foreignColumns: [phases.id],
        name: "fk_rails_40bc0fb494",
      }),
    };
  },
);

export const rk9Tournaments = pgTable(
  "rk9_tournaments",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    rk9Id: varchar("rk9_id").notNull(),
    name: varchar().notNull(),
    startDate: date("start_date").notNull(),
    endDate: date("end_date").notNull(),
    createdAt: timestamp("created_at", {
      precision: 6,
      mode: "string",
    }).notNull(),
    updatedAt: timestamp("updated_at", {
      precision: 6,
      mode: "string",
    }).notNull(),
  },
  (table) => {
    return {
      indexRk9TournamentsOnEndDate: index(
        "index_rk9_tournaments_on_end_date",
      ).using("btree", table.endDate.asc().nullsLast()),
      indexRk9TournamentsOnName: uniqueIndex(
        "index_rk9_tournaments_on_name",
      ).using("btree", table.name.asc().nullsLast()),
      indexRk9TournamentsOnRk9Id: uniqueIndex(
        "index_rk9_tournaments_on_rk9_id",
      ).using("btree", table.rk9Id.asc().nullsLast()),
      indexRk9TournamentsOnStartAndEndDate: index(
        "index_rk9_tournaments_on_start_and_end_date",
      ).using(
        "btree",
        table.startDate.asc().nullsLast(),
        table.endDate.asc().nullsLast(),
      ),
      indexRk9TournamentsOnStartDate: index(
        "index_rk9_tournaments_on_start_date",
      ).using("btree", table.startDate.asc().nullsLast()),
    };
  },
);

export type Tournament = typeof tournaments.$inferSelect;
export type TournamentInsert = typeof tournaments.$inferInsert;
export type Rk9Tournament = typeof rk9Tournaments.$inferSelect;
export type Rk9TournamentInsert = typeof rk9Tournaments.$inferInsert;
