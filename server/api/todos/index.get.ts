import db from '../../models/index.js'
import type { User } from '~/types/auth.ts'

export default defineEventHandler(async (event) => {
  const { user }: { user: User } = await requireUserSession(event)

  const todos = await db.Todos.findAll({
    order: [
      ['activitiesNo', 'ASC'],
    ],
    include: db.Users,
    where: {
      UserId: user.id,
    },
  })
  return todos
})
