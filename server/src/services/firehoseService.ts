import AWS from 'aws-sdk'
import config from '../config'
import { PostLogsBody } from '../schema-types/postLogs.body'

const { firehoseAccessKeyId, firehoseSecretAccessKey, firehoseStreamName, firehoseRegion } = config.keys

AWS.config.region = firehoseRegion
AWS.config.credentials = new AWS.Credentials({
  accessKeyId: firehoseAccessKeyId,
  secretAccessKey: firehoseSecretAccessKey,
})

const firehoseClient = new AWS.Firehose({
  credentials: AWS.config.credentials,
})

export default {
  putRecord(recordData: PostLogsBody) {
    const finalData = {
      ...recordData,
      serverTime: new Date().getTime(),
    }

    firehoseClient.putRecord(
      {
        DeliveryStreamName: firehoseStreamName,
        Record: { Data: JSON.stringify(finalData) },
      },
      (err, success) => {
        if (err) throw new Error(err.message)
        if (success) return success
        else console.log('nothing...')
      }
    )
  },
}
