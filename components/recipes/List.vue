<template>

  <UTable :rows="recipes.items" :columns>
    <template #actions-data="{ row }">
      <UButton color="red" variant="ghost" icon="i-heroicons-trash" :loading="isRemovingId === row.id" :disabled="typeof isRemovingId === 'number'" @click="remove(row.id)" />
    </template>
  </UTable>
</template>

<script setup lang="ts">
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

const recipes = useRecipesStore()

const isRemovingId = ref<number | null>(null)

async function remove(id: number) {
  try {
    isRemovingId.value = id

    await recipes.remove(id)
    await recipes.refresh()
  } catch (e) {

  } finally {
    isRemovingId.value = null
  }
}
</script>
