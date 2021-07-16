import React, { useEffect } from 'react'
import router from 'next/router'
import { GentleSDKClient } from 'gentleman-sample-sdk'
import { useGentle } from '../context/gentleContext'

interface IProps {}

const About: React.FC<IProps> = () => {
  const gentleClient = useGentle()
  useEffect(() => {
    gentleClient?.track({ eventName: 'view', properties: { page: 'about' } })
    // LogApi.send({ common: { clientTime: new Date().toISOString() }, data: { user } })
  }, [])

  const handleGoHome = () => {
    gentleClient?.track({ eventName: 'click', properties: { page: 'about' } })
    router.push('/')
  }

  return (
    <div>
      <h1>ABOUT PAGE</h1>

      <div style={{ width: '200px', height: '200px', background: 'red' }} onClick={handleGoHome}>
        GO HOME
      </div>

      <div style={{ width: '200px', height: '200px', background: 'green' }} onClick={() => console.log(gentleClient?.getEvents())}>
        로그보기
      </div>
      <div style={{ width: '200px', height: '200px', background: 'blue' }} onClick={() => gentleClient?.resetEvents()}>
        로그리셋
      </div>
    </div>
  )
}

export default About
