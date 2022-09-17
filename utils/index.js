// COMPRESSION PERCENTAGE
// let before = 0,
//   after = 0
// for (let image of files) before += image.size / 1024 / 1024
// const compressedFiles = await compressImages()
// for (let image of compressedFiles) after += image.size / 1024 / 1024
// console.log(`Before ${before} and after ${after}`)

export const validateEmail = (email) => {
  // eslint-disable-next-line
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    email.toLowerCase()
  )
}

export const validatePhoneNumber = (phone) => {
  return /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(phone)
}

export const handleInputChange = (e, setValues, values) => {
  const { name, value } = e.target
  setValues({
    ...values,
    [name]: value,
  })
}

export const uploadImage = async (file, dir) => {
  const config = {
    dirName: dir,
    bucketName: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY,
  }
  const filename = encodeURIComponent(file.name)
  const fileType = encodeURIComponent(file.type)

  const res = await fetch(
    `/api/uploadUrl?file=${filename}&fileType=${fileType}&directory=${config.dirName}`
  )
  const { url, fields } = await res.json()
  const formData = new FormData()

  Object.entries({ ...fields, file }).forEach(([key, value]) => {
    formData.append(key, value)
  })

  const upload = await fetch(url, {
    method: "POST",
    body: formData,
  })

  if (upload.ok) {
    return `https://${config.bucketName}.s3.${config.region}.amazonaws.com/${config.dirName}/${filename}`
  } else {
    console.error("Upload failed.")
  }
}

export const showToast = (message, variant, toast) => {
  toast({
    title: message,
    status: variant,
    isClosable: true,
    duration: 3500,
  })
}
