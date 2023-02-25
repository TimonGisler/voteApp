import type { CastVoteCommand, VoteOptionToCast } from "./CastVoteCommand";
import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

export async function castVote(castVoteData: CastVoteCommand): Promise<string> {
  // cast vote
  let savedVoteId:string =  (await pb.collection("vote").create(castVoteData)).id;

  let options: Array<VoteOptionToCast> = castVoteData.options;
  options.forEach(async (option) => {
    pb.collection("votedOption").create(completeOptionData(option,savedVoteId), { $autoCancel: false });
  });

  return savedVoteId;
}

function completeOptionData(option: VoteOptionToCast, voteId: string) {
  return {
    optionId: option.optionId,
    rankOfOption: option.rank,
    voteId: voteId,
  };
}
