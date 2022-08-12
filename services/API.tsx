import { AxiosInstance, AxiosResponse } from "axios";
import { Coords } from "../components/NewUserSuggestionContainer";
import { AddressToCoords } from "./apiModels/kakaoApiAddressToCoords";
import { CoordsToRestaurants } from "./apiModels/kakaoApiCoordsToRestaurants";

class ApiService {
  constructor(private API: AxiosInstance) {}

  public kakaoApiAddressToCoords = async (
    query: string
  ): Promise<AxiosResponse<AddressToCoords>> =>
    await this.API.get(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(
        query
      )}`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
        },
      }
    );

  public kakaoApiCoordsToRestaurants = async (
    coords: Coords
  ): Promise<AxiosResponse<CoordsToRestaurants>> =>
    await this.API.get(
      `https://dapi.kakao.com/v2/local/search/category.json?category\_group\_code=FD6&radius=300&x=${coords.x}&y=${coords.y}&sort=distance`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
        },
      }
    );
}

export default ApiService;
