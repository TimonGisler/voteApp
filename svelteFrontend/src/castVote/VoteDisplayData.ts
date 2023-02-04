export interface Vote {
  id: number; //db id
  name: string;
  options: Array<VoteOptions>;
}

export interface VoteOptions {
  id: number; //db id
  optionName: string;
}
