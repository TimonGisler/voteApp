export interface CastVoteCommand {
    voteId:number;
    options: Array<VoteOptionToCast>;
  }
  
  export interface VoteOptionToCast {
    optionId: number;
    rank: number; // which rank the user gave this option
  }
  