import { createContext, useContext, useState, type ReactNode } from 'react';

const SearchContext = createContext({ search: '', setSearch: (_value: string) => {} });
export function SearchProvider({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState('');
  return <SearchContext.Provider value={{ search, setSearch }}>{children}</SearchContext.Provider>;
}
export const useLibrarySearch = () => useContext(SearchContext);