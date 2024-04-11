<template>
  <UContainer>
    <RecipesList />
  </UContainer>
</template>

<script setup lang="ts">
const recipes = useRecipesStore();

await useAsyncData('recipes', () => recipes.refresh().then(() => true));
</script>
