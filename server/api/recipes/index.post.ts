export default eventHandler(async event => {
  const form = await readFormData(event);
  const coverImage = form.get('coverImage') as File;

  let recipe = await useDrizzle()
    .insert(tables.recipes)
    .values({
      name: form.get('name') as string,
      description: form.get('description') as string,
    })
    .returning()
    .get();

  if (coverImage?.size) {
    ensureBlob(coverImage, { maxSize: '2MB', types: ['image'] });

    const coverImageBlob = await hubBlob().put(`images/recipes/${recipe.id}/cover_image`, coverImage, {
      addRandomSuffix: false,
    });

    console.log({ coverImageBlob });

    recipe = await useDrizzle()
      .update(tables.recipes)
      .set({ coverImage: coverImageBlob.pathname })
      .where(eq(tables.recipes.id, recipe.id))
      .returning()
      .get();
  }

  return recipe;
});
