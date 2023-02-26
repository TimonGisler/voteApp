<script lang="ts">
let name:string = "TODO TGIS ADD NAME LOL"

let votesToDisplay = [
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
  

      <!-- Option -->
      {#each votesToDisplay as option, index (option.id)}
        <div class="form-control">
          <label class="input-group">
            <span class="cursor-grab">Rank: {index + 1}</span>
            <input
              bind:value={option.title}
              type="text"
              class="input input-bordered"
              disabled
            />
            <span class="cursor-grab">Votes: 99</span>
          </label>
        </div>
      {/each}

  </div>