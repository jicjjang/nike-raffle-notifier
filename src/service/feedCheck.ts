import { IStoryInformation } from "../";
import { fetchNikeStoreFeed } from "../api";
import { sendMessage } from "../bot";

const feedCheck = async (NIKE_STORE_INFOMATION: IStoryInformation[]) => {
  const instagramFeeds = await Promise.all(
    NIKE_STORE_INFOMATION.map((nikeStore) => fetchNikeStoreFeed(nikeStore.name))
  );

  instagramFeeds.forEach((instagramFeed, index) => {
    const medias =
      instagramFeed.graphql.user.edge_owner_to_timeline_media.edges;
    if (
      medias.length &&
      medias[0].node.shortcode !== NIKE_STORE_INFOMATION[index].feed.shortcode
    ) {
      NIKE_STORE_INFOMATION[index].feed.shortcode = medias[0].node.shortcode;

      // 처음 접속해서 NIKE_STORE_INFOMATION 의 array가 비어있는 경우는 Notify하지 않음
      if (!NIKE_STORE_INFOMATION[index].feed.isFirst) {
        sendMessage(
          `[${NIKE_STORE_INFOMATION[index].name}] feed에 게시물이 추가된 것 같아요!`
        );
      }
    }

    if (NIKE_STORE_INFOMATION[index].feed.isFirst) {
      NIKE_STORE_INFOMATION[index].feed.isFirst = false;
    }
  });
};

export default feedCheck;
