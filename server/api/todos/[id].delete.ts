import db from '../../models/index.js'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  await requireUserSession(event)
  const todo = await db.Todos.findOne({ where: { id } })
  if (!todo) {
    throw createError({
      statusCode: 404,
      message: 'Todo not found!',
    })
  }
  await todo.destroy()
  return todo
})
