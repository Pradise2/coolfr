import { cn, compactNumber } from "@/lib/utils";
import { useUserStore } from "@/store/user-store";

export default function UserGameDetails({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLDivElement>) {
  const user = useUserStore();
  return (
    <div
      className={cn("flex items-stretch justify-between gap-2", className)}
      {...props}
    >
      <div className="flex flex-col items-center justify-center flex-1 p-2 select-none bg-white/10 backdrop-blur-sm rounded-xl">
        <p className="mb-1 text-xs text-center">Earn per tap</p>
        <div className="inline-flex items-center space-x-1.5 text-white font-bold">
          <img className="object-contain w-5 h-5" src="/images/coin.png" />{" "}
          <span className="text-sm">+{user?.earn_per_tap}</span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center flex-1 p-2 select-none bg-white/10 backdrop-blur-sm rounded-xl">
        <p className="mb-1 text-xs text-center">Coins to level up</p>
        {user.level && (
          <div className="inline-flex items-center space-x-1.5 text-gradient font-bold">
            <span className="text-sm">
              {compactNumber(user.level.to_balance)}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center justify-center flex-1 p-2 select-none bg-white/10 backdrop-blur-sm rounded-xl">
        <p className="mb-1 text-xs text-center">Profit per hour</p>
        <div className="inline-flex items-center space-x-1.5 text-white font-bold">
          <img className="object-contain w-5 h-5" src="/images/coin.png" />
          <span className="text-sm">
            +{compactNumber(user.production_per_hour)}
          </span>
        </div>
      </div>
    </div>
  );
}
