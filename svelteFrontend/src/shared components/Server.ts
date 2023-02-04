import type { CastVoteData, Vote } from "./Types";

let savedVotes: Array<Vote> = [];

export function saveVoteServerSide(voteToSave: Vote):number{
    let randomnumber = Math.floor(Math.random() * 1000000000);
    voteToSave.id = randomnumber;

    savedVotes.push(voteToSave);

    return randomnumber;
}

export function getVoteServerSider(id:number):Vote {
    return savedVotes.find(vote => vote.id == id);
}

export function castVoteServerSide(vote: CastVoteData) {
    console.log("vote was cast congrats");
}
