import { useState } from "react";
import NewUserSuggestionStageOne from "./NewUserSuggestionStageOne";
import NewUserSuggestionStageThree from "./NewUserSuggestionStageThree";
import NewUserSuggestionStageTwo from "./NewUserSuggestionStageTwo";

export interface Coords {
  address: string;
  x: string;
  y: string;
}

type Stage = typeof STAGE_1 | typeof STAGE_2 | typeof STAGE_3 | typeof STAGE_4;

const STAGE_1 = 1;
const STAGE_2 = 2;
const STAGE_3 = 3;
const STAGE_4 = 4;

const NewUserSuggestionContainer = () => {
  const [stage, setStage] = useState<Stage>(STAGE_1);
  const [coords, setCoords] = useState<Coords>();

  switch (stage) {
    case STAGE_1:
      return (
        <NewUserSuggestionStageOne toNextStage={() => setStage(STAGE_2)} />
      );
    case STAGE_2:
      return (
        <NewUserSuggestionStageTwo
          coords={coords}
          toNextStage={() => setStage(STAGE_3)}
          setCoords={setCoords}
        />
      );
    case STAGE_3:
      return <NewUserSuggestionStageThree coords={coords} />;
    default:
      return (
        <NewUserSuggestionStageOne toNextStage={() => setStage(STAGE_2)} />
      );
  }
};

export default NewUserSuggestionContainer;
