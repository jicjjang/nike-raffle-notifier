import axios from "axios";

import { sendApiResponseErrorMessage, sendMessage } from "./bot";

interface IReel {
  reel?: {
    media_ids: string[];
  };
}

interface IFeedEdge {
  node: {
    shortcode: string;
  };
}

interface IFeed {
  graphql: {
    user: {
      edge_owner_to_timeline_media: {
        edges: IFeedEdge[];
      };
    };
  };
}

const headers = {
  "sec-ch-ua-platform": "macOS",
  "sec-ch-ua": ' Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99',
  "sec-ch-ua-mobile": "?0",
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-site",
  "x-asbd-id": "198387",
  "x-ig-app-id": "936619743392459",
  "x-ig-www-claim": "hmac.AR0qoM5HKzT1va5aLuDNVmMZrv4p-3jzDOYThpPTfyGFYAvP",
  cookie: `sessionid=${process.env.SESSION_ID}; ds_user_id=${process.env.USER_ID}`,
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36",
};

export const fetchNikeStoreStory = async (id: string) => {
  try {
    const result = await axios.get<IReel>(
      `https://i.instagram.com/api/v1/feed/user/${id}/story/`,
      {
        headers,
      }
    );
    if (result.request?.path.startsWith("/accounts/login")) {
      sendMessage("로그인이 필요하다는 알림이 왔음");
      process.exit(-1);
    } else if (typeof result.data === "string") {
      sendMessage("instagram 결과가 문자열로 옴. 알 수 없는 에러");
      console.log(result.data);
      process.exit(-1);
    }
    return result.data;
  } catch (e) {
    throw e;
  }
};

export const fetchNikeStoreFeed = async (name: string) => {
  try {
    const result = await axios.get<IFeed>(
      `https://www.instagram.com/${name}/?__a=1`,
      {
        headers,
      }
    );
    return result.data;
  } catch (e: any) {
    sendApiResponseErrorMessage(new Error(e));
    throw e;
  }
};
