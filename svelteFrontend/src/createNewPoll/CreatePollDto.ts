export interface Vote {
    name: string;
    options: Array<Option>;
  }
  
  export interface Option {
    order: number; // In which order the option gets displayed
    option: string;
  }