import { createContext, ReactNode, useState } from "react";

export interface ItemontextDataProps {
  isRefresh: boolean;
  setIsRefresh: (isRefresh: boolean) => void;
  itemsSelected: any[];
  setItemsSelected: (id: any[]) => void;
}

interface ItemProviderProps {
  children: ReactNode
}

export const ItemContext = createContext({} as ItemontextDataProps);

export function ItemContextProvider({ children }: ItemProviderProps) {
  const [isRefresh, setIsRefresh] = useState(false);
  const [itemsSelected, setItemsSelected] = useState([] as any[]);

  return (
    <ItemContext.Provider value={{
      isRefresh,
      setIsRefresh,
      itemsSelected,
      setItemsSelected,
    }}>
      {children}
    </ItemContext.Provider>
  )
}