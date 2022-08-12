import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import ApiService from "../services/API";
import { Coords } from "./NewUserSuggestionContainer";

interface Props {
  coords: Coords | undefined;
  toNextStage(): void;
  setCoords(coords: Coords): void;
}

const ApiInstance = new ApiService(axios);

const NewUserSuggestionStageTwo = ({
  coords,
  toNextStage,
  setCoords,
}: Props) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Coords[]>();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data } = await ApiInstance.kakaoApiAddressToCoords(query);

    if (data.meta.total_count === 0) {
      setResults(undefined);
      setQuery("");
      return;
    }

    const filteredData = data.documents.map((location) => ({
      address: location.address_name,
      x: location.x,
      y: location.y,
    }));

    setResults(filteredData);
    setQuery("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="address"
          value={query}
          onChange={handleInputChange}
        />
        <button>
          <span className="material-symbols-outlined">search</span>
        </button>
      </form>
      {results &&
        results.map((result, i) => (
          <div key={i} onClick={() => setCoords(result)}>
            <span>{result.address}</span>
          </div>
        ))}
      <button onClick={toNextStage} disabled={!!!coords}>
        다음
      </button>
    </div>
  );
};

export default NewUserSuggestionStageTwo;
