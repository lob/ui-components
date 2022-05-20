# CHANGELOG

## 1.0.0-beta.1
### Features
* Restyle of Dropdown component

### Breaking changes:
* list-height prop previously expected a value from the available list of [https://tailwindcss.com/docs/height](Tailwind CSS heights).
Now the value expected should be an actual number value with units (i.e. '20rem', '256px').
* any `class` prop that was previous defined on a `Dropdown` component needs to be moved to an enclosing `<div></div>` as the `Dropdown` no
longer has a built-in wrapper with which to pass the `class` prop down to.  You need to provide your own wrapper now.

## 0.0.197
### Bug Fixes
* Changed NewLink wrapper to be inline-block so it sits better in text
* Subnavigation after NewLink changes broke styling

## 0.0.196
### Bug Fixes
* Set inheritAttrs to false at component level this will stop the role="link" and data-testIds etc from duplicating in tests

## 0.0.195
### Features
* Added new [NewLink component](./src/components/NewLink/NewLink.mdx) (with the new button styles primary & secondary)
* Added images support to the Megabutton component
  * New prop `imageSource` added allowing for the display of an image in a Megabutton

## 0.0.194
### Bug Fixes
* Styling adjustments to Alert (font and padding changes)

## 0.0.193
### Bug Fixes
* Revert changes made in version 0.0.192

## 0.0.192
### Features
* Transfer Primary and Secondary Button styles onto Link
* Added new [Megabutton component](./src/components/MegaButton/MegaButton.mdx)
* Added small text support to the Megabutton:
  * New prop `text` added allowing for the display of smaller text under the label in a Megabutton

