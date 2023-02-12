import type { Vote as CreateVoteDto } from "./CreatePollDto";
import PocketBase from "pocketbase";


export async function saveVote(voteToSave: CreateVoteDto): Promise<string> {

  const pb = new PocketBase("http://127.0.0.1:8090");

  // example create data
  const data = {
    name: "test",
  };

  const record = await pb.collection("poll").create(data);

  return "someUniqueId";
}
