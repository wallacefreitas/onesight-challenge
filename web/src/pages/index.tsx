import { Plus, Trash } from "phosphor-react";
import { useEffect, useState } from "react";

import { AddOrEditModal } from "../components/AddOrEditModal";
import { ListItem } from "../components/ListItem";

import { api } from '../lib/axios'
import { useItem } from "../hooks/useItem";

import { Items } from "../@types";

interface HomeProps {
  items: Items[]
}

export default function Home(props: HomeProps) {
  const [items, setItems] = useState<Items[]>([]);
  const { isRefresh, setIsRefresh, itemsSelected } = useItem();

  useEffect( () => {
    const listItems = async () => {
      const response = await api.get('items');
      setItems(response?.data.items);
    }
    
    listItems();
  }, [isRefresh]);

  async function deleteManyItems() {
    const checkboxes = document.getElementsByName("checkbox");
    const selectedCheckboxItems = Array.prototype.slice.call(checkboxes).filter( ch => ch.checked );

    selectedCheckboxItems.map( async itemSelected => {
      console.log(itemSelected.id);
      await api.delete(`items/${itemSelected.id}`);
    })
    
    setIsRefresh(!isRefresh);
  }

  return (
    <div className="flex flex-col relative h-screen max-w-[1024px] mx-auto border-2 border-[#1c1f26] bg-white">
      <div className="pt-4 mx-2 overflow-y-auto h-[95%]">
        {
          items.map( item => <ListItem key={item.id} data={item} />)
        }
      </div>
      <div className="flex border-2 absolute gap-2 bottom-0 left-0 right-0 pl-[30%] w-[98%] mx-2 pb-2">
        <AddOrEditModal>
          <div className="w-52 cursor-pointer">
            <div className="flex justify-center items-center w-full border-2 border-black py-2">
              <Plus />
            </div>
          </div>
        </AddOrEditModal>

        { itemsSelected.length > 0 && 
          (
            <div className="w-52 cursor-pointer">
              <div className="flex justify-center items-center w-full border-2 border-black py-2">
                <Trash onClick={deleteManyItems} />
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}
