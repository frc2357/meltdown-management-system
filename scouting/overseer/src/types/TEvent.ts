export type TEvent = {
  type?: string;
  timestamp?: number;
  location?: string;
  x?: number;
  y?: number;
  leave?: boolean;
  notes?: string;
  harmony?: boolean;
  spotlit?: boolean;
  trap?: number;
  miss?: boolean;
};
