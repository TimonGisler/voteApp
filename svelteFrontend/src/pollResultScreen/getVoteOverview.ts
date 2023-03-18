import type { PollOverview, Option } from "./VoteOverview";
import PocketBase from "pocketbase";
import type { VotedOption } from "./VotedOption";

const pb = new PocketBase("http://127.0.0.1:8090");

export async function getVoteOverview(pollId: string): Promise<PollOverview> {
  //fetch poll title
  let title = "TODO: fetch poll title";

  //fetch all votes for a poll
  let allVotes = await fetchAllVotesOfPoll(pollId);

  //based on the votes fetch the options that got voted on each vote
  let allVotedOptionsForThisPoll: VotedOption[] = await getEveryVoteForEveryOption(allVotes);

  //create VoteOverview by passing the name of the poll and all the votes
  let voteOverview: PollOverview = constructVoteOverview(
    title,
    allVotedOptionsForThisPoll
  );

  return voteOverview;
}

async function getEveryVoteForEveryOption(allVotes) {
  let allVotedOptionsForThisPoll: VotedOption[] = []; //an array of all the options that were voted

  for (let vote of allVotes) {
    let voteId: string = vote.id;
    let votedOptionsForThisVote: VotedOption[] = await fetchAllVotedOptionsForVote(voteId);
    allVotedOptionsForThisPoll.push(...votedOptionsForThisVote);
  }
  
  return allVotedOptionsForThisPoll;
}

function constructVoteOverview(
  pollTitle: string,
  options: Array<VotedOption>
): PollOverview {
  //count number of votes for every option
  let optionsWithNumberOfVotes: Option[] = getOptionWithAverageRank(options);

  return {
    pollTitle: pollTitle,
    options: optionsWithNumberOfVotes,
  };
}

interface OptionWithAllItsVotes {
  optionName: string;
  allRanksGivenToThisOption: number[];
}

function getOptionWithAverageRank(votedOptions: VotedOption[]): Option[] {
  let optionsWithAverageRank: Option[] = [];
  let optionWithAllItsVotes: OptionWithAllItsVotes[] = [];

  votedOptions.forEach((voteFromUser) => {
    let optionName = voteFromUser.optionName;
    let rankGivenByUser = voteFromUser.rank;

    //check if optionName already exists in optionsWithNumberOfVotes
    let optionThatWasVotedFromUser = optionWithAllItsVotes.find(
      (option) => option.optionName === optionName
    );
    if (optionThatWasVotedFromUser) {
      //if it add rank from user to array
      optionThatWasVotedFromUser.allRanksGivenToThisOption.push(
        rankGivenByUser
      );
    } else {
      //if it doesn't exist, add it to the array
      optionWithAllItsVotes.push({
        optionName: optionName,
        allRanksGivenToThisOption: [rankGivenByUser],
      });
    }
  });

  //Calculate averge rank given to each option
  optionWithAllItsVotes.forEach((option) => {
    let sumOfRanks = option.allRanksGivenToThisOption.reduce((a, b) => a + b,0);
    let averageRank = sumOfRanks / option.allRanksGivenToThisOption.length;

    //add option with average rank return array
    optionsWithAverageRank.push({
      optionName: option.optionName,
      averageRank: averageRank,
    });
  });

  return optionsWithAverageRank;
}

async function fetchAllVotesOfPoll(pollId: string) {
  let votesForThisPoll = await pb.collection("vote").getFullList(100000, {
    filter: 'pollId = "' + pollId + '"',
  });

  return votesForThisPoll;
}

async function fetchAllVotedOptionsForVote(
  voteId: string
): Promise<VotedOption[]> {
  let votesForThisPoll = await pb
    .collection("votedOption")
    .getFullList(100000, {
      filter: 'voteId = "' + voteId + '"',
    });

  return  Promise.all(votesForThisPoll.map(mapRecordToVotedOption));
}

async function mapRecordToVotedOption(record: any): Promise<VotedOption> {

  //Fetch option name
  //this is hilariously inefficient, but idc, i just wanna finish it and never use a baas ever again
  let optionId = record.optionId;
  let option = await pb.collection('option').getFirstListItem('id = "' + optionId + '"');

  return {
    optionName: option.name,
    rank: record.rankOfOption,
  };
}
