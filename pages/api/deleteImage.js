import S3 from "aws-sdk/clients/s3"

export default async function handler(req, res) {
  const config = {
    // dirName: directory,
    bucketName: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY,
  }

  const s3 = new S3({
    apiVersion: "2006-03-01",
    params: { Bucket: config.bucketName },
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    region: config.region,
  })
  var params = { Bucket: config.bucketName, Key: req.query.key }
  try {
    await s3.deleteObject(params).promise()
    res.status(200).json({ message: "success" })
  } catch (err) {
    res.status(400).json({ message: "error" })
  }
}
