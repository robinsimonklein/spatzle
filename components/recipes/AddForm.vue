<template>
  <UForm class="space-y-4" :schema :state @submit="onSubmit">
    <UFormGroup label="Nom" name="name" required>
      <UInput v-model="state.name" placeholder="Nom" :disabled="isLoading" />
    </UFormGroup>
    <UFormGroup label="Description" name="description">
      <UTextarea v-model="state.description" placeholder="Description" :disabled="isLoading" />
    </UFormGroup>
    <UButton label="Ajouter" type="submit" :loading="isLoading" />
  </UForm>
</template>

<script setup lang="ts">
import { z } from 'zod';
import type { Recipe } from '~/server/utils/drizzle';

const schema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

// type Schema = z.output<typeof schema>

const isLoading = ref(false);

const recipes = useRecipesStore();

const state = reactive<{ name?: string; description?: string }>({
  name: undefined,
  description: undefined,
});

async function onSubmit() {
  try {
    isLoading.value = true;
    await recipes.create(state as Recipe);
    clear();
    await recipes.refresh();
  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false;
  }
}

function clear() {
  state.name = undefined;
  state.description = undefined;
}
</script>
