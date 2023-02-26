export interface VoteOverview {
    voteTitle: string;
    options: Array<Option>;
    }

export interface Option {
    optionName: string;
    numberOfVotes: number;
    }
