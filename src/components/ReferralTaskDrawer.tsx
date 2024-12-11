import { ReferralTaskType } from "../types/TaskType";
import { Button } from "./ui/button";
import Drawer, { DrawerProps } from "./ui/drawer";
import Price from "./Price";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { $http } from "@/lib/http";
import { toast } from "react-toastify";
import { Loader2Icon } from "lucide-react";
import { useUserStore } from "@/store/user-store";
import { uesStore } from "@/store";

export default function ReferralTaskDrawer({
  task,
  ...props
}: DrawerProps & {
  task: ReferralTaskType | null;
}) {
  const { totalReferals } = uesStore();
  const queryClient = useQueryClient();

  const claimMutation = useMutation({
    mutationFn: () =>
      $http.post<{ message: string }>(
        `/clicker/referral-tasks/${task?.id}/complete`
      ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (response) => {
      toast.success(response?.data?.message || "Task submitted successfully");
      queryClient.invalidateQueries({ queryKey: ["referral-tasks"] });
      task!.is_completed = true;
      useUserStore.setState((state) => {
        state.balance += task!.reward;
        return state;
      });
      props.onOpenChange?.(false);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "An error occurred");
    },
  });

  if (!task) return null;
  return (
    <Drawer {...props}>
      <img
        src={"/images/bounty.png"}
        alt={task.title}
        className="object-contain h-24 mx-auto"
      />
      <h2 className="text-2xl font-medium text-center mt-9">{task.title}</h2>
      <div className="px-5 py-2 mx-auto mt-4 border-2 border-dashed rounded-full border-primary w-fit">
        <Price
          amount={task.reward.toLocaleString()}
          className="justify-center text-xl"
        />
      </div>

      <Button
        className="w-full mt-6"
        disabled={
          claimMutation.isPending ||
          !!task.is_completed ||
          task.number_of_referrals > totalReferals
        }
        onClick={() => claimMutation.mutate()}
      >
        {claimMutation.isPending && (
          <Loader2Icon className="w-6 h-6 mr-2 animate-spin" />
        )}
        Claim
      </Button>
    </Drawer>
  );
}
