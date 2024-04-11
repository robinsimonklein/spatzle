export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')

    return await useDrizzle().delete(tables.recipes).where(eq(tables.recipes.id, id));
})