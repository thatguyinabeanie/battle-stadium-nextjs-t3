import type { Profile } from "@battle-stadium/db/schema";
import { Button, Checkbox, Input } from "@battle-stadium/ui";

import { postTournamentRegistration } from "~/app/server-actions/tournaments/actions";
import ProfilesAutocomplete from "./profiles-autocomplete";

interface RegistrationCardProps {
  org_slug: string;
  tournament_id: number;
  profiles: Profile[];
}

export default function RegistrationCard ({
  profiles,
  org_slug,
  tournament_id,
}: Readonly<RegistrationCardProps>) {
  const registerForTournament = async (formData: FormData) => {
    "use server";
    const in_game_name = formData.get("ign") as string;
    const profile_username = formData.get("profile") as string;
    const show_country_flag = (formData.get("country_flag") as string) === "on";

    const profile = profiles.find((p) => p.username === profile_username);

    if (profile?.id) {
      await postTournamentRegistration({
        tournamentId: tournament_id,
        inGameName: in_game_name,
        profileId: profile.id,
        showCountryFlag: show_country_flag,
      });
    }
  };

  return (
    <div className="border-small m-20 inline-block max-w-fit justify-center rounded-3xl border-neutral-500/40 bg-transparent p-10 text-center backdrop-blur">
      <div>
        Register for { org_slug } tournament { tournament_id }
      </div>

      <div>
        <form action={ registerForTournament } className="grid grid-cols-1 gap-4">
          <Input type="text" placeholder="In Game Name" name="ign" />

          <ProfilesAutocomplete profiles={ profiles } />

          <div className="flex items-center space-x-2">
            <Checkbox id="country_flag" name="country_flag" />
            <label
              htmlFor="country_flag"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Show Country Flag?
            </label>
          </div>

          <Button aria-label="Submit" color="primary" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
