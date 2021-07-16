import { InferGetServerSidePropsType } from 'next'
import Image from 'next/image'
import { useEffect } from 'react'
import router from 'next/router'
import styles from '../styles/Home.module.css'
import LogApi from '../api/log'
import { useDispatchUser, useUser } from '../context/userContext'
import { useGentle } from '../context/gentleContext'

interface IProps extends InferGetServerSidePropsType<typeof getServerSideProps> {}

const Home: React.FC<IProps> = ({ user }) => {
  const gentleClient = useGentle()

  useEffect(() => {
    gentleClient?.track({ eventName: 'view', properties: { page: 'home' } })
  }, [])

  useEffect(() => {
    // LogApi.send({ common: { clientTime: new Date().toISOString() }, data: { user } })
  }, [])

  const dispatch = useDispatchUser()

  const handleLogin = () => {
    gentleClient?.track({ eventName: 'login', properties: { email: user.email } }, user.id)
  }

  const handleGoAbout = () => {
    gentleClient?.track({ eventName: 'click', properties: { button: 'GO ABOUT' } })
    router.push('/about')
  }

  return (
    <div>
      <h1>HOME PAGE</h1>
      <div className={styles.container}>
        <div style={{ width: '200px', height: '200px', background: 'red' }} onClick={handleLogin}>
          로그인
        </div>

        <div style={{ width: '200px', height: '200px', background: 'yellow' }} onClick={handleGoAbout}>
          GO ABOUT
        </div>

        <div style={{ width: '200px', height: '200px', background: 'green' }} onClick={() => console.log(gentleClient?.getEvents())}>
          로그보기
        </div>
        <div style={{ width: '200px', height: '200px', background: 'blue' }} onClick={() => gentleClient?.resetEvents()}>
          로그리셋
        </div>

        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <span className={styles.logo}>
              <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
            </span>
          </a>
        </footer>
      </div>
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  const mcokUsers = [
    { id: 1, name: 'yeah', age: 25, email: 'yeah@example.com' },
    { id: 2, name: 'bull', age: 51, email: 'bull@example.com' },
    { id: 3, name: 'shit', age: 18, email: 'shit@example.com' },
    { id: 4, name: 'pizza', age: 33, email: 'pizza@example.com' },
    { id: 5, name: 'mike', age: 83, email: 'mike@example.com' },
  ]

  const randomUser = mcokUsers[Math.floor(Math.random() * mcokUsers.length)]

  return {
    props: {
      user: randomUser,
    },
  }
}
