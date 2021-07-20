import React, { useContext, createContext, useState } from 'react'
import { GentleInstance } from 'gentleman-sample-sdk'

const GentleSDKContext = createContext<GentleInstance | null>(null)

interface IProps {
  gentleClient: GentleInstance
}

export const GentleProvider: React.FC<IProps> = ({ gentleClient, children }) => {
  const [state] = useState<GentleInstance>(gentleClient)

  return <GentleSDKContext.Provider value={state}>{children}</GentleSDKContext.Provider>
}

export const useGentle = () => {
  if (GentleSDKContext !== null) return useContext(GentleSDKContext)

  throw new Error('GentleSDKContext is null!')
}
