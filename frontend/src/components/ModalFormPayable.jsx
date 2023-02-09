import { Fragment, useState } from "react";
import {
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export default function ModalFormPayable(assingnorID) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <Fragment>
      <button className="py-2 mt-2" onClick={handleOpen} variant="gradient">
        Adicionar Recebível
      </button>
      <Dialog
        size="xxl"
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Adicionar novo recebivel</DialogHeader>

        <DialogBody divider>
          <div className="flex flex-col w-72 gap-6">
            <Input variant="outlined" placeholder="Valor" />
            <Input variant="outlined" placeholder="Data de emissão" />
          </div>
        </DialogBody>
        <DialogFooter>
          <button onClick={handleOpen} className="mr-1">
            <span>Cancel</span>
          </button>
          <button onClick={handleOpen}>
            <span>Confirm</span>
          </button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}
