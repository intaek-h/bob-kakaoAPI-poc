export interface CoordsToRestaurants {
  meta: Meta;
  documents: Document[];
}

export interface Document {
  place_name: string;
  distance: string;
  place_url: string;
  category_name: string;
  address_name: string;
  road_address_name: string;
  id: string;
  phone: string;
  category_group_code: string;
  category_group_name: string;
  x: string;
  y: string;
}

export interface Meta {
  same_name: null;
  pageable_count: number;
  total_count: number;
  is_end: boolean;
}
