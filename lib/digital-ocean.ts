import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

// Digital Ocean Spaces configuration
const s3Client = new S3Client({
  region: "fra1", // Change to your Digital Ocean Spaces region
  endpoint: "https://fra1.digitaloceanspaces.com",
  credentials: {
    accessKeyId: process.env.DO_SPACES_KEY || "",
    secretAccessKey: process.env.DO_SPACES_SECRET || "",
  },
})

/**
 * Generate a signed URL for a Digital Ocean Spaces object
 * @param key The object key (path) in the Space
 * @param bucket The Space name
 * @param expiresIn Expiration time in seconds (default: 3600 = 1 hour)
 * @returns A signed URL that can be used to access the object
 */
export async function getSignedSpacesUrl(key: string, bucket = "data3", expiresIn = 3600): Promise<string> {
  try {
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    })

    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn,
    })

    return signedUrl
  } catch (error) {
    console.error("Error generating signed URL:", error)
    throw error
  }
}

/**
 * Extract the key from a Digital Ocean Spaces URL
 * @param url The full URL to the object
 * @returns The object key
 */
export function extractKeyFromUrl(url: string): string {
  // Example URL: https://data3.fra1.cdn.digitaloceanspaces.com/999_tvai.mp4
  // We want to extract: 999_tvai.mp4
  const urlObj = new URL(url)
  const pathParts = urlObj.pathname.split("/")
  return pathParts[pathParts.length - 1]
}
