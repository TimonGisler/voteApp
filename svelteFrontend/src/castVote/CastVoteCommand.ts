export interface CastVoteCommand {
    voteId:string;
    options: Array<VoteOptionToCast>;
  }
  
  export interface VoteOptionToCast {
    optionId: string;
    rank: number; // which rank the user gave this option
  }
  