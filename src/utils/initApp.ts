import { sizeController } from './init/size'
import { userController } from './init/user'

export interface IApp {
  name: string
  author: {
    name: string
    link: string
  }
}

export function InitApp() {
  // declare app information
  const app: IApp = {
    name: 'BondingTechs',
    author: {
      name: 'Bonding',
      link: '#',
    },
  }
  useState('app', () => app)

  const size = sizeController()
  const user = userController()

  return {
    app,
    size,
    user,
  }
}
