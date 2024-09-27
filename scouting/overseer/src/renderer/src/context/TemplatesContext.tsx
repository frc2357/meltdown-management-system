import React, { Context, Dispatch, SetStateAction, createContext } from 'react';

export const TemplatesContext: Context<[string[], Dispatch<SetStateAction<string[]>>]> =
  createContext<[string[], React.Dispatch<React.SetStateAction<string[]>>]>([[], () => {}]);
