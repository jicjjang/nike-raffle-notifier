import axios from "axios";

import { timePrefixZero } from "./utils";

const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
const telegramBotDomain = process.env.TELEGRAM_BOT_DOMAIN;
const telegramBotChatId = process.env.TELEGRAM_BOT_CHAT_ID;

export const sendMessage = async (text: string | number) => {
  const date = new Date();

  // 로그도 같이 쌓음
  console.log(text);
  await axios.post(
    `${telegramBotDomain}/bot${telegramBotToken}/sendMessage`,
    null,
    {
      params: {
        chat_id: telegramBotChatId,
        text: `[ ${date.getFullYear()}-${timePrefixZero(
          date.getMonth() + 1
        )}-${timePrefixZero(date.getDate())}T${timePrefixZero(
          date.getHours()
        )}:${timePrefixZero(date.getMinutes())}:${timePrefixZero(
          date.getSeconds()
        )} ]\n${text}\n\n`,
      },
    }
  );
};

export const sendApiResponseErrorMessage = (error: Error) => {
  sendMessage(`[API RESPONSE ERROR] >>> ${JSON.stringify(error)}`);
};
