export interface SinglePersonDetails {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string | null;
  deathday?: string | null;
  gender: number;
  homepage?: string | null;
  id: number;
  known_for_department: string;
  name: string;
  place_of_birth?: string | null;
  popularity: number;
  profile_path?: string | null;
}
