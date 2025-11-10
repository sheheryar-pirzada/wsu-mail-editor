// app/api/import/route.ts - Import newsletter from HTML file

import { NextRequest, NextResponse } from 'next/server'
import type { NewsletterData, ImportResponse } from '@/types/newsletter'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const htmlContent = body.html || ''

    // Try new Base64 format first
    let match = htmlContent.match(
      /<!-- WSU_NEWSLETTER_DATA_B64\s+(.*?)\s+-->/s
    )

    if (match) {
      // Extract and decode Base64 data
      const b64Data = match[1].replace(/\s+/g, '')
      try {
        const jsonStr = Buffer.from(b64Data, 'base64').toString('utf-8')
        const newsletterData: NewsletterData = JSON.parse(jsonStr)
        console.log('✅ Imported newsletter from Base64-encoded data')
        return NextResponse.json<ImportResponse>({
          success: true,
          data: newsletterData,
        })
      } catch (decodeError) {
        console.error('Failed to decode Base64 data:', decodeError)
        return NextResponse.json<ImportResponse>(
          {
            success: false,
            error: 'Corrupted embedded data (Base64 decode failed)',
          },
          { status: 400 }
        )
      }
    } else {
      // Try legacy JSON format (unencoded)
      match = htmlContent.match(/<!-- WSU_NEWSLETTER_DATA:(.*?) -->/s)

      if (!match) {
        return NextResponse.json<ImportResponse>(
          {
            success: false,
            error:
              'No embedded data found. This HTML was not exported from this editor.',
          },
          { status: 400 }
        )
      }

      const jsonStr = match[1]
      const newsletterData: NewsletterData = JSON.parse(jsonStr)
      console.log('✅ Imported newsletter from legacy JSON format')

      // V7 MIGRATION: Convert old social object to array
      if (newsletterData.footer && newsletterData.footer.social) {
        const social = newsletterData.footer.social

        // If it's old object format, convert to array
        if (typeof social === 'object' && !Array.isArray(social)) {
          const migratedSocial: Array<{
            platform: string
            url: string
            icon: string
            alt: string
          }> = []

          // Convert known platforms in order
          const platformKeys = [
            'instagram',
            'linkedin',
            'facebook',
            'twitter',
            'youtube',
          ]
          for (const platformKey of platformKeys) {
            if (platformKey in social) {
              const platformData = (social as any)[platformKey]

              // Handle both old formats (string URL or object with url/icon)
              if (typeof platformData === 'string') {
                // Very old format: just a string URL
                migratedSocial.push({
                  platform: platformKey.charAt(0).toUpperCase() + platformKey.slice(1),
                  url: platformData,
                  icon: '',
                  alt: platformKey.charAt(0).toUpperCase() + platformKey.slice(1),
                })
              } else if (typeof platformData === 'object') {
                // V6 format: object with url and icon
                migratedSocial.push({
                  platform:
                    platformKey.charAt(0).toUpperCase() + platformKey.slice(1),
                  url: platformData.url || '',
                  icon: platformData.icon || '',
                  alt: platformData.alt || platformKey.charAt(0).toUpperCase() + platformKey.slice(1),
                })
              }
            }
          }

          newsletterData.footer.social = migratedSocial
          console.log(
            `✅ Migrated ${migratedSocial.length} social links from V6 to V7 format`
          )
        }
      }

      // V7 MIGRATION: Add title_align to sections if missing
      if (newsletterData.sections) {
        for (const section of newsletterData.sections) {
          if (section.layout && !section.layout.title_align) {
            section.layout.title_align = 'left'
            console.log(
              `✅ Added default title_align to section: ${section.title || 'untitled'}`
            )
          }
        }
      }

      return NextResponse.json<ImportResponse>({
        success: true,
        data: newsletterData,
      })
    }
  } catch (error) {
    console.error('Import failed:', error)
    return NextResponse.json<ImportResponse>(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Import failed',
      },
      { status: 500 }
    )
  }
}

