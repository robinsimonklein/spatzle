<template>
  <div>
    <UContainer>
      <RecipesList />
      <RecipesAddForm  />
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const recipes = useRecipesStore()

await useAsyncData('recipes', () => recipes.refresh().then(() => true))
</script>
