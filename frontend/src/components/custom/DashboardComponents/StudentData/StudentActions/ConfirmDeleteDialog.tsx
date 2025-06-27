"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogDescription } from "@radix-ui/react-dialog";

interface ConfirmDeleteDialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  studentName: string;
  onConfirm: () => void;
}

export const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
  open,
  setOpen,
  studentName,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className=" tracking-wider">Are you sure?</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          Do you really want to delete{" "}
          <span className="font-sans text-foreground">{studentName}</span>? This
          action cannot be undone.
        </p>

        <DialogFooter className="mt-4">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
            className=" hover:cursor-pointer "
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
