import { Button } from "../ui/button";

type Props = {
  startGame: () => void;
};

export default function FirstTimeScreen({ startGame }: Props) {
  return (
    <div
      className="flex flex-col items-center justify-center py-12 bg-cover bg-center w-full max-w-lg min-h-[--tg-viewport-height] mx-auto"
      style={{ backgroundImage: `url('/images/bg.png')` }}
    >
      <div className="flex flex-col items-center">
        <p className="text-sm font-bold text-center">YOUR STARTING BALANCE</p>
        <div className="flex items-center gap-3 mt-4">
          <img
            src="/images/coins.png"
            alt="coins"
            className="object-contain w-14 h-14"
          />
          <span className="text-3xl font-bold text-gradient">5,000</span>
        </div>
        <img src="/images/chest.png" alt="box" className="w-full" />
        <div className="w-full px-12">
          <Button className="w-full uppercase" onClick={() => startGame()}>
            Join the cool frog
          </Button>
        </div>
      </div>
    </div>
  );
}
