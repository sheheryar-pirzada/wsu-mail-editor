// components/editor/SectionsEditor.tsx - Sections editor component

import type { NewsletterData, Section, Card } from '@/types/newsletter'
import { Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react'

interface SectionsEditorProps {
  state: NewsletterData
  updateState: (
    updater: (prev: NewsletterData) => NewsletterData,
    pushHistory?: boolean
  ) => void
}

export default function SectionsEditor({
  state,
  updateState,
}: SectionsEditorProps) {
  const sections = state.sections || []

  const addSection = () => {
    const title = window.prompt('Enter section title:')
    if (!title) return

    const key = title.toLowerCase().replace(/\s+/g, '_')

    updateState(
      (prev) => ({
        ...prev,
        sections: [
          ...prev.sections,
          {
            key,
            title,
            layout: {
              padding_top: 18,
              padding_bottom: 28,
              background_color: '',
              border_radius: 0,
              divider_enabled: true,
              divider_thickness: 2,
              divider_color: '#e0e0e0',
              divider_spacing: 24,
              title_align: 'left',
            },
            cards: [],
          },
        ],
      }),
      true
    )
  }

  const removeSection = (index: number) => {
    if (window.confirm('Remove this entire section?')) {
      updateState(
        (prev) => ({
          ...prev,
          sections: prev.sections.filter((_, i) => i !== index),
        }),
        true
      )
    }
  }

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= sections.length) return

    updateState(
      (prev) => {
        const newSections = [...prev.sections]
        const temp = newSections[index]
        newSections[index] = newSections[newIndex]
        newSections[newIndex] = temp
        return { ...prev, sections: newSections }
      },
      true
    )
  }

  const updateSection = (index: number, section: Section) => {
    updateState((prev) => {
      const newSections = [...prev.sections]
      newSections[index] = section
      return { ...prev, sections: newSections }
    })
  }

  return (
    <div className="space-y-4">
      {sections.map((section, index) => (
        <div
          key={index}
          className="p-4 border-2 border-dashed border-wsu-border-light rounded-lg bg-wsu-bg-light"
        >
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-wsu-crimson">
              {section.title || section.key}
            </h4>
            <div className="flex gap-1">
              <button
                onClick={() => moveSection(index, 'up')}
                disabled={index === 0}
                className="p-1 text-wsu-text-muted hover:text-wsu-crimson disabled:opacity-30"
                title="Move up"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => moveSection(index, 'down')}
                disabled={index === sections.length - 1}
                className="p-1 text-wsu-text-muted hover:text-wsu-crimson disabled:opacity-30"
                title="Move down"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                onClick={() => removeSection(index)}
                className="p-1 text-red-600 hover:text-red-700"
                title="Remove section"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <div>
              <label className="block text-xs font-medium text-wsu-text-dark mb-1">
                Section Title
              </label>
              <input
                type="text"
                value={section.title || ''}
                onChange={(e) =>
                  updateSection(index, { ...section, title: e.target.value })
                }
                className="w-full px-2 py-1 text-sm border border-wsu-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-wsu-crimson"
              />
            </div>

            <div className="text-xs text-wsu-text-muted">
              {section.cards?.length || 0} card(s)
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addSection}
        className="w-full px-4 py-2 text-sm font-medium text-wsu-crimson border-2 border-dashed border-wsu-crimson rounded-lg hover:bg-wsu-crimson/10 transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add New Section
      </button>
    </div>
  )
}

