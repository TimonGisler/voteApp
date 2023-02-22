import type { Vote, VoteOptions } from "./VoteDisplayData";
import PocketBase from "pocketbase";

export async function getVote(id: string): Promise<Vote> {
  const pb = new PocketBase("http://127.0.0.1:8090"); //TODO TGIS, use correct ip (https://www.google.com/search?q=vite+environment+variables&oq=vite+envir&aqs=chrome.0.0i67i395j69i57j0i20i263i395i512l2j0i512l6.1389j1j4&sourceid=chrome&ie=UTF-8)

  //Get poll (http://127.0.0.1:8090/api/collections/poll/records/kmaa5v3b8makd12?expand=option)
  let record = await pb.collection("poll").getOne(id, {
    expand: "option",
  });

  let recordIdFilter : string =  'pollId = "' + record.id + '"' ;

  // you can also fetch all records at once via getFullList
  //http://127.0.0.1:8090/api/collections/option/records?page=1&perPage=200&sort=-created
  // with poll expanded (will not use just fyi ) http://127.0.0.1:8090/api/collections/option/records/3559dxitirt5wjx?expand=pollId
  let options = await pb.collection('option').getFullList(200, {
    filter: recordIdFilter,
  });

  //I dont want to figure out how to return the correct thing, so, I am going to do it like this : )
  return mapRecordToVote(record, options);
}

function mapRecordToVote(record, options) : Vote{
  let mappedOptions: Array<VoteOptions> = [];
  options.forEach(option => {
    mappedOptions.push({
      id: option.id,
      optionName: option.name,
    })
  });

  return {
    id: record.id,
    name: record.name,
    options: mappedOptions,
  };
}

function getDummyVote(): Vote {
  return {
    id: 1,
    name: "test",
    options: [
      {
        id: "1",
        optionName: "DummyOption",
      },
      {
        id: "2",
        optionName: "DummyOption2",
      },
    ],
  };
}
