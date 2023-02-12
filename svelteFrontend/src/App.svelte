<script>
  import CreateNewPoll from "./createNewPoll/CreateNewPoll.svelte";
  import Navbar from "./shared components/navbar.svelte";
  import Router, { location, link } from "svelte-spa-router";
  import CastVote from "./castVote/CastVote.svelte";
</script>

<Navbar />

<div id="Content" class="flex justify-center">
  <Router
  routes={{
    "/": CreateNewPoll,
    "/CastVote/:voteId": CastVote,
  }}
/>
</div>

<svelte:head>
  <!-- import google font-->
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
  />
</svelte:head>


