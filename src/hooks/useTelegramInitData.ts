import { useEffect, useState } from "react";
import { TelegramWebApps } from "telegram-webapps-types";

/**
 * Hook to get the initial data from the Telegram Web Apps API already parsed.
 * @example
 * const { hash } = useTelegramInitData();
 * console.log({ hash });
 */

const fakeData = {
  user: {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    usernames: "johndoe",
  },

  start_param: "ref1",
} as TelegramWebApps.WebAppInitData;

function useTelegramInitData() {
  const [data, setData] = useState<TelegramWebApps.WebAppInitData>({});

  useEffect(() => {
    const firstLayerInitData = Object.fromEntries(
      new URLSearchParams(window.Telegram.WebApp.initData)
    );

    const initData: Record<string, string> = {};

    for (const key in firstLayerInitData) {
      try {
        initData[key] = JSON.parse(firstLayerInitData[key]);
      } catch {
        initData[key] = firstLayerInitData[key];
      }
    }

    setData(import.meta.env.DEV ? fakeData : initData);
  }, []);

  return data;
}

export default useTelegramInitData;
