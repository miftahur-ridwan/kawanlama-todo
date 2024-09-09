import db from '../../models/index.js'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const userExist = await db.Users.findOne({ where: { username: body.username } })
  if (userExist) {
    throw createError({
      statusCode: 400,
      message: 'Sorry, this username is taken!',
    })
  }

  const user = await db.Users.create(body)

  const userData = {
    id: user?.dataValues?.id,
    username: user?.dataValues?.username,
  }

  await setUserSession(event, {
    user: userData,
    loggedInAt: new Date(),
  })

  return userData
})
