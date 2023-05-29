# logseq-l10n

L10N framework for Logseq plugins.

## How to use it

```js
import "@logseq/libs"
import { setup, t } from "logseq-l10n"
import zhCN from "./translations/zh-CN.json"

logseq
  .ready(async () => {
    // `builtinTranslations` when provided, can accelerate the setup
    // process if user's locale is already contained.
    // `defaultLocale` when provided (default to "en"), can accelerate
    // the setup process if user's locale matches the default one.
    await setup({ builtinTranslations: { "zh-CN": zhCN } })

    // Use `t` for text with translations.
    console.log(t("Hello world!"))
    // Text with arguments is also supported.
    console.log(t("Hello ${name}!", { name: "world" }))
  })
  .catch(console.error)
```

```js
// src/translations/zh-CN.json

// Key is the default text used, value is the respective translation.

{
  "Hello world!": "你好世界！",
  "Hello ${name}!": "你好${name}！"
}
```

For a referential plugin implementation, please see [logseq-plugin-doc](https://github.com/sethyuan/logseq-plugin-doc).
