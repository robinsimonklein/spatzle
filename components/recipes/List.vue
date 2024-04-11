<template>
  <div class="grid grid-cols-3 gap-4">
    <UCard v-for="item in recipes.items">
      <template v-if="item.coverImage" #header>
        <img :src="'/blob/' + item.coverImage" :alt="item.name" />
      </template>
      <template #default>
        <h2 class="mb-2 text-lg">{{ item.name }}</h2>
        <p class="text-sm opacity-70">{{ item.description }}</p>
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const recipes = useRecipesStore();
</script>
