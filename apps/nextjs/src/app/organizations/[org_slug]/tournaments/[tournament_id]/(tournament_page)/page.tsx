import Link from "next/link";
import { format, parseISO } from "date-fns";

import { Chip, Separator } from "@battle-stadium/ui";

import type { OrganizationTournamentProps } from "~/types";
import {
  getOrganizationTournaments,
  getSingleOrganizationSingleTournament,
} from "~/app/server-actions/organizations/tournaments/actions";
import { getTournament } from "~/app/server-actions/tournaments/actions";
import OrganizationHeader from "~/components/organizations/organization-header";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateMetadata(
  props: Readonly<OrganizationTournamentProps>,
) {
  const params = await props.params;
  const result = await getTournament(params.tournament_id);

  return { title: result?.tournament.name ?? "Tournament" };
}

export async function generateStaticParams() {
  const results = await getOrganizationTournaments(1, 500);

  return results.map(({ tournaments, organizations }) => ({
    org_slug: organizations?.slug,
    tournament_id: tournaments.id.toString(),
  }));
}

export default async function OrganizationTournament(
  props: Readonly<OrganizationTournamentProps>,
) {
  const params = await props.params;
  const { org_slug, tournament_id } = params;
  const { organization, tournament } =
    await getSingleOrganizationSingleTournament(org_slug, tournament_id);

  if (!organization || !tournament) {
    return <div>404 - Not Found</div>;
  }

  return (
    <>
      <div className="pt-2" />
      <OrganizationHeader organization={organization}>
        <div className="mx-4 flex h-full w-full flex-col items-center justify-between text-center">
          <h1 className="text-2xl font-semibold">{tournament.name}</h1>

          <div className="pt-2" />

          <div className="grid w-full grid-cols-2 justify-center gap-2">
            <p className="text-right font-bold">Presented By: </p>{" "}
            <p className="text-left">{organization.name}</p>
            <p className="text-right">Registration:</p>{" "}
            <p className="text-left">
              {" "}
              {formatTimestamp(tournament.registrationStartAt)}{" "}
            </p>
            <p className="text-right">Starts:</p>{" "}
            <p className="text-left">{formatTimestamp(tournament.startAt)}</p>
            <p className="text-right">Check in opens:</p>{" "}
            <p className="text-left">
              {formatTimestamp(tournament.checkInStartAt)}
            </p>
          </div>

          <div className="pt-2" />
        </div>

        <div className="pt-2" />

        <TournamentDetailChips
          org_slug={org_slug}
          tournament_id={tournament_id}
        />
      </OrganizationHeader>

      <div className="pt-2" />
      <Separator />
      <div className="pt-2" />
    </>
  );
}

function formatTimestamp(timestamp: string | null) {
  if (!timestamp) {
    return "N/A";
  }
  return format(parseISO(timestamp), "PPp");
}

interface TournamentDetailChipsProps {
  org_slug: string;
  tournament_id: number;
}
function TournamentDetailChips(props: Readonly<TournamentDetailChipsProps>) {
  const { org_slug, tournament_id } = props;

  return (
    <div className="flex w-full flex-row items-center justify-center gap-1">
      <Chip variant="solid">Solid</Chip>
      <Chip variant="bordered">Bordered</Chip>
      <Chip variant="light">Light</Chip>
      <Chip variant="flat">Flat</Chip>
      <Link
        prefetch={true}
        href={`/organizations/${org_slug}/tournaments/${tournament_id}/register`}
      >
        <Chip>Register</Chip>
      </Link>
    </div>
  );
}
