<script lang="ts">
  import { dndzone } from "svelte-dnd-action";
  import { savePoll } from "./saveNewPollApi";
  import {push} from "svelte-spa-router";
  import type { Vote, Option } from "./CreatePollDto";


  let currentVoteName: string = "t";

  let items = [
    { id: 1, title: "You can edit this text" },
    { id: 2, title: "Press on rank to drag and drop" },
  ];

  function handleSort(e) {
    items = e.detail.items;
  }

  function createNewOption() {
    let newOptionId = getNextUniqueIdForItems();
    items = [...items, { id: newOptionId, title: "one" }];
    console.log(items);
  }

  function getNextUniqueIdForItems() {
    let biggestIdInItems = Math.max(...items.map((o) => o.id)); //create an array of the ids and return the biggest elemnt in this list
    return biggestIdInItems + 1;
  }

  async function saveOptions() {
    let vote: Vote = {
      name: currentVoteName,
      options: getOptions(),
    };

    //Save it to db
    let voteId : string = await savePoll(vote);
    //redirect to overview screen
    push('/CastVote/'+ voteId)
  }

  function getOptions(): Array<Option> {
    let voteOptions: Array<Option> = [];
    items.forEach((choice, index) => {
      let option: Option = {
        order: index,
        option: choice.title,
      };

      voteOptions.push(option);
    });

    return voteOptions;
  }
</script>

<div class="form-control gap-7">
  <!-- Name of this vote input -->
  <div class="form-control w-full max-w-xs">
    <input
      bind:value={currentVoteName}
      type="text"
      placeholder="Name of Vote"
      class="input input-bordered w-full max-w-xs"
    />
  </div>

  <!-- Add option button -->
  <button class="btn gap-2 btn-success" on:click={createNewOption}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 rotate-45"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      ><path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
    Add new choice
  </button>

  <div
    id="options"
    class="flex gap-4 flex-col"
    use:dndzone={{ items }}
    on:consider={handleSort}
    on:finalize={handleSort}
  >
    <!-- Option -->
    {#each items as option, index (option.id)}
      <div class="form-control">
        <label class="input-group">
          <span class="cursor-grab">Rank: {index + 1}</span>
          <input
            bind:value={option.title}
            type="text"
            placeholder="Option {index + 1}"
            class="input input-bordered"
          />
        </label>
      </div>
    {/each}
  </div>

  <!-- Save button -->
  <button class="btn gap-2 btn-success" on:click={saveOptions}>
    <span class="material-symbols-outlined"> save </span>
    Save
  </button>
</div>

<style>
  .material-symbols-outlined {
    font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 48;
  }
</style>
