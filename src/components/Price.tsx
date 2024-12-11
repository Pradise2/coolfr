import { cn } from "@/lib/utils";
import React from "react";

type Props = React.HtmlHTMLAttributes<HTMLDivElement> & {
  amount: number | string;
};
export default function Price({ amount, className, ...props }: Props) {
  return (
    <div
      className={cn("flex items-center space-x-1 text-primary", className)}
      {...props}
    >
      <img
        src="/images/coin.png"
        alt="coin"
        className="object-contain w-5 h-5"
      />
      <span className="font-bold">{amount}</span>
    </div>
  );
}
