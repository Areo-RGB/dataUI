import { type NextRequest, NextResponse } from "next/server"
import { getSignedSpacesUrl, extractKeyFromUrl } from "@/lib/digital-ocean"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const videoUrl = searchParams.get("url")

    if (!videoUrl) {
      return NextResponse.json({ error: "Missing video URL parameter" }, { status: 400 })
    }

    // Extract the key from the URL
    const key = extractKeyFromUrl(videoUrl)

    // Generate a signed URL
    const signedUrl = await getSignedSpacesUrl(key)

    return NextResponse.json({ url: signedUrl })
  } catch (error) {
    console.error("Error generating signed URL:", error)
    return NextResponse.json({ error: "Failed to generate signed URL" }, { status: 500 })
  }
}
