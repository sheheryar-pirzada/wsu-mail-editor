// components/editor/FooterEditor.tsx - Footer editor component

import type { NewsletterData, SocialLink } from '@/types/newsletter'
import { Plus, Trash2 } from 'lucide-react'

interface FooterEditorProps {
  state: NewsletterData
  updateState: (
    updater: (prev: NewsletterData) => NewsletterData,
    pushHistory?: boolean
  ) => void
}

export default function FooterEditor({
  state,
  updateState,
}: FooterEditorProps) {
  const footer = state.footer || {
    address_lines: [],
    social: [],
    background_color: '#2A3033',
    text_color: '#cccccc',
    link_color: '#ffffff',
  }

  const addAddressLine = () => {
    updateState(
      (prev) => ({
        ...prev,
        footer: {
          ...prev.footer,
          address_lines: [
            ...(prev.footer?.address_lines || []),
            'New address line',
          ],
        },
      }),
      true
    )
  }

  const updateAddressLine = (index: number, value: string) => {
    updateState((prev) => {
      const newAddressLines = [...(prev.footer?.address_lines || [])]
      newAddressLines[index] = value
      return {
        ...prev,
        footer: { ...prev.footer, address_lines: newAddressLines },
      }
    })
  }

  const removeAddressLine = (index: number) => {
    updateState(
      (prev) => {
        const newAddressLines = [...(prev.footer?.address_lines || [])]
        newAddressLines.splice(index, 1)
        return {
          ...prev,
          footer: { ...prev.footer, address_lines: newAddressLines },
        }
      },
      true
    )
  }

  const addSocialLink = () => {
    updateState(
      (prev) => ({
        ...prev,
        footer: {
          ...prev.footer,
          social: [
            ...(prev.footer?.social || []),
            {
              platform: 'Twitter',
              url: 'https://twitter.com/',
              icon: 'https://example.com/twitter-icon.png',
              alt: 'Twitter',
            },
          ],
        },
      }),
      true
    )
  }

  const updateSocialLink = (index: number, link: SocialLink) => {
    updateState((prev) => {
      const newSocial = [...(prev.footer?.social || [])]
      newSocial[index] = link
      return {
        ...prev,
        footer: { ...prev.footer, social: newSocial },
      }
    })
  }

  const removeSocialLink = (index: number) => {
    updateState(
      (prev) => {
        const newSocial = [...(prev.footer?.social || [])]
        newSocial.splice(index, 1)
        return {
          ...prev,
          footer: { ...prev.footer, social: newSocial },
        }
      },
      true
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <h4 className="mb-2 text-sm font-semibold text-wsu-text-dark">
          Address Lines
        </h4>
        <div className="space-y-2">
          {(footer.address_lines || []).map((line, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={line}
                onChange={(e) => updateAddressLine(index, e.target.value)}
                className="flex-1 px-2 py-1 text-sm border border-wsu-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-wsu-crimson"
              />
              <button
                onClick={() => removeAddressLine(index)}
                className="p-1 text-red-600 hover:text-red-700"
                title="Remove"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={addAddressLine}
          className="mt-2 px-3 py-1.5 text-sm font-medium text-wsu-crimson border border-wsu-crimson rounded-md hover:bg-wsu-crimson/10 transition-colors flex items-center gap-1"
        >
          <Plus className="w-3 h-3" />
          Add Address Line
        </button>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-semibold text-wsu-text-dark">
          Social Media Links
        </h4>
        <div className="space-y-2">
          {(footer.social || []).map((link, index) => (
            <div
              key={index}
              className="flex gap-2 items-center"
            >
              <input
                type="text"
                placeholder="Platform"
                value={link.platform || ''}
                onChange={(e) =>
                  updateSocialLink(index, {
                    ...link,
                    platform: e.target.value,
                    alt: e.target.value,
                  })
                }
                className="flex-1 px-2 py-1 text-sm border border-wsu-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-wsu-crimson"
              />
              <input
                type="url"
                placeholder="Profile URL"
                value={link.url || ''}
                onChange={(e) =>
                  updateSocialLink(index, { ...link, url: e.target.value })
                }
                className="flex-1 px-2 py-1 text-sm border border-wsu-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-wsu-crimson"
              />
              <input
                type="url"
                placeholder="Icon URL"
                value={link.icon || ''}
                onChange={(e) =>
                  updateSocialLink(index, { ...link, icon: e.target.value })
                }
                className="flex-1 px-2 py-1 text-sm border border-wsu-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-wsu-crimson"
              />
              <button
                onClick={() => removeSocialLink(index)}
                className="p-1 text-red-600 hover:text-red-700 flex-shrink-0"
                title="Remove"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={addSocialLink}
          className="mt-2 px-3 py-1.5 text-sm font-medium text-wsu-crimson border border-wsu-crimson rounded-md hover:bg-wsu-crimson/10 transition-colors flex items-center gap-1"
        >
          <Plus className="w-3 h-3" />
          Add Social Link
        </button>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-semibold text-wsu-text-dark">
          Footer Styling
        </h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <label className="text-sm text-wsu-text-dark w-32">
              Background Color
            </label>
            <input
              type="color"
              value={footer.background_color || '#2A3033'}
              onChange={(e) =>
                updateState((prev) => ({
                  ...prev,
                  footer: {
                    ...prev.footer,
                    background_color: e.target.value,
                  },
                }))
              }
              className="h-8 w-16 border border-wsu-border-light rounded"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-wsu-text-dark w-32">Text Color</label>
            <input
              type="color"
              value={footer.text_color || '#cccccc'}
              onChange={(e) =>
                updateState((prev) => ({
                  ...prev,
                  footer: { ...prev.footer, text_color: e.target.value },
                }))
              }
              className="h-8 w-16 border border-wsu-border-light rounded"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-wsu-text-dark w-32">Link Color</label>
            <input
              type="color"
              value={footer.link_color || '#ffffff'}
              onChange={(e) =>
                updateState((prev) => ({
                  ...prev,
                  footer: { ...prev.footer, link_color: e.target.value },
                }))
              }
              className="h-8 w-16 border border-wsu-border-light rounded"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

