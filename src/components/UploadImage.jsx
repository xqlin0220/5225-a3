import React, { useState } from 'react'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity'
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity'

// 从环境变量读取配置
const REGION    = import.meta.env.VITE_AWS_REGION
const POOL_ID   = import.meta.env.VITE_AWS_IDENTITY_POOL_ID
const BUCKET    = import.meta.env.VITE_S3_BUCKET_NAME

// S3 Client，使用 Cognito 身份池获取临时凭证
const s3Client = new S3Client({
  region: REGION,
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: REGION }),
    identityPoolId: POOL_ID,
  }),
})

export default function UploadImage() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = e => {
    setFile(e.target.files[0] || null)
  }

  const handleUpload = async () => {
    if (!file) return alert('请选择一个文件')
    setLoading(true)
    try {
      const key = `${Date.now()}-${file.name}`
      const cmd = new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: file,
        ContentType: file.type,
      })
      await s3Client.send(cmd)
      alert('上传成功: ' + key)
    } catch (err) {
      console.error(err)
      alert('上传失败，请查看控制台')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <input type="file" accept="image/*" onChange={handleChange} />
      <button onClick={handleUpload} disabled={loading || !file}>
        {loading ? '上传中…' : '上传到 S3'}
      </button>
    </div>
  )
}