<script>
  import Nav from "../lib/components/Nav.svelte";
</script>

<Nav />

<slot></slot>

<style>
  :global(body) {
    font-family: Arial, Helvetica, sans-serif;
  }
</style>