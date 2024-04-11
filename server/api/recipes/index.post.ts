export default eventHandler(async event => {
  const { name, description } = await readBody(event);

  return await useDrizzle()
    .insert(tables.recipes)
    .values({
      name,
      description,
      createdAt: new Date(),
    })
    .returning()
    .get();
});
