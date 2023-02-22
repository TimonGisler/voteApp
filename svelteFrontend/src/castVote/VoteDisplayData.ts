export interface Vote {
  id: number; //db id
  name: string;
  options: Array<VoteOptions>;
}

export interface VoteOptions {
  id: string; //db id
  optionName: string;
}
