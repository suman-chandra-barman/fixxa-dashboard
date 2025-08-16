import { CheckCircle } from "lucide-react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";

interface SuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  message: string;
}

export function SuccessDialog({
  open,
  onOpenChange,
  message,
}: SuccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] p-0">
        <div className="relative p-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">
                You're done!
              </h3>
              <p className="text-sm text-gray-600">{message}</p>
            </div>

            <Button
              onClick={() => onOpenChange(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6"
            >
              Go back
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
