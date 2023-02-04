import { saveVoteServerSide } from "../shared components/Server";
import type { Vote } from "../shared components/Types";

export function saveVote(voteToSave:Vote):number{
  return saveVoteServerSide(voteToSave);
}