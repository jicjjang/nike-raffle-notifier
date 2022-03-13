import * as express from "express";
import * as cron from "node-cron";

import "dotenv/config";

import storyCheck from "./service/storyCheck";
import feedCheck from "./service/feedCheck";
import { Request, Response } from "express";
import { sendMessage } from "./bot";

export interface IStoryInformation {
  id: string;
  name: string;
  story: {
    media_ids: string[];
    isFirst: boolean;
  };
  feed: {
    shortcode: string;
    isFirst: boolean;
  };
}

const NIKE_STORE_INFOMATION: IStoryInformation[] = [
  {
    id: "45739749549",
    name: "nike_thehyundaiseoul",
    story: { media_ids: [], isFirst: true },
    feed: { shortcode: "", isFirst: true },
  },
  {
    id: "5001525171",
    name: "nike_apgujeong",
    story: { media_ids: [], isFirst: true },
    feed: { shortcode: "", isFirst: true },
  },
  {
    id: "2354243772",
    name: "nike_snkrs_hongdae",
    story: { media_ids: [], isFirst: true },
    feed: { shortcode: "", isFirst: true },
  },
  {
    id: "7596298584",
    name: "ipark_yongsan_nike",
    story: { media_ids: [], isFirst: true },
    feed: { shortcode: "", isFirst: true },
  },
  {
    id: "31006499881",
    name: "lotte_incheon_nike_",
    story: { media_ids: [], isFirst: true },
    feed: { shortcode: "", isFirst: true },
  },
  {
    id: "37688555867",
    name: "nike_myeongdong_official",
    story: { media_ids: [], isFirst: true },
    feed: { shortcode: "", isFirst: true },
  },
  {
    id: "17357885839",
    name: "nike__seohyeon",
    story: { media_ids: [], isFirst: true },
    feed: { shortcode: "", isFirst: true },
  },
];

let count = 0;

(async () => {
  // 월화수목금 정각으로부터 12분마다 조회
  cron.schedule(
    "0 0,12,24,36,48 10,11,12,13,14,15,16,17,18,19 * * *",
    async () => {
      await storyCheck(NIKE_STORE_INFOMATION);
      await feedCheck(NIKE_STORE_INFOMATION);

      if (count++ % 5 === 0) {
        sendMessage("Still alive nike-raffle-notify");
      }
    }
  );

  const PORT = process.env.PORT || 3000;

  express()
    .get("/", (req: Request, res: Response) => res.end("ping-pong"))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));
})();
