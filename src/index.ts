import "@logseq/libs"

const DEFAULT_LOCALE = "en"

let locale = DEFAULT_LOCALE
let translations: { [locale: string]: { [key: string]: string } } = {}

export async function setup({
  urlTemplate,
  defaultLocale = DEFAULT_LOCALE,
  builtinTranslations,
}: {
  urlTemplate: string
  defaultLocale?: string
  builtinTranslations?: { [locale: string]: { [key: string]: string } }
}) {
  locale = (await logseq.App.getUserConfigs()).preferredLanguage

  if (locale === defaultLocale) return

  if (builtinTranslations?.[locale] != null) {
    translations = builtinTranslations
  } else {
    const url = urlTemplate.replace("${locale}", locale)
    try {
      const res = await fetch(url)
      if (res.ok) {
        const remoteTranslations = await res.json()
        translations = { [locale]: remoteTranslations }
      }
    } catch (err) {
      console.error("translation fetch failed.\n", err)
    }
  }
}

export function t(key: string, args?: { [key: string]: string }) {
  const template = translations[locale]?.[key] ?? key

  if (args == null) return template

  return Object.entries(args).reduce(
    (str, [name, val]) => str.replaceAll(`\${${name}}`, val),
    template,
  )
}
