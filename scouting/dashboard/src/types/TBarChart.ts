export type TBarChart = {
  title: string;
  type?: 'enum' | 'number';
  aggregateKeys: { label: string; keys: string[] }[];
};
