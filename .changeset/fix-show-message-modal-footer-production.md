---
'@siemens/ix-react': patch
'@siemens/ix-vue': patch
---

Fix `showMessage` not rendering `ix-modal-footer` in production builds, which caused action buttons to lose alignment. `ix-modal-footer` custom element is now explicitly registered alongside `ix-modal`.
