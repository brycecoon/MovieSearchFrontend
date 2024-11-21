import { KnownForMovie } from "./KnownForMovie";

export interface Actor {
    id: number;
    name: string;
    knownForDepartment: string;
    gender: number;
    popularity: number;
    profile_path?: string;
    knownFor: KnownForMovie[];
  }