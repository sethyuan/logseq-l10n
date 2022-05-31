# logseq-l10n

L10N framework for Logseq plugins.

## How to use it

```js
import logseq from "@logseq/libs"
import { setup, t } from "logseq-l10n"
import zhCN from "./translations/zh-CN.json"

logseq
  .ready(async () => {
    // `urlTemplate` is a template for the URL used to fetch the
    // translation files. "${locale}" will be replaced with user's
    // current locale.
    // `builtinTranslations` when provided, can accelerate the setup
    // process if user's locale is already contained.
    // `defaultLocale` when provided (default to "en"), can accelerate
    // the setup process if user's locale matches the default one.
    const l10nSetup = setup({
      urlTemplate:
        "https://raw.githubusercontent.com/sethyuan/logseq-plugin-doc/master/src/translations/${locale}.json",
      builtinTranslations: { "zh-CN": zhCN },
    })

    // Here goes other plugin initialization code.

    // You have to await setup to finish before calling other
    // functions in `logseq-l10n`.
    await l10nSetup

    // Use `t` for text with translations.
    console.log(t("Hello world!"))
    // Text with arguments is also supported.
    console.log(t("Hello ${name}!", { name: "world" }))
  })
  .catch(console.error)
```
