import axios from "axios";
import React, { useEffect, useState } from "react";
import ApiService from "../services/API";
import { Coords } from "./NewUserSuggestionContainer";

interface Props {
  coords: Coords | undefined;
}

interface Result {
  address: string;
  category: string;
  name: string;
  url: string;
}

const ApiInstance = new ApiService(axios);

const NewUserSuggestionStageThree = ({ coords }: Props) => {
  const [results, setResults] = useState<Result[]>();
  const [selected, setSelected] = useState<number[]>([]);

  const fetcher = async () => {
    const a = await fetch("/api/hello");
    console.log(await a.json());
  };

  useEffect(() => {
    if (!coords) return;

    const fetchRestaurants = async () => {
      const { data } = await ApiInstance.kakaoApiCoordsToRestaurants(coords);
      console.log(data);

      if (data.meta.total_count === 0) {
        setResults(undefined);
        return;
      }

      const filteredData = data.documents.map((restaurant) => ({
        address: restaurant.road_address_name,
        category: restaurant.category_name,
        name: restaurant.place_name,
        url: restaurant.place_url,
      }));

      setResults(filteredData);
    };

    fetchRestaurants();
  }, [coords]);

  if (!coords) {
    return (
      <div>
        <span>잘못된 접근 입니다.</span>
      </div>
    );
  }

  return (
    <div>
      <h1>{coords?.address}</h1>
      <button onClick={fetcher}>fetch</button>
      {results?.map((result, i) => (
        <React.Fragment key={i}>
          <div>
            <div>
              <span>{result.name}</span>
              <a href={result.url} target="_blank" rel="noreferrer">
                - 카카오 플레이스
              </a>
            </div>
            <div>
              <span>{result.address}</span>
            </div>
            <div>
              <span>{result.category}</span>
            </div>
            <button onClick={() => setSelected((prev) => [...prev, i])}>
              방문함
            </button>
          </div>
          <hr />
        </React.Fragment>
      ))}
    </div>
  );
};

export default NewUserSuggestionStageThree;
