import db from '../../models/index.js'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
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

  await db.Todos.update(
    payload,
    {
      where: {
        id,
      },
    },
  )
  return payload
})
