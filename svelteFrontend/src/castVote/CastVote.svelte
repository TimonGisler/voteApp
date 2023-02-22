<script lang="ts">
  import { dndzone } from "svelte-dnd-action";
  import { getVote } from "./getVoteApi";
  import { castVote } from "./castVoteApi";
  import type { Vote } from "./VoteDisplayData";
  import type { CastVoteCommand, VoteOptionToCast } from "./CastVoteCommand";

  export let params; //props
  let voteId: string = params.voteId;
  let voteToDisplay: Promise<Vote> = getVote(voteId);

  let voteToCast: CastVoteCommand;

  function handleSort(e) {
    voteToCast.options = e.detail.items;
  }

  function handleCastVoteButtonClick() {
    castVote(voteToCast);
  }
</script>

<div class="form-control gap-7">
  {#await voteToDisplay}
    LOL
  {:then vote}
    <!-- Name of this vote -->
    <div class="form-control w-full max-w-xs">
      <input
        value={vote.name}
        type="text"
        class="input input-bordered w-full max-w-xs"
        disabled
      />
    </div>

    <div
      id="options"
      class="flex gap-4 flex-col"
      use:dndzone={{ items: vote.options }}
      on:consider={handleSort}
      on:finalize={handleSort}
    >
      <!-- Option -->
      {#each vote.options as option, index (option.id)}
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
  {/await}

  <!-- Save button -->
  <button class="btn gap-2 btn-success" on:click={handleCastVoteButtonClick}>
    <span class="material-symbols-outlined"> how_to_vote </span>
    Cast Vote
  </button>
</div>

<style>
  .material-symbols-outlined {
    font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 48;
  }
</style>
