// import { useState } from "react";
import { Button } from "./ui/button";
import Drawer, { DrawerProps } from "./ui/drawer";
import Price from "./Price";
import { useMutation } from "@tanstack/react-query";
import { $http } from "@/lib/http";
import { toast } from "react-toastify";
import { Loader2Icon } from "lucide-react";
import { Mission, MissionLevel } from "@/types/MissionType";
import { UserType } from "@/types/UserType";
import { useUserStore } from "@/store/user-store";
import { useMemo } from "react";

export default function MissionDrawer({
  mission,
  ...props
}: DrawerProps & {
  mission: Mission | null;
}) {
  // const queryClient = useQueryClient();
  const { balance } = useUserStore();

  const insufficientBalance = useMemo(() => {
    if (!mission?.next_level?.cost) return false;
    return balance < mission?.next_level?.cost;
  }, [balance, mission?.next_level?.cost]);

  const upgradeMution = useMutation({
    mutationFn: () =>
      $http.post<{ message: string; user: UserType; next_level: MissionLevel }>(
        `/clicker/mission-levels/${mission?.next_level?.id}`
      ),
    onSuccess: ({ data }) => {
      toast.success(data.message || "Mission upgraded successfully");
      useUserStore.setState({ ...data.user });
      const pph = mission?.next_level?.production_per_hour || 0;
      mission!.production_per_hour = (
        mission?.production_per_hour ? +mission.production_per_hour + pph : pph
      ).toString();
      mission!.next_level = data.next_level;
      props.onOpenChange?.(false);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "An error occurred");
    },
  });

  if (!mission || !mission.next_level) return null;
  return (
    <Drawer {...props}>
      <img
        src={mission.image}
        alt={mission.name}
        className="object-contain h-32 mx-auto"
      />
      <h2 className="mt-6 text-2xl font-medium text-center">{mission.name}</h2>
      <div className="flex flex-col mx-auto mt-4 w-fit">
        <p className="text-xs text-center">Production per hour</p>
        <Price
          amount={"+" + mission.next_level.production_per_hour.toLocaleString()}
          className="justify-center mt-2 text-sm text-white"
        />
      </div>

      <div className="flex items-center justify-center mx-auto mt-6 space-x-1 text-white">
        <img
          src="/images/coin.png"
          alt="coin"
          className="object-contain w-8 h-8"
        />
        <span className="font-bold">
          {mission.next_level.cost.toLocaleString()}
        </span>
      </div>
      <Button
        className="w-full mt-6"
        disabled={upgradeMution.isPending || insufficientBalance}
        onClick={() => upgradeMution.mutate()}
      >
        {upgradeMution.isPending && (
          <Loader2Icon className="w-6 h-6 mr-2 animate-spin" />
        )}
        {insufficientBalance ? "Insufficient Balance" : "Go ahead"}
      </Button>
    </Drawer>
  );
}
