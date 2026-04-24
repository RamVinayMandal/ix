---
'@siemens/ix': patch
'@siemens/ix-react': patch
'@siemens/ix-vue': patch
---

Fix tree-shaking and runtime component registration for React and Vue wrapper packages. Adds `sideEffects` metadata so consumer bundlers can safely tree-shake unused modules while retaining side-effect-only files. Ensures `ix-modal-loading` is always registered at runtime in Vue apps. Fixes CSS and SCSS assets in `@siemens/ix` being incorrectly tree-shaken by consumer bundlers.
