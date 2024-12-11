import { PopupMessageType } from "@/types/PopupMessageType";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";

type Props = {
  message?: PopupMessageType;
};
export default function PopupMessageDialog({ message }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [popupCount, setPopupCount] = useLocalStorage<Record<number, number>>(
    `popup-count`,
    {}
  );
  useEffect(() => {
    if (
      message?.id &&
      (popupCount[message.id] === undefined || popupCount[message.id] < 2)
    ) {
      setIsOpen(true);
      setPopupCount({
        ...popupCount,
        [message.id]: (popupCount[message.id] || 0) + 1,
      });
    }
  }, [message]);

  if (!message?.id) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="popup-body w-[calc(100%-2rem)]">
        <div className="flex flex-col items-center justify-center text-center">
          <img
            src={message.image}
            alt={message.title}
            className="mx-auto h-14"
          />
          <DialogTitle className="mt-6 text-2xl font-bold">
            {message.title}
          </DialogTitle>
          <DialogDescription className="mt-4 font-medium text-white">
            {message.text}
          </DialogDescription>
          <Button className="w-full mt-6" asChild>
            <a href={message.button_link} target="_blank">
              {message.button_text}
            </a>
          </Button>
          <p
            className="mt-4 underline opacity-50"
            onClick={() => setIsOpen(false)}
          >
            I don't want these coins
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
