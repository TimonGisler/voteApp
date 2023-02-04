import type { Vote } from "./VoteDisplayData";

export function getVote(id: number):Vote{
  //return getVoteServerSider(id);
  return getDummyVote();
}

function getDummyVote():Vote{
  return {
    id: 1,
    name: "string",
    options: [{
      id: 1,
      optionName: "DummyOption",
    },
    {
      id: 2,
      optionName: "DummyOption2",
    }]
  }
}