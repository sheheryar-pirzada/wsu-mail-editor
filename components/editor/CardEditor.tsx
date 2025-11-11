// components/editor/CardEditor.tsx - Card editor component

'use client'

import { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import type { Card, Link } from '@/types/newsletter'
import { Plus, Trash2 } from 'lucide-react'
import { CTA_BUTTON_DEFAULTS } from '@/lib/config'

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

interface CardEditorProps {
  card: Card
  onSave: (card: Card) => void
  onCancel: () => void
  onDelete?: () => void
}

export default function CardEditor({
  card,
  onSave,
  onCancel,
  onDelete,
}: CardEditorProps) {
  const [editedCard, setEditedCard] = useState<Card>(card)

  // Quill editor modules configuration
  const quillModules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],
        ['link'],
        [{ align: [] }],
        ['clean'],
      ],
    }),
    []
  )

  const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'indent',
    'link',
    'align',
  ]

  const updateCard = (updates: Partial<Card>) => {
    setEditedCard((prev) => ({ ...prev, ...updates } as Card))
  }

  const updateLink = (index: number, link: Link) => {
    const newLinks = [...(editedCard.links || [])]
    newLinks[index] = link
    updateCard({ links: newLinks })
  }

  const addLink = () => {
    const newLinks = [...(editedCard.links || []), { label: '', url: '' }]
    updateCard({ links: newLinks })
  }

  const removeLink = (index: number) => {
    const newLinks = editedCard.links?.filter((_, i) => i !== index) || []
    updateCard({ links: newLinks })
  }

  const handleSave = () => {
    onSave(editedCard)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-wsu-border-light p-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-wsu-text-dark">
            Edit Card ({editedCard.type})
          </h2>
          <div className="flex gap-2">
            {onDelete && (
              <button
                onClick={onDelete}
                className="px-3 py-1.5 text-sm font-medium text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition-colors flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            )}
            <button
              onClick={onCancel}
              className="px-3 py-1.5 text-sm font-medium text-wsu-text-muted border border-wsu-border-light rounded-md hover:bg-wsu-bg-light transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1.5 text-sm font-medium text-white bg-wsu-crimson border border-wsu-crimson-dark rounded-md hover:bg-wsu-crimson-dark transition-colors"
            >
              Save
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block mb-1 text-sm font-medium text-wsu-text-dark">
              Title *
            </label>
            <input
              type="text"
              value={editedCard.title || ''}
              onChange={(e) => updateCard({ title: e.target.value })}
              className="w-full px-3 py-2 border border-wsu-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-wsu-crimson"
              placeholder="Card title"
            />
          </div>

          {/* Body HTML - Rich Text Editor */}
          <div>
            <label className="block mb-1 text-sm font-medium text-wsu-text-dark">
              Body Content *
            </label>
            <div className="border border-wsu-border-light rounded-md overflow-hidden bg-white">
              <ReactQuill
                theme="snow"
                value={editedCard.body_html || ''}
                onChange={(value) => {
                  // Quill returns '<p><br></p>' or '<p></p>' for empty content
                  // Normalize to empty string for storage, but Quill needs the placeholder HTML
                  let normalizedValue = value
                  if (value === '<p><br></p>' || value === '<p></p>' || value.trim() === '') {
                    normalizedValue = ''
                  }
                  updateCard({ body_html: normalizedValue })
                }}
                modules={quillModules}
                formats={quillFormats}
                placeholder="Enter card content..."
                style={{
                  minHeight: '200px',
                }}
              />
            </div>
            <p className="mt-1 text-xs text-wsu-text-muted">
              Use the toolbar to format your content with bold, italic, lists, links, and more.
            </p>
          </div>

          {/* Location, Date, Time (for standard, event, resource cards) */}
          {(editedCard.type === 'standard' ||
            editedCard.type === 'event' ||
            editedCard.type === 'resource') && (
            <>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-wsu-text-dark">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editedCard.location || ''}
                    onChange={(e) => updateCard({ location: e.target.value })}
                    className="w-full px-3 py-2 border border-wsu-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-wsu-crimson"
                    placeholder="Location"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-wsu-text-dark">
                    Date
                  </label>
                  <input
                    type="text"
                    value={editedCard.date || ''}
                    onChange={(e) => updateCard({ date: e.target.value })}
                    className="w-full px-3 py-2 border border-wsu-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-wsu-crimson"
                    placeholder="Date"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-wsu-text-dark">
                    Time
                  </label>
                  <input
                    type="text"
                    value={editedCard.time || ''}
                    onChange={(e) => updateCard({ time: e.target.value })}
                    className="w-full px-3 py-2 border border-wsu-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-wsu-crimson"
                    placeholder="Time"
                  />
                </div>
              </div>
            </>
          )}

          {/* Resource Card Specific Fields */}
          {editedCard.type === 'resource' && (
            <div className="border-t border-wsu-border-light pt-4 space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="show_icon"
                  checked={editedCard.show_icon || false}
                  onChange={(e) =>
                    updateCard({ show_icon: e.target.checked })
                  }
                  className="w-4 h-4 text-wsu-crimson border-wsu-border-light rounded focus:ring-wsu-crimson"
                />
                <label
                  htmlFor="show_icon"
                  className="text-sm font-medium text-wsu-text-dark"
                >
                  Show Icon
                </label>
              </div>
              {editedCard.show_icon && (
                <>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-wsu-text-dark">
                      Icon URL
                    </label>
                    <input
                      type="url"
                      value={editedCard.icon_url || ''}
                      onChange={(e) =>
                        updateCard({ icon_url: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-wsu-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-wsu-crimson"
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-wsu-text-dark">
                      Icon Alt Text
                    </label>
                    <input
                      type="text"
                      value={editedCard.icon_alt || ''}
                      onChange={(e) =>
                        updateCard({ icon_alt: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-wsu-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-wsu-crimson"
                      placeholder="Icon description"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-wsu-text-dark">
                      Icon Size (px)
                    </label>
                    <input
                      type="number"
                      min="20"
                      max="200"
                      value={editedCard.icon_size || 80}
                      onChange={(e) =>
                        updateCard({
                          icon_size: parseInt(e.target.value) || 80,
                        })
                      }
                      className="w-full px-3 py-2 border border-wsu-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-wsu-crimson"
                    />
                  </div>
                </>
              )}
            </div>
          )}

          {/* CTA Card Specific Fields */}
          {editedCard.type === 'cta' && (
            <div className="border-t border-wsu-border-light pt-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-wsu-text-dark">
                    Text Alignment
                  </label>
                  <select
                    value={editedCard.text_alignment || 'left'}
                    onChange={(e) =>
                      updateCard({
                        text_alignment: e.target.value as 'left' | 'center' | 'right',
                      })
                    }
                    className="w-full px-3 py-2 border border-wsu-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-wsu-crimson"
                  >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-wsu-text-dark">
                    Button Alignment
                  </label>
                  <select
                    value={editedCard.button_alignment || 'center'}
                    onChange={(e) =>
                      updateCard({
                        button_alignment: e.target.value as
                          | 'left'
                          | 'center'
                          | 'right',
                      })
                    }
                    className="w-full px-3 py-2 border border-wsu-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-wsu-crimson"
                  >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-wsu-text-dark">
                    Button BG Color
                  </label>
                  <input
                    type="color"
                    value={
                      editedCard.button_bg_color || CTA_BUTTON_DEFAULTS.bg_color
                    }
                    onChange={(e) =>
                      updateCard({ button_bg_color: e.target.value })
                    }
                    className="w-full h-10 border border-wsu-border-light rounded-md cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-wsu-text-dark">
                    Button Text Color
                  </label>
                  <input
                    type="color"
                    value={
                      editedCard.button_text_color ||
                      CTA_BUTTON_DEFAULTS.text_color
                    }
                    onChange={(e) =>
                      updateCard({ button_text_color: e.target.value })
                    }
                    className="w-full h-10 border border-wsu-border-light rounded-md cursor-pointer"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="button_full_width"
                  checked={editedCard.button_full_width || false}
                  onChange={(e) =>
                    updateCard({ button_full_width: e.target.checked })
                  }
                  className="w-4 h-4 text-wsu-crimson border-wsu-border-light rounded focus:ring-wsu-crimson"
                />
                <label
                  htmlFor="button_full_width"
                  className="text-sm font-medium text-wsu-text-dark"
                >
                  Button Full Width
                </label>
              </div>
            </div>
          )}

          {/* Links */}
          <div className="border-t border-wsu-border-light pt-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-wsu-text-dark">
                Links
              </label>
              <button
                onClick={addLink}
                className="px-2 py-1 text-xs font-medium text-wsu-crimson border border-wsu-crimson rounded-md hover:bg-wsu-crimson/10 transition-colors flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                Add Link
              </button>
            </div>
            {editedCard.links && editedCard.links.length > 0 ? (
              <div className="space-y-2">
                {editedCard.links.map((link, index) => (
                  <div
                    key={index}
                    className="flex gap-2 p-2 border border-wsu-border-light rounded-md"
                  >
                    <div className="flex-1 grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={link.label || ''}
                        onChange={(e) =>
                          updateLink(index, { ...link, label: e.target.value })
                        }
                        placeholder="Link label"
                        className="px-2 py-1 text-sm border border-wsu-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-wsu-crimson"
                      />
                      <input
                        type="url"
                        value={link.url || ''}
                        onChange={(e) =>
                          updateLink(index, { ...link, url: e.target.value })
                        }
                        placeholder="https://..."
                        className="px-2 py-1 text-sm border border-wsu-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-wsu-crimson"
                      />
                    </div>
                    <button
                      onClick={() => removeLink(index)}
                      className="p-1 text-red-600 hover:text-red-700"
                      title="Remove link"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-wsu-text-muted">
                No links. Click &quot;Add Link&quot; to add one.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

