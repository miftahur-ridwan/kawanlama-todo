import db from '../../models/index.js'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { user }: any = await requireUserSession(event)
  const userDb = await db.Users.findOne({ where: { id: user.id } })
  if (!userDb) {
    throw createError({
      statusCode: 404,
      message: 'User not found!',
    })
  }
  const payload = {
    ...body,
    UserId: userDb?.dataValues?.id,
  }

  const todos = await db.Todos.create(payload)
  return todos?.dataValues
})
