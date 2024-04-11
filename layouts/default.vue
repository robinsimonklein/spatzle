<template>
  <div>
    <header>
      <UContainer class="mb-4 py-2">
        <UHorizontalNavigation :links />
      </UContainer>
    </header>
    <slot />
  </div>
</template>

<script setup lang="ts">
const links = [
  [
    {
      label: 'Recettes',
      icon: 'i-heroicons-home',
      to: '/',
    },
  ],
  [
    {
      label: 'Nouvelle recette',
      icon: 'i-heroicons-plus',
      to: '/create',
    },
  ],
];
</script>
