<template>
  <div>
    <UContainer>
      <UTable :rows="recipes" :columns>
        <template #actions-data="{ row }">
          <UButton color="red" variant="ghost" icon="i-heroicons-trash" @click="remove(row.id)" />
        </template>
      </UTable>
      <UForm class="space-y-4" :schema :state @submit="onSubmit">
        <UFormGroup label="Nom" name="name" required>
          <UInput v-model="state.name" placeholder="Nom" />
        </UFormGroup>
        <UFormGroup label="Description" name="description">
          <UTextarea v-model="state.description"  placeholder="Description" />
        </UFormGroup>
        <UButton label="Ajouter" type="submit" />
      </UForm>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod'
import type {Recipe} from "~/server/utils/drizzle";


const columns = [{
  key: 'id',
  label: 'Id'
}, {
  key: 'name',
  label: 'Nom'
}, {
  key: 'description',
  label: 'Description'
}, {
  key: 'actions'
}]

const {data: recipes, refresh} = await useFetch<Recipe[]>('/api/recipes')

const schema = z.object({
  name: z.string(),
  description: z.string().optional()
})

type Schema = z.output<typeof schema>

const state = reactive({
  name: undefined,
  description: undefined
})

async function onSubmit() {
  // Do something with data
  await $fetch('/api/recipes', {method: 'POST', body: state})
  clear()
  await refresh()
}

async function remove(id: number) {
  await $fetch(`/api/recipes/${id}`, {method: 'DELETE'})
  await refresh()
}

function clear() {
  state.name = undefined
  state.description = undefined
}
</script>
