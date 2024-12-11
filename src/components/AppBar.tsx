import { Link, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";

const links = [
  { name: "Explore", link: "/", image: "/images/explore.png" },
  { name: "Missions", link: "/missions", image: "/images/missions.png" },
  { name: "Friends", link: "/friends", image: "/images/friends.png" },
  { name: "Bounty", link: "/earn", image: "/images/bounty.png" },
];

export default function AppBar() {
  const { pathname } = useLocation();
  return (
    <div className="fixed left-0 z-10 w-full px-5 py-0 bottom-2">
      <div className="flex items-center w-full p-2 gap-2 max-w-lg mx-auto rounded-[35px] bg-[linear-gradient(180deg,rgba(243,161,85,0.00)_66.37%,rgba(243,161,85,0.05)_100%)] backdrop-blur-3xl">
        {links.map((link, key) => (
          <Link
            key={key}
            to={link.link}
            className={cn(
              "relative flex items-center rounded-xl flex-col justify-center font-bold text-xs px-2.5 py-1.5 gap-1 select-none flex-1 text-white/30",
              pathname === link.link && " text-white"
            )}
          >
            {link.image && (
              <img
                src={link.image}
                alt={link.name}
                className={cn(
                  "w-7 h-7 object-contain filter grayscale",
                  pathname === link.link && "filter-none"
                )}
              />
            )}
            <span>{link.name}</span>
            <div
              className={cn(
                "absolute hidden -bottom-1 left-1/2 -translate-x-1/2 bg-[#D9D9D9] rounded-sm shadow-[0px_0px_4px_0px_#B88CFF] h-1 w-4/5",
                pathname === link.link && "block"
              )}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
