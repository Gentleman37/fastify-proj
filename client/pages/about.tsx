import React, { useEffect } from 'react'
import router from 'next/router'
import { useGentle } from '../context/gentleContext'

interface IProps {}

const About: React.FC<IProps> = () => {
  const gentleClient = useGentle()
  useEffect(() => {
    const ueah = async () => {
      const res = await gentleClient?.track({
        endPoint: '/logs',
        event: { eventName: 'view', properties: { page: 'about' } },
      })
      console.log(res)
    }

    ueah()
  }, [])
  // console.log(gentleClient)

  const handleGoHome = async () => {
    const res = await gentleClient?.track({
      endPoint: '/logs',
      event: { eventName: 'click', properties: { button: 'GO HOME' } },
    })
    console.log(res)
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
