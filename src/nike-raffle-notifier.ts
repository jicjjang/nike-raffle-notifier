import express from "express";
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
    isFirst: boolean; // 처음일 때, log 회피를 위한 플래그
    isSet: boolean; // 사용 여부
  };
  feed: {
    shortcode: string;
    isFirst: boolean; // 처음일 때, log 회피를 위한 플래그
    isSet: boolean; // 사용 여부
  };
}

const NIKE_STORE_INFOMATION: IStoryInformation[] = [
  {
    id: "45739749549",
    name: "nike_thehyundaiseoul",
    story: { media_ids: [], isFirst: true, isSet: false },
    feed: { shortcode: "", isFirst: true, isSet: true },
  },
  {
    id: "5001525171",
    name: "nike_apgujeong",
    story: { media_ids: [], isFirst: true, isSet: false },
    feed: { shortcode: "", isFirst: true, isSet: true },
  },
  // 리뉴얼로 업데이트 안됨
  // {
  //   id: "2354243772",
  //   name: "nike_snkrs_hongdae",
  //   story: { media_ids: [], isFirst: true, isSet: false },
  //   feed: { shortcode: "", isFirst: true, isSet: true },
  // },
  {
    id: "7596298584",
    name: "ipark_yongsan_nike",
    story: { media_ids: [], isFirst: true, isSet: false },
    feed: { shortcode: "", isFirst: true, isSet: true },
  },
  {
    id: "31006499881",
    name: "lotte_incheon_nike_",
    story: { media_ids: [], isFirst: true, isSet: false },
    feed: { shortcode: "", isFirst: true, isSet: true },
  },
  {
    id: "37688555867",
    name: "nike_myeongdong_official",
    story: { media_ids: [], isFirst: true, isSet: false },
    feed: { shortcode: "", isFirst: true, isSet: true },
  },
  {
    id: "17357885839",
    name: "nike__seohyeon",
    story: { media_ids: [], isFirst: true, isSet: true },
    feed: { shortcode: "", isFirst: true, isSet: true },
  },
  {
    id: "6420124090",
    name: "nike_timessquare",
    story: { media_ids: [], isFirst: true, isSet: false },
    feed: { shortcode: "", isFirst: true, isSet: true },
  },
];

(async () => {
  // 월화수목금 정각으로부터 12분마다 조회
  cron.schedule(
    "0 0,15,30,45 10,11,12,13,14,15,16,17,18,19 * * *",
    async () => {
      await feedCheck(
        NIKE_STORE_INFOMATION.filter((store) => store.feed.isSet)
      );

      console.log(`date: ${new Date()}`);
      console.log(NIKE_STORE_INFOMATION);
      if (new Date().getMinutes() < 15) {
        sendMessage("Still alive nike-raffle-notify -> feed");
      }
    }
  );

  // 10-14시, 매 5분마다 스토리 조회
  cron.schedule("0 0/5 10,11,12,13,14 * * *", async () => {
    await storyCheck(
      NIKE_STORE_INFOMATION.filter((store) => store.story.isSet)
    );

    console.log(`date: ${new Date()}`);
    console.log(NIKE_STORE_INFOMATION);
    if (new Date().getMinutes() < 5) {
      sendMessage("Still alive nike-raffle-notify -> story");
    }
  });

  const PORT = process.env.PORT || 3000;

  const app = express();

  app.get("/", (_: Request, res: Response) => res.end("ping-pong"));
  app.listen(PORT, () => console.log(`Listening on ${PORT}`));
})();
