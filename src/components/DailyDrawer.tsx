import { cn, compactNumber } from "@/lib/utils";
import { Button } from "./ui/button";
import Drawer, { DrawerProps } from "./ui/drawer";
import { useMutation, useQuery } from "@tanstack/react-query";
import { $http } from "@/lib/http";
import { toast } from "react-toastify";
import { Loader2Icon } from "lucide-react";
import { DailyTaskType } from "@/types/TaskType";
import { useUserStore } from "@/store/user-store";
import { useNavigate } from "react-router-dom";

export default function DailyDrawer({ ...props }: DrawerProps) {
  const navigate = useNavigate();
  const dailyTasks = useQuery({
    queryKey: ["daily-tasks"],
    queryFn: () => $http.$get<DailyTaskType[]>("/clicker/daily-tasks"),
    staleTime: Infinity,
  });

  const claimTaskMutation = useMutation({
    mutationFn: () =>
      $http.post<{ message: string; balance: number }>(
        `/clicker/claim-daily-task`
      ),
    onSuccess: (response) => {
      toast.success(response.data.message);
      dailyTasks.refetch();
      useUserStore.setState({
        balance: response.data.balance,
      });
      navigate("/");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
  return (
    <Drawer {...props}>
      <img src="/images/coins.png" alt="coins-3" className="mx-auto h-28" />
      <h2 className="mt-6 text-2xl font-bold text-center">Daily Reward</h2>
      <p className="mt-2.5 text-center font-medium">
        Acquire coins for logging into the game daily without skipping
      </p>
      <div className="grid grid-cols-4 gap-3 mt-10 overflow-y-auto max-h-64">
        {dailyTasks.data?.map((item, key) => (
          <div
            key={key}
            className={cn(
              "flex flex-col border-2 border-transparent items-center bg-white/10 rounded-xl opacity-40 py-2.5 px-4",
              item.completed && "opacity-100 border-[#27D46C] bg-[#27D46C]/20",
              item.available && !item.completed && "opacity-100 border-primary"
            )}
          >
            <p className="text-sm font-medium">{item.name}</p>
            <img
              src="/images/coin.png"
              alt="coin"
              className="object-contain w-5 h-5"
            />
            <p
              className={cn(
                "font-bold text-primary",
                item.completed && "text-[#27D46C]"
              )}
            >
              {compactNumber(item.reward_coins)}
            </p>
          </div>
        ))}
      </div>
      <Button
        className="w-full mt-6"
        disabled={
          !dailyTasks.data?.some((item) => item.available && !item.completed) ||
          claimTaskMutation.isPending ||
          dailyTasks.isLoading
        }
        onClick={() => claimTaskMutation.mutate()}
      >
        {claimTaskMutation.isPending && (
          <Loader2Icon className="w-6 h-6 mr-2 animate-spin" />
        )}
        Claim
      </Button>
    </Drawer>
  );
}
