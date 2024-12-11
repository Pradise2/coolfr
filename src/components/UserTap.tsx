import React, { useEffect, useRef, useState } from "react";
import { useClicksStore } from "../store/clicks-store";
import { useUserStore } from "../store/user-store";
import { Link } from "react-router-dom";
import { useDebounce } from "@uidotdev/usehooks";
import { $http } from "@/lib/http";
import levelConfig from "@/config/level-config";

export default function UserTap(props: React.HTMLProps<HTMLDivElement>) {
  const userAnimateRef = useRef<HTMLDivElement | null>(null);
  const userTapButtonRef = useRef<HTMLButtonElement | null>(null);
  const [clicksCount, setClicksCount] = useState(0);
  const debounceClicksCount = useDebounce(clicksCount, 1000);

  const { clicks, addClick, removeClick } = useClicksStore();
  const { UserTap, incraseEnergy, ...user } = useUserStore();

  const tabMe = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!UserTap()) return;

    setClicksCount((prev) => prev + 1);

    addClick({
      id: new Date().getTime(),
      value: user.earn_per_tap,
      style: {
        top: e.clientY,
        left: e.clientX + (Math.random() > 0.5 ? 5 : -5),
      },
    });
    animateButton();
  };

  const animateButton = () => {
    if (!userTapButtonRef.current) return;

    Telegram.WebApp.HapticFeedback.impactOccurred("medium");

    userTapButtonRef.current.classList.add("scale-95");
    setTimeout(() => {
      userTapButtonRef.current?.classList.remove("scale-95");
    }, 150);
  };

  useEffect(() => {
    const count = debounceClicksCount;
    setClicksCount(0);
    if (count === 0) return;

    $http
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .post<Record<string, any>>("/clicker/tap", {
        count,
        energy: user.available_energy,
        timestamp: Math.floor(Date.now() / 1000),
      })
      .then(({ data }) => {
        if (data.leveled_up) {
          useUserStore.setState({
            level: data.level || user.level,
            earn_per_tap: data.earn_per_tap,
            max_energy: data.max_energy,
          });
        }
      })
      .catch(() => setClicksCount(count));
  }, [debounceClicksCount]);

  useEffect(() => {
    useClicksStore.setState({ clicks: [] });

    const interval = setInterval(() => {
      incraseEnergy(3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div {...props}>
      <div className="mt-4 mb-8">
        <button
          ref={userTapButtonRef}
          className="flex items-center justify-center mx-auto transition-all rounded-full outline-none select-none disabled:opacity-80 disabled:cursor-not-allowed"
          disabled={user.available_energy < user.earn_per_tap}
          // onClick={tabMe}
          onPointerUp={tabMe}
        >
          <img
            src={levelConfig.frogs[user.level?.level || 1]}
            alt="level image"
            className="object-contain max-w-full w-80 h-80"
            style={{ filter: levelConfig.filter[user.level?.level || 1] }}
          />
        </button>
      </div>

      <div ref={userAnimateRef} className="user-tap-animate">
        {clicks.map((click) => (
          <div
            key={click.id}
            onAnimationEnd={() => removeClick(click.id)}
            style={click.style}
          >
            +{click.value}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <img
            src="/images/coin.png"
            alt="coin"
            className="object-contain w-8 h-8"
          />
          <span className="text-xs font-bold">
            {user.available_energy} / {user.max_energy}
          </span>
        </div>
        <Link
          to={"/boost"}
          className="flex items-center space-x-2 text-sm font-bold"
        >
          <span className="text-xs font-bold">Boost</span>

          <img
            src="/images/boost.png"
            alt="boost"
            className="object-contain w-8 h-8"
          />
        </Link>
      </div>
    </div>
  );
}
