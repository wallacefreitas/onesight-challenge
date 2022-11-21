import { useContext } from "react";

import { ItemContext, ItemontextDataProps} from "../context/ItemContext";

export function useItem(): ItemontextDataProps {
  const context = useContext(ItemContext);

  return context;
}