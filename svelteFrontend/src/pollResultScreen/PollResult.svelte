<script lang="ts">
let name:string = "TODO TGIS ADD NAME LOL"

let votesToDisplay = [
  { id: 1, title: "You can edit this text" },
  { id: 2, title: "Press on rank to drag and drop" },
];

</script>


<div class="form-control gap-7">
    <!-- Name of this vote input -->
    <div class="form-control w-full max-w-xs">
      <input
        bind:value={name}
        type="text"
        placeholder="Name of Vote"
        class="input input-bordered w-full max-w-xs"
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
          </label>
        </div>
      {/each}

  </div>