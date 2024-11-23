import { KnownForMovie } from "./KnownForMovie";

export interface Actor {
    id: number;
    name: string;
    known_for_department: string;
    gender: number;
    popularity: number;
    profile_path?: string;
    known_for: KnownForMovie[];
  }