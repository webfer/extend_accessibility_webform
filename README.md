# Extend Accessibility Webform (Clientside Validation + Webform) for Drupal

A Drupal custom module that improves the accessibility of Webform client-side
validation errors by converting jQuery Validate error **labels** into a live
region **span**, and ensuring the related input is described by the error
message.

🚀 **Why?** Client-side validation often injects error **labels** that are not
reliably announced by assistive technologies. This module makes the error message
behave like an assertive alert and wires it into `aria-describedby`.

---

## 📦 Module Overview

- **Name**: Extend Accessibility Webform
- **Package**: Custom
- **Compatibility**: Drupal 10, 11

This module:

- Automatically attaches a small JavaScript library to **all Webform submission
  forms**.
- Overrides jQuery Validate `showErrors()` to post-process error elements.
- Replaces error `<label class="error" ...>` elements with:
  - `<span role="alert" aria-live="assertive" ...>`
  - the original error text
- Ensures the related input includes the error element ID in `aria-describedby`.

### Key features

- Automatic attachment (no per-form configuration)
- Accessibility-first output (`role="alert"`, `aria-live="assertive"`)
- Safe against repeated replacements via a `data-error-replaced` flag

---

## 🛠 Installation

### ✅ Install with Composer (recommended) 🧰

From your Drupal project root:

```bash
composer require webfer/extend_accessibility_webform
```

Composer will install the module into your Drupal codebase (commonly under
`web/modules/contrib/` in standard Drupal Composer templates). 📦

Then enable the module:

- 📍 **Admin > Extend** → enable **Extend Accessibility Webform**, or
- 💻 `drush en extend_accessibility_webform -y`

### 🧩 Install without Composer (development only)

If you’re developing locally, you can still place the module folder under:

- `web/modules/custom/extend_accessibility_webform`

---

## ✅ Requirements

### Drupal

- Drupal core 10/11

### Dependencies

- `webform` (Webform submission forms)
- `clientside_validation` (provides the jQuery Validate integration)

Notes:

- This module relies on the presence of jQuery Validate (`$.validator`). The
  attached library depends on `clientside_validation/jquery.validate`.
- The module does not add any admin UI, permissions, or configuration schema.

---

## ⚙ Configuration

No configuration is required.

The module attaches its library to Webform submission forms by detecting:

- form IDs that start with `webform_submission_`, or
- the `webform-submission-form` CSS class on the rendered form.

---

## 🧩 Usage

### What you’ll see

When a Webform submission form fails client-side validation, jQuery Validate
normally renders an error label like:

```html
<label id="edit-email-error" class="error" for="edit-email">Required</label>
```

This module replaces it with a `<span>` that is announced as an alert:

```html
<span id="edit-email-error" class="error" role="alert" aria-live="assertive" data-error-replaced="true">
  Required
</span>
```

It also updates the related input so that it references the error element via
`aria-describedby`.

---

## 🚨 Troubleshooting

- **Nothing changes on the form**
  - Confirm `webform` and `clientside_validation` are enabled.
  - Confirm client-side validation is enabled for the Webform and that errors are
    being rendered by jQuery Validate (look for `$.validator` in the browser console).
  - Rebuild caches (`drush cr`) after enabling the module.

- **Errors render, but no replacement happens**
  - Another script may be overriding `$.validator.setDefaults()` after this module
    runs.
  - Ensure you don’t have another custom module doing a similar override (for
    example, the earlier `extend_clientside_validation_webform` clone).

---

## 📂 File Structure

```
extend_accessibility_webform/
├── README.md
├── extend_accessibility_webform.info.yml
├── extend_accessibility_webform.libraries.yml
├── extend_accessibility_webform.module
└── js/
    └── custom-error-wrap.js
```

---

## 📜 License

This project is licensed under the **GNU General Public License, version 2 or (at your option) any later version**.

- SPDX identifier: `GPL-2.0-or-later`
- Created by: WebFer

---

\_Created and maintained by [WebFer](https://www.linkedin.com/in/webfer/)
