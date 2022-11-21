import { FormEvent, ReactNode, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react';

import { api } from '../../lib/axios';
import { useItem } from '../../hooks/useItem';

interface TrashModalProps {
  id: String;
  children: ReactNode;
}

export function TrashModal(props: TrashModalProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const { setIsRefresh, isRefresh } = useItem();

  async function handleDeleteItem() {
    await api.delete(`items/${props.id}`);
    
    setOpenDialog(false);
    setIsRefresh(!isRefresh);
  }

  return (
    <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
      <Dialog.Trigger>
        {props.children}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='bg-zinc-800/10 inset-0 fixed' />
        <Dialog.Content className='fixed bg-white py-8 px-10 text-zinc-600 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] border-2 border-gray-300'>
          <Dialog.Title>
            <div>
              <h1 className='text-xl font-black'>Delete</h1>
              <h2 className='text-sm font-light pt-2 pb-4'>Deseja deletar esse item ?</h2>
            </div>
          </Dialog.Title>
          <div className="flex gap-2">
            <button type="submit" className=" bg-[#764AF1] p-2 w-36 text-white" onClick={handleDeleteItem}>Yes</button>
            <button type="submit" className=" bg-[#E0E0E0] p-2 w-36 text-gray-500" onClick={() => setOpenDialog(false)}>No</button>
          </div>

          <Dialog.Close className="absolute top-5 right-4 cursor-pointer">
            <X size={20} />
          </Dialog.Close>
        </Dialog.Content>
        
      </Dialog.Portal>
    </Dialog.Root>
  )
}