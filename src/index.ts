import "@logseq/libs"

let locale = "en"
let translations: { [locale: string]: { [key: string]: string } } = {}

export async function setup(
  urlTemplate: string,
  builtinTranslations?: { [locale: string]: { [key: string]: string } },
) {
  locale = (await logseq.App.getUserConfigs()).preferredLanguage
  const url = urlTemplate.replace("${locale}", locale)
  try {
    const res = await fetch(url)
    if (res.ok) {
      const remoteTranslations = await res.json()
      translations = {
        ...builtinTranslations,
        ...remoteTranslations,
      }
    }
  } catch (err) {
    translations = { ...builtinTranslations }
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
