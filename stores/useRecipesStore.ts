import type { Recipe } from '~/server/utils/drizzle';

export const useRecipesStore = defineStore('recipes', () => {
  const items = shallowRef<Recipe[]>([]);

  const refresh = async () => {
    items.value = await $fetch('/api/recipes', { method: 'GET' });
  };

  const create = async (newRecipe: FormData) => {
    await $fetch('/api/recipes', { method: 'POST', body: newRecipe });
  };

  const remove = async (id: number) => {
    await $fetch(`/api/recipes/${id}`, { method: 'DELETE' });
  };

  return { items, refresh, create, remove };
});
