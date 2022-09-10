<button on:click="{login}">Login</button>

<script lang="ts">
  import { goto } from "$app/navigation"

  function login() {
    goto("/api/auth/login")
  }
</script>
