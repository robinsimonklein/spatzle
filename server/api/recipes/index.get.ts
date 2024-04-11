export default eventHandler(async (event) => {
    return await useDrizzle().select().from(tables.recipes).all()
})