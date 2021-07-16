import axios from 'axios'

export interface ILogData {
  common: {
    clientTime: string // ISOString
  }
  data: any
}

const LogApi = {
  send(logData: ILogData) {
    axios.post('http://localhost:5000/logs', { common: logData.common, data: logData.data })
  },
}

export default LogApi
