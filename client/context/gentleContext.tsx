import React, { useContext, createContext, useState } from 'react'
import { GentleSDKClient } from 'gentleman-sample-sdk'

const GentleSDKContext = createContext<GentleSDKClient | null>(null)

interface IProps {
  gentleClient: GentleSDKClient
}

export const GentleProvider: React.FC<IProps> = ({ gentleClient, children }) => {
  const [state] = useState<GentleSDKClient>(gentleClient)

  return <GentleSDKContext.Provider value={state}>{children}</GentleSDKContext.Provider>
}

export const useGentle = () => {
  if (GentleSDKContext !== null) return useContext(GentleSDKContext)

  throw new Error('GentleSDKContext is null!')
}
