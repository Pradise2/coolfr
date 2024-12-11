// import { useState } from "react";
import { TaskType } from "../types/TaskType";
import { Button } from "./ui/button";
import Drawer, { DrawerProps } from "./ui/drawer";
import Price from "./Price";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { $http } from "@/lib/http";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { Loader2Icon } from "lucide-react";
import { useUserStore } from "@/store/user-store";

export default function TaskDrawer({
  task,
  ...props
}: DrawerProps & {
  task: TaskType | null;
}) {
  const queryClient = useQueryClient();

  const submitMutation = useMutation({
    mutationFn: () =>
      $http.post<{ message: string }>(`/clicker/tasks/${task?.id}`),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (response) => {
      toast.success(response?.data?.message || "Task submitted successfully");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      task!.is_submitted = true;
      task!.submitted_at = new Date().toISOString();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "An error occurred");
    },
  });

  const claimMutation = useMutation({
    mutationFn: () =>
      $http.post<{ message: string }>(`/clicker/tasks/${task?.id}/claim`),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (response) => {
      toast.success(response?.data?.message || "Task submitted successfully");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      task!.is_rewarded = true;
      useUserStore.setState((state) => {
        state.balance += task!.reward_coins;
        return state;
      });
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
        src={
          task.image ||
          (task.type === "video" ? "/images/youtube.png" : "/images/bounty.png")
        }
        alt={task.name}
        className="object-contain h-24 mx-auto"
      />
      <h2 className="text-2xl font-medium text-center mt-9">{task.name}</h2>
      <div className="px-5 py-2 mx-auto mt-4 border-2 border-dashed rounded-full border-primary w-fit">
        <Price
          amount={task.reward_coins.toLocaleString()}
          className="justify-center text-xl"
        />
      </div>
      {task.is_submitted &&
        dayjs().isBefore(dayjs(task.submitted_at).add(60, "m")) && (
          <p className="mt-6 text-center text-white/80">
            Task submitted! Please Wait 1 hour for the moderation check to claim
            the prize.
          </p>
        )}
      <Button
        className="w-full mt-12"
        asChild
        onClick={() => submitMutation.mutate()}
      >
        <a href={task.link} target="_blank">
          {task.action_name}
        </a>
      </Button>

      {!task.is_rewarded && (
        <Button
          className="w-full mt-6"
          disabled={
            claimMutation.isPending ||
            !task.is_submitted ||
            dayjs().isBefore(dayjs(task.submitted_at).add(60, "m"))
          }
          onClick={() => claimMutation.mutate()}
        >
          {claimMutation.isPending && (
            <Loader2Icon className="w-6 h-6 mr-2 animate-spin" />
          )}
          Check
        </Button>
      )}
    </Drawer>
  );
}
