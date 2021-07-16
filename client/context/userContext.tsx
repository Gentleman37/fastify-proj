import React, { useReducer, useContext, createContext, Dispatch } from 'react'

interface IUserState {
  name: string | null
  age: string | null
}

type UserAction = { type: 'UPDATE'; userInfo: IUserState } | { type: 'INIT'; initialUser: IUserState }

const initialUser: IUserState = {
  name: null,
  age: null,
}

const UserStateContext = createContext<IUserState>(initialUser)
const UserDispatchContext = createContext<Dispatch<UserAction> | null>(null)

const reducer = (state: IUserState, action: UserAction) => {
  switch (action.type) {
    case 'UPDATE':
      return { ...state, ...action.userInfo }
    case 'INIT':
      return initialUser
    default:
      throw new Error(`Unknown action`)
  }
}

export const UserProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialUser)

  return (
    <UserDispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={state}>{children}</UserStateContext.Provider>
    </UserDispatchContext.Provider>
  )
}

export const useUser = () => useContext(UserStateContext)
export const useDispatchUser = () => useContext(UserDispatchContext)
