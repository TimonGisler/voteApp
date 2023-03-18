export interface PollOverview {
  pollTitle: string;
  options: Array<Option>;
}

export interface Option {
  optionName: string;
  averageRank: number;
}
