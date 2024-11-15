import type { Dispatch, SetStateAction } from "react";

import { Button, Textarea } from "@battle-stadium/ui";

import type { PokePasteMetadata, ValidatedPokemon } from "~/lib/pokemon/common";
// import { postPokemonTeam } from "~/app/server-actions/pokemon/actions";
import { getAccountMe } from "~/app/server-actions/accounts/actions";

interface PokemonShowdownSetFormProps {
  validatedTeam: ValidatedPokemon[] | null;
  handleSubmit: (formData: FormData) => void;
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  metaData: PokePasteMetadata | null;
}

export async function PokemonShowdownSetForm({
  validatedTeam,
  handleSubmit,
  input,
  setInput,
  metaData,
}: Readonly<PokemonShowdownSetFormProps>) {
  const me = await getAccountMe();
  if (!me) {
    return null;
  }
  return (
    <form action={handleSubmit} className="grid grid-cols-1">
      <div className="mb-4">
        <h1 className="flex items-center justify-center text-2xl font-bold">
          {"Showdown Set"}
        </h1>
      </div>
      <Textarea
        name="pokepaste"
        placeholder="Paste your Showdown Set here"
        value={input}
        onChange={(e: { target: { value: SetStateAction<string> } }) =>
          setInput(e.target.value)
        }
      />

      <div className="flex flex-row items-center justify-center gap-4 pt-2">
        <Button color="primary" type="submit">
          Load Team
        </Button>
        <Button
          color="primary"
          disabled={!validatedTeam || !metaData}
          onClick={
            () => validatedTeam && metaData
            // postPokemonTeam(validatedTeam, metaData,)
          }
        >
          Upload
        </Button>
      </div>
    </form>
  );
}
