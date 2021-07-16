export default {
  keys: {
    firehoseAccessKeyId: process.env.FIREHOSE_ACCESS_KEY_ID || '',
    firehosesecretAccessKey: process.env.FIREHOSE_SECRET_ACCESS_KEY || '',
    firehoseStreamName: process.env.FIREHOSE_STREAM_NAME || '',
    firehoseRegion: process.env.FIREHOSE_REGION || '',
  },
}
