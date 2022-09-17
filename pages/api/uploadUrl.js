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

  const post = await s3.createPresignedPost({
    Bucket: config.bucketName,
    Fields: {
      key: `${req.query.directory}/${req.query.file}`,
      "Content-Type": req.query.fileType,
    },
    Expires: 240, // seconds
    Conditions: [
      ["content-length-range", 0, 1548576], // up to 1.5 MB
    ],
  })

  res.status(200).json(post)
}
