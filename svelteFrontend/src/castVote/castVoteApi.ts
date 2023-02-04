import { castVoteServerSide } from "../shared components/Server";
import type { CastVoteData, Vote } from "../shared components/Types";

export function castVote(castVoteData: CastVoteData){
  return castVoteServerSide(castVoteData);
}