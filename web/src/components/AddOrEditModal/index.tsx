import { FormEvent, ReactNode, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react';

import { useItem } from '../../hooks/useItem';
import { api } from '../../lib/axios'

import { Items } from '../../@types';

interface AddOrEditModalProps {
  data?: Items,
  children: ReactNode;
}

export function AddOrEditModal(props: AddOrEditModalProps) {
  const { data } = props;
  const [openDialog, setOpenDialog] = useState(false);
  const { isRefresh, setIsRefresh } = useItem();

  async function handleSaveItem(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const item = Object.fromEntries(formData)

    async function createItem(item: any) {
      await api.post("items", {
        title: item.title,
        description: item.description,
        quantity: parseInt(item.quantity.toString()),
        price: parseFloat(item.price.toString().replace(".", "").replace(",", "."))
      })
    }

    async function updateItem(item: any) {
      await api.put(`items/${data?.id}`, {
        title: item.title,
        description: item.description,
        quantity: parseInt(item.quantity.toString()),
        price: parseFloat(item.price.toString())
      })
    }

    try {
      data ? updateItem(item) : createItem(item);

      setOpenDialog(false);
      setIsRefresh(!isRefresh);
    } catch (error) {
      console.log(error);
      alert("Falha ao adicionar/atualizar o item na lista, tente novamente!")
    }
  }

  return (
    <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
      <Dialog.Trigger>
        {props.children}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='bg-zinc-800/10 inset-0 fixed' />
        <Dialog.Content className='fixed bg-white py-8 px-10 text-zinc-600 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] border-2 border-gray-300'>
          <Dialog.Title className='text-3xl font-black'>Item</Dialog.Title>
          <form onSubmit={handleSaveItem} className="mt-8 flex flex-col gap-4">
            <label>Title</label>
            <input name="title" type="text" className="border-2" defaultValue={data?.title} required />

            <label>Description</label>
            <input name="description" type="text" className="border-2" defaultValue={data?.description} required />

            <label>Quantity</label>
            <input name="quantity" type="number" className="border-2" defaultValue={data?.quantity} required />

            <label>Price</label>
            <input name="price" type="text" className="border-2" defaultValue={data?.price} required />

            <footer className="flex w-full justify-end gap-2 mt-4">
              <button type="submit" className=" bg-[#764AF1] p-2 w-36 text-white">Save</button>
            </footer>
          </form>

          <Dialog.Close className="absolute top-5 right-4 cursor-pointer">
            <X size={20} />
          </Dialog.Close>
        </Dialog.Content>
        
      </Dialog.Portal>
    </Dialog.Root>
  )
}