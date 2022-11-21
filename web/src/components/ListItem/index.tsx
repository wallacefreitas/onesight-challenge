import { FormEvent, useEffect, useState } from "react";
import { Bag, Pencil, Trash } from "phosphor-react";

import { TrashModal } from "../DeleteModal";
import { AddOrEditModal } from "../AddOrEditModal";

import { Items } from "../../@types";
import { useItem } from "../../hooks/useItem";

interface ListItemProps {
  data: Items
}

export function ListItem( props: ListItemProps ) {
  const { data } = props;
  const { setItemsSelected, itemsSelected } = useItem();

  function checkItemsSelected() {
    const checkboxes = document.getElementsByName("checkbox");
    const selectedCheckboxItems = Array.prototype.slice.call(checkboxes).filter( ch => ch.checked );

    if (selectedCheckboxItems.length > 0)
      selectedCheckboxItems.map( selectedCheckboxItem => setItemsSelected([...itemsSelected, selectedCheckboxItem.id]) )
    else
      setItemsSelected([]);
  }

  return (
    <div className="flex gap-2 border border-gray-800 h-16 pr-4 mb-2">
      <div className="flex items-center justify-center w-12 h-full">
        <input type="checkbox" name={"checkbox"} id={data.id} onClick={checkItemsSelected} />
      </div>
      <div className="flex items-center justify-center w-16 h-full">
        <Bag size={48} />
      </div>
      <div className="flex flex-col w-full justify-center ">
        <p className="text-base">{ data.title }</p>
        <p className="text-sm">{`${data.description} - Quantity: ${data.quantity.toString()} - $${data.price}`}</p>
      </div>
      <div className="flex gap-2 items-center justify-center">
        <AddOrEditModal data={data}>
          <Pencil size={24} />
        </AddOrEditModal>
        <TrashModal id={data.id}>
          <Trash size={24} />
        </TrashModal>
      </div>
    </div>
  )
}