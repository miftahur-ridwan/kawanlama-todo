import db from '../../models/index.js'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const user = await db.Users.findOne({ where: { username: body.username } })

  if (!user) {
    throw createError({
      statusCode: 404,
      message: 'User not found!',
    })
  }

  if (!user?.dataValues?.password || !await user.validPassword(body?.password)) {
    throw createError({
      statusCode: 400,
      message: 'Password is wrong!',
    })
  }

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
