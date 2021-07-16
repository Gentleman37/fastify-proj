import AWS from 'aws-sdk'
import config from '../config'
import { PostLogsBody } from '../schema-types/postLogs.body'

const { firehoseAccessKeyId, firehosesecretAccessKey, firehoseStreamName, firehoseRegion } = config.keys

AWS.config.region = firehoseRegion
AWS.config.credentials = new AWS.Credentials({
  accessKeyId: firehoseAccessKeyId,
  secretAccessKey: firehosesecretAccessKey,
})

const firehoseClient = new AWS.Firehose({
  credentials: AWS.config.credentials,
})

export default {
  putRecord(recordData: PostLogsBody) {
    const finalData = {
      ...recordData,
      serverTime: new Date().toISOString(),
    }

    firehoseClient.putRecord(
      {
        DeliveryStreamName: firehoseStreamName,
        Record: { Data: JSON.stringify(finalData) },
      },
      (err, success) => {
        if (err) console.error(err)
        if (success) console.log(success)
        else console.log('nothing...')
      }
    )
  },
}
