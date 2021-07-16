import axios from 'axios'

export interface ILogData {
  common: {
    clientTime: string // ISOString
  }
  data: any
}

const LogApi = {
  send(logData: ILogData) {
    axios.post('http://localhost:8000/logs', { common: logData.common, daTa: logData.data })
  },
}

export default LogApi
