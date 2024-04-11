<template>
  <UContainer>
    <UForm ref="form" class="space-y-4" :schema :state @submit="onSubmit">
      <UFormGroup label="Nom" name="name" required>
        <UInput v-model="state.name" placeholder="Nom" :disabled="isLoading" />
      </UFormGroup>
      <UFormGroup label="Description" name="description">
        <UTextarea v-model="state.description" placeholder="Description" :disabled="isLoading" />
      </UFormGroup>
      <UFormGroup label="Image de couverture" name="coverImage">
        <UInput v-model="state.coverImage" type="file" accept="image/png, image/jpeg" :disabled="isLoading" />
      </UFormGroup>
      <UButton label="Ajouter" type="submit" :loading="isLoading" />
    </UForm>
  </UContainer>
</template>

<script setup lang="ts">
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';

const schema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

type Schema = z.output<typeof schema>;

const form = ref<HTMLFormElement>();

const isLoading = ref(false);

const recipes = useRecipesStore();
const toast = useToast();

const state = reactive({
  name: undefined,
  description: undefined,
  coverImage: undefined,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    isLoading.value = true;
    console.log('form', form.value?.$el);
    if (!form.value?.$el) return;

    const formData = new FormData(form.value.$el);

    await recipes.create(formData);
    clear();
    toast.add({ title: 'Nouvelle recette ajoutée', color: 'green' });
    await navigateTo('/');
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
