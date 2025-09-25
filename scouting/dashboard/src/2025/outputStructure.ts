import { TOutputStructure } from '../types';

export const outputStructure: TOutputStructure = {
  fileName: '2025-omb.csv',
  event: 'Ozark Mountain Brawl',
  charts: [
    {
      title: 'Coral By Level',
      type: 'number',
      aggregateKeys: [
        { label: 'L1', keys: ['coralL1', 'aCoralL1'] },
        { label: 'L2', keys: ['coralL2', 'aCoralL2'] },
        { label: 'L3', keys: ['coralL3', 'aCoralL3'] },
        { label: 'L4', keys: ['coralL4', 'aCoralL4'] },
        { label: 'missed', keys: ['coralMiss'] },
      ],
    },
    {
      title: 'Auto Coral',
      type: 'number',
      aggregateKeys: [
        { label: 'L1', keys: ['aCoralL1'] },
        { label: 'L2', keys: ['aCoralL2'] },
        { label: 'L3', keys: ['aCoralL3'] },
        { label: 'L4', keys: ['aCoralL4'] },
      ],
    },
    {
      title: 'Algae',
      type: 'number',
      aggregateKeys: [
        { label: 'Barge', keys: ['algaeBarge'] },
        { label: 'Processor', keys: ['algaeProcessor'] },
        { label: 'missed', keys: ['algaeMiss'] },
      ],
    },
    {
      title: 'Endgame',
      type: 'enum',
      aggregateKeys: [
        { label: 'none', keys: ['end'] },
        { label: 'park', keys: ['end'] },
        { label: 'deep', keys: ['end'] },
        { label: 'shallow', keys: ['end'] },
      ],
    },
  ],
};
