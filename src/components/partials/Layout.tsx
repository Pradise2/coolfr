import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AppBar from "../AppBar";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { $http } from "@/lib/http";
import { PopupMessageType } from "@/types/PopupMessageType";
import PopupMessageDialog from "../PopupMessageDialog";

export default function Layout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const popupMessgae = useQuery({
    queryKey: ["popup-message"],
    queryFn: () => $http.$get<PopupMessageType>("/popups"),
  });

  useEffect(() => {
    if (pathname !== "/") {
      window.Telegram.WebApp.BackButton.show();
    } else {
      window.Telegram.WebApp.BackButton.hide();
    }
  }, [pathname]);

  useEffect(() => {
    window.Telegram.WebApp.BackButton.onClick(() => {
      navigate("/");
    });
  }, []);
  return (
    <main className="flex flex-col w-full max-w-lg h-[--tg-viewport-height] mx-auto text-white">
      <Outlet />
      <AppBar />
      <PopupMessageDialog message={popupMessgae.data} />
    </main>
  );
}
