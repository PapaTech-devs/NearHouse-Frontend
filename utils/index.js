// COMPRESSION PERCENTAGE
// let before = 0,
//   after = 0
// for (let image of files) before += image.size / 1024 / 1024
// const compressedFiles = await compressImages()
// for (let image of compressedFiles) after += image.size / 1024 / 1024
// console.log(`Before ${before} and after ${after}`)

import imageCompression from "browser-image-compression"

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

async function compressImages(values) {
  let res = []
  for (let image of values.files) {
    const imageFile = image
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    }
    try {
      const compressedImage = await imageCompression(imageFile, options)
      res.push(compressedImage)
    } catch (error) {
      throw error
    }
  }
  return res
}

async function uploadImages(images, id) {
  let res = []
  for (let image of images) {
    let link = await uploadImage(image, id)
    res.push(link)
  }
  return res
}

export const storeUser = async (values, setAuthUser) => {
  let data = {}
  for (let key in values)
    if (key !== "password" && key !== "confirmPassword") data[key] = values[key]

  setAuthUser(data)
  try {
    const res = await fetch(`/backend/user`, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    const d = await res.json()
    return d["user"]
  } catch (err) {
    console.error(err)
  }
}

export const getUser = async (userid) => {
  try {
    const res = await fetch(`/backend/user/${userid}`)
    const d = await res.json()
    return d["User"]
  } catch (err) {
    console.error(err)
  }
}

export const storeProperty = async (values, setLoadingText) => {
  let data = {}
  for (let key in values)
    if (values[key] !== "" && key !== "files" && key !== "preview")
      data[key] = values[key]

  setLoadingText("Compressing images...")
  const compressedFiles = await compressImages(values)
  setLoadingText("Uploading images to server...")
  const links = await uploadImages(compressedFiles, values.propertyid)
  data.images = links
  setLoadingText("Posting data to backend...")

  try {
    const res = await fetch(`/backend/properties/propertyList`, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    const d = await res.json()
    setLoadingText(null)
    return d["property"]
  } catch (err) {
    console.error(err)
  }
}

export const deleteProperty = async (property) => {
  for (let url of property.images) {
    const index = url.lastIndexOf("/")
    const key = property.propertyid + url.slice(index)

    await fetch(`/api/deleteImage?key=${key}`).then((res) => res.json())
  }

  try {
    const res = await fetch(`/backend/properties/${property.propertyid}`, {
      method: "DELETE",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    })
    await res.json()
  } catch (err) {
    console.error(err)
  }
}

export const updateProperty = async (values, setLoadingText) => {
  let data = {}
  for (let key in values)
    if (values[key] !== "" && key !== "files" && key !== "preview")
      data[key] = values[key]

  setLoadingText("Compressing images...")
  const compressedFiles = await compressImages(values)
  setLoadingText("Uploading images to server...")
  const links = await uploadImages(compressedFiles, values.propertyid)
  data.images = data.images.concat(links)
  setLoadingText("Posting data to backend...")

  try {
    const res = await fetch(`/backend/properties/${values.propertyid}`, {
      method: "PATCH",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    const d = await res.json()
    console.log("updated", d)
    setLoadingText(null)
    return d["property"]
  } catch (err) {
    console.error(err)
  }
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
