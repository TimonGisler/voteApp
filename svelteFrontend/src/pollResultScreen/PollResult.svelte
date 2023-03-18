<script lang="ts">
  import { getVoteOverview } from "./getVoteOverview";
  import type { PollOverview } from "./VoteOverview";

  export let params; //props
  let pollId: string = params.pollId;
  let name: string = "TODO TGIS ADD NAME LOL";

  let voteToDisplay: PollOverview;
  getVoteOverview(pollId).then((vote) => {
    voteToDisplay = vote;
  });

  let votesToDisplay24 = [
    { id: 1, title: "You can edit this text" },
    { id: 2, title: "Press on rank to drag and drop" },
  ];
</script>

<div class="form-control gap-7">
  <!-- Name of this vote input -->
  <div class="form-control w-full">
    <input
      bind:value={name}
      type="text"
      class="input input-bordered w-full text-center"
      disabled
    />
  </div>
  {#if !voteToDisplay}
    loading ...
  {:else}
    <!-- Option -->
    {#each voteToDisplay.options as option, index}
      <div class="form-control">
        <label class="input-group">
          <span class="cursor-grab">Rank: {index + 1}</span>
          <input
            value={option.optionName}
            type="text"
            class="input input-bordered"
            disabled
          />
          <span class="cursor-grab">Average rank: {option.averageRank}</span>
        </label>
      </div>
    {/each}
  {/if}
</div>
