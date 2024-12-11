import CopyIcon from "@/components/icons/CopyIcon";
import { Button } from "@/components/ui/button";
import { $http } from "@/lib/http";
import { compactNumber } from "@/lib/utils";
import { uesStore } from "@/store";
import { useUserStore } from "@/store/user-store";
import { PaginationResponse } from "@/types/Response";
import { UserType } from "@/types/UserType";
import { useQuery } from "@tanstack/react-query";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";

const shareMessage = encodeURI(
  "Play Cool Frog with me!"
);

export default function Friends() {
  const [, copy] = useCopyToClipboard();
  const { telegram_id } = useUserStore();
  const { referral, levels } = uesStore();

  const [showMoreBonuses, setShowMoreBonuses] = useState(false);

  const referralLink = useMemo(
    () => `${import.meta.env.VITE_BOT_URL}/?startapp=ref${telegram_id}`,
    [telegram_id]
  );

  const referredUsers = useQuery({
    queryKey: ["referredUsers"],
    queryFn: () => $http.$get<PaginationResponse<UserType>>("/referred-users"),
  });

  return (
    <div className="flex flex-col justify-end bg-[url('/images/bg.png')] bg-cover flex-1">
      <div className="flex flex-col flex-1 w-full h-full px-6 py-8 pb-24 mt-12 modal-body">
        <h1 className="text-2xl font-bold text-center uppercase">Friends</h1>
        <p className="mt-2.5 font-medium text-center">
          You and your friend will receive bonuses.
        </p>
        <div className="mt-4 space-y-2">
          <button className="flex items-center w-full gap-4 px-4 py-2 bg-white/10 rounded-xl">
            <img
              src="/images/chest.png"
              alt="chest"
              className="object-contain w-9 h-9 mix-blend-screen"
            />
            <div className="text-sm font-medium text-left">
              <p>Invite a friend</p>
              <div className="flex items-center space-x-1">
                <img
                  src="/images/coin.png"
                  alt="coin"
                  className="object-contain w-5 h-5"
                />
                <span className="font-bold text-primary">
                  +{referral.base.welcome.toLocaleString()}
                </span>
                <span className="text-sm">for you and your friend</span>
              </div>
            </div>
          </button>
          <button className="flex items-center w-full gap-4 px-4 py-2 bg-white/10 rounded-xl">
            <img
              src="/images/chest.png"
              alt="chest"
              className="object-contain w-9 h-9 mix-blend-screen"
            />
            <div className="text-sm font-medium">
              <p>Invite a friend with Telegram premium</p>
              <div className="flex items-center space-x-1">
                <img
                  src="/images/coin.png"
                  alt="coin"
                  className="object-contain w-5 h-5"
                />
                <span className="font-bold text-primary">
                  +{referral.premium.welcome.toLocaleString()}
                </span>
                <span className="text-sm">for you and your friend</span>
              </div>
            </div>
          </button>
        </div>
        <div className="relative flex-1">
          <div className="absolute inset-0 w-full h-[calc(100%-1rem)] py-6 mt-4 overflow-y-scroll">
            {!showMoreBonuses ? (
              <div className="text-center">
                <button
                  className="rounded-full border-2 border-[#FFDAA3]/10 text-[#FFDAA3] text-xs font-bold py-2.5 px-4"
                  onClick={() => setShowMoreBonuses((value) => !value)}
                >
                  More bonuses
                </button>
              </div>
            ) : (
              <>
                <p
                  className="mt-8 text-sm font-bold uppercase"
                  onClick={() => setShowMoreBonuses((value) => !value)}
                >
                  Bonus for leveling up
                </p>
                <div className="relative flex-1 mt-6 min-h-60">
                  <div className="absolute inset-0 w-full h-full overflow-y-auto">
                    <table className="w-full">
                      <thead className="text-xs text-white/30">
                        <tr className="border-b border-[#D9D9D9]/10">
                          <th className="px-2 py-2 text-left">Level</th>
                          <th className="px-2 py-2 text-right">For friend</th>
                          <th className="px-2 py-2 text-right">Premium</th>
                        </tr>
                      </thead>
                      <tbody>
                        {levels
                          .filter((item) => referral.base.levelUp[item.level])
                          .map((item, key) => (
                            <tr
                              key={key}
                              className="border-b border-[#D9D9D9]/10"
                            >
                              <td className="px-2 py-2 text-xs">{item.name}</td>
                              <td className="px-2 py-2">
                                <div className="flex items-center justify-end gap-1">
                                  <img
                                    src="/images/coin.png"
                                    alt="coin"
                                    className="object-contain w-4 h-4"
                                  />
                                  <span className="text-xs font-medium text-primary">
                                    {referral.base.levelUp[
                                      item.level
                                    ].toLocaleString()}
                                  </span>
                                </div>
                              </td>
                              <td className="px-2 py-2">
                                <div className="flex items-center justify-end gap-1">
                                  <img
                                    src="/images/coin.png"
                                    alt="coin"
                                    className="object-contain w-4 h-4"
                                  />
                                  <span className="text-xs font-medium text-primary">
                                    {(
                                      referral.premium.levelUp[item.level] || 0
                                    ).toLocaleString()}
                                  </span>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
            <p className="mt-8 text-sm font-bold uppercase">
              List of your friends{" "}
              {referredUsers.data?.meta
                ? `(${referredUsers.data?.meta.total})`
                : null}
            </p>
            {referredUsers.isLoading ? (
              <div className="flex items-center justify-center w-full h-14">
                <div className="w-5 h-5 border-2 border-t-[#D9D9D9]/10 rounded-full border-t animate-spin"></div>
              </div>
            ) : referredUsers.data?.data?.length ? (
              <div className="mt-4 space-y-4">
                {referredUsers.data.data.map((item, key) => (
                  <div
                    key={key}
                    className="flex items-center justify-between px-4 py-3 bg-white/10 rounded-xl"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src="/images/avatar.png"
                        alt="avatar"
                        className="object-contain w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="text-sm font-medium">
                          {item.first_name} {item.last_name}
                        </p>
                        <p className="text-xs">{item.level?.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <img
                        src="/images/coin.png"
                        alt="coin"
                        className="object-contain w-5 h-5"
                      />
                      <span className="text-sm font-medium text-primary">
                        {compactNumber(item.balance)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center px-4 mt-4 border-2 border-dashed rounded-xl border-white/10 h-14">
                <p className="text-xs font-medium text-center text-white/30">
                  You didn’t invite anyone yet
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-3 mt-4">
          <Button
            className="flex-shrink-0"
            onClick={() => {
              copy(referralLink);
              toast.success("Referral link copied to clipboard");
            }}
          >
            <CopyIcon className="w-5 h-5" />
          </Button>
          <Button
            className="flex-1"
            onClick={() =>
              Telegram.WebApp.openTelegramLink(
                `https://t.me/share/url?text=${shareMessage}&url=${referralLink}`
              )
            }
          >
            Invite a friend
          </Button>
        </div>
      </div>
    </div>
  );
}
