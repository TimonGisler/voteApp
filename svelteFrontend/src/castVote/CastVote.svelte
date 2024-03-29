<script lang="ts">
  import { dndzone } from "svelte-dnd-action";
  import { getVote } from "./getVoteApi";
  import { castVote } from "./castVoteApi";
  import type { Vote } from "./VoteDisplayData";
  import type { CastVoteCommand, VoteOptionToCast } from "./CastVoteCommand";
  import { push } from "svelte-spa-router";

  export let params; //props
  let pollId: string = params.voteId;
  let voteToDisplay: Vote;

  getVote(pollId).then((vote) => {
    voteToDisplay = vote;
  });

  // https://svelte.dev/repl/964fdac31cb9496da9ded35002300abb?version=3.55.1
  function handleSort(e) {
    voteToDisplay.options = e.detail.items;
  }

  function handleCastVoteButtonClick() {
    let voteToCast: CastVoteCommand = getCastVoteCommand();
    castVote(voteToCast);

    push('/pollResult/' + pollId);
  }

  // Convert the vote that is displayed to the vote that should be casted
  // rank will be the current display order
  function getCastVoteCommand() {
    let voteToCast: CastVoteCommand;
    voteToCast = {
      pollId: pollId,
      options: voteToDisplay.options.map((option) => {
        return {
          optionId: option.id,
          rank: voteToDisplay.options.indexOf(option) + 1,
        } as VoteOptionToCast;
      }),
    };
    return voteToCast;
  }
</script>

<div class="form-control gap-7">
  <!-- if voteToDisplay is falsy (is not yet set for example (because the promise has not yet resolve)) display loading... -->
  {#if !voteToDisplay} 
    loading ...
  {:else}
    <!-- Name of this vote -->
    <div class="form-control w-full max-w-xs">
      <input
        value={voteToDisplay.name}
        type="text"
        class="input input-bordered w-full max-w-xs"
        disabled
      />
    </div>

    <div
      id="options"
      class="flex gap-4 flex-col"
      use:dndzone={{ items: voteToDisplay.options }}
      on:consider={handleSort}
      on:finalize={handleSort}
    >
      <!-- Option -->
      {#each voteToDisplay.options as option, index (option.id)}
        <div class="form-control">
          <label class="input-group">
            <span class="cursor-grab">Rank: {index + 1}</span>
            <input
              disabled
              bind:value={option.optionName}
              type="text"
              placeholder="Option {index + 1}"
              class="input input-bordered"
            />
          </label>
        </div>
      {/each}
    </div>

    <!-- Save button -->
    <button class="btn gap-2 btn-success" on:click={handleCastVoteButtonClick}>
      <span class="material-symbols-outlined"> how_to_vote </span>
      Cast Vote
    </button>
  {/if}
</div>

<style>
  .material-symbols-outlined {
    font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 48;
  }
</style>
