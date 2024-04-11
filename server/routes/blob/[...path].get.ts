export default defineEventHandler(async event => {
  const path = getRouterParam(event, 'path');

  if (!path) throw createError({ statusCode: 404 });

  return hubBlob().serve(event, path);
});
