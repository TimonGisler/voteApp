import type { Vote as CreatePollDto } from "./CreatePollDto";
import PocketBase from "pocketbase";


export async function savePoll(pollToSave: CreatePollDto): Promise<string> {

  //TODO TGIS --> MAKE IT SO THAT I CANNOT EDIT THE POLL ONCE CREATED !!!!!!
  const pb = new PocketBase("http://127.0.0.1:8090"); //TODO TGIS, use correct ip (https://www.google.com/search?q=vite+environment+variables&oq=vite+envir&aqs=chrome.0.0i67i395j69i57j0i20i263i395i512l2j0i512l6.1389j1j4&sourceid=chrome&ie=UTF-8)

  //Save poll
  const record = await pb.collection("poll").create(pollToSave);
  let pollId:string = record.id;

  //save options of poll
  pollToSave.options.forEach(async option => {
    let optionToSave =       {
      displayRank: option.order,
      name: option.option,
      pollId: pollId
    }

    //https://github.com/pocketbase/js-sdk#auto-cancellation
    pb.collection("option").create(optionToSave, { '$autoCancel': false });
  });

  return pollId;
}
