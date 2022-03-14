import { IStoryInformation } from "../";
import { fetchNikeStoreStory } from "../api";
import { compareArray } from "../utils";
import { sendMessage } from "../bot";

const storyCheck = async (NIKE_STORE_INFOMATION: IStoryInformation[]) => {
  let isFirst = true;

  const instagramStories = await Promise.all(
    NIKE_STORE_INFOMATION.map((nikeStore) => fetchNikeStoreStory(nikeStore.id))
  );

  instagramStories.forEach((instagramStory, index) => {
    if (
      !compareArray(
        instagramStory?.reel?.media_ids || [],
        NIKE_STORE_INFOMATION[index].story.media_ids
      )
    ) {
      NIKE_STORE_INFOMATION[index].story.media_ids = Object.assign(
        [],
        instagramStory?.reel?.media_ids
      );

      // 처음 접속해서 NIKE_STORE_INFOMATION 의 array가 비어있는 경우는 Notify하지 않음
      if (!NIKE_STORE_INFOMATION[index].story.isFirst) {
        sendMessage(
          `[${NIKE_STORE_INFOMATION[index].name}] story가 추가된 것 같아요!`
        );
      }
    }

    if (NIKE_STORE_INFOMATION[index].story.isFirst) {
      NIKE_STORE_INFOMATION[index].story.isFirst = false;
    }
  });
};

export default storyCheck;
