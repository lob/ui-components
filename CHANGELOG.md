# CHANGELOG

## 1.0.0-beta.33

Makes the max height of the `MegaButton` image larger.

## 1.0.0-beta.32

### Bug Fixes

Maintain the text color on hover for the secondary-button variant on `NewLink`

## 1.0.0-beta.31

### Features

Updates `FileUpload` button text color and the 'Copy' button styling in `TextInput`.

## 1.0.0-beta.30

### Features

Updates `NewButton` & `NewLink` styling.

## 1.0.0-beta.29

### Features

Updates `MegaButton` styling to make them slightly less mega.

## 1.0.0-beta.28

### Breaking changes

Updates the [StepperVertical component](./src/components/StepperVertical/StepperVertical.mdx)
The component now:

- uses the `activeStepIndex` prop to determine and highlight the current step.
- requires the `steps` to be an array of Objects each containing a `displayName` (and uses the displayName for rendering the step name)

## 1.0.0-beta.27

### Bug Fixes

Removes the `items-center` in `MegaButton`, so that when used in a group, the headers in each button are vertically aligned with one another.

## 1.0.0-beta.26

### Bug Fixes

Updates the `MegaButton` text color to match the updates to the Design System.

## 1.0.0-beta.25

### Features

Update all Icons with 2px stroke, for better accessibility.

## 1.0.0-beta.24

### Bug Fixes

Fixes a bug where the dropdown hover action is selecting and setting an option

## 1.0.0-beta.23

### Bug Fixes

Renames the export of the new ToolTip icon to `ToolTipIcon`.

## 1.0.0-beta.22

### Bug Fixes

Removes external right margin of [MegaButton component](./src/components/MegaButton/MegaButton.mdx).

## 1.0.0-beta.21

### Bug Fixes

Fixes the warning background color of NewButton and NewLink components.

## 1.0.0-beta.20

### Bug Fixes

Fixes error background color of [TextInput component](./src/components/TextInput/TextInput.mdx).

## 1.0.0-beta.19

### Features

Added [Calendar component](./src/components/Calendar/Calendar.mdx):

## 1.0.0-beta.19

### Features

Added [Calendar component](./src/components/Calendar/Calendar.mdx):

## 1.0.0-beta.18

### Bug Fixes

Adds 2 Icons missed in the refresh: SkipToLeft, SkipToRight.

## 1.0.0-beta.17

### Features

Icons refresh: Add new designs for existing and used Icons, remove unused Icons.
New Icons added: InfoFilled, Text, & ToolTipIcon.

## 1.0.0-beta.16

### Features

Update the Tailwind plugin to introduce the new `error` color #D75A5A.
The previous `error` color is still available as `coral-900` (#943832).

## 1.0.0-beta.15

### Features

Style refresh to [Radio Button component](./src/components/RadioButton/RadioButton.mdx):
Added [Radio Button Large component](./src/components/RadioButtonLarge/RadioButtonLarge.mdx):

## 1.0.0-beta.14

### Features

Style additions to the [Textarea component](./src/components/Textarea/Textarea.mdx):

- Width takes up the entire width of the container (no longer need to pass in `input-class: "w-full"`)
- Height set via Tailwind class
- Changes made to match text input: larger corner rounding, focus & "has something in it" states

## 1.0.0-beta.13

### Features

Style additions to the [Dropdown component](./src/components/Dropdown/Dropdown.mdx):

- Background color added to the error (red) state
- Success prop added to add green border for success state

## 1.0.0-beta.12

### Bug Fixes

- Fixes styling of readonly state and background color (white - was previously transparent) of [TextInput component](./src/components/TextInput/TextInput.mdx).

### Features

- Clear button is now an optional prop on [TextInput component](./src/components/TextInput/TextInput.mdx).

## 1.0.0-beta.11

### Bug Fixes

- Fixed clear button on text input causing form submission. Also updated typography on small dropdown variant (font weight and font size).

## 1.0.0-beta.10

### Bug Fixes

- Changed the height of small dropdown components to 32px

### Features

- Restyle of [TextInput component](./src/components/TextInput/TextInput.mdx)

## 1.0.0-beta.9

### Features

- Restyle of [TextInput component](./src/components/TextInput/TextInput.mdx)

## 1.0.0-beta.8

### Features

- Restyle of [ProgressBar component](./src/components/ProgressBar/ProgressBar.mdx)

## 1.0.0-beta.7

### Features

- Renamed Error Icon to AlertCircle which is how it is named in the design system docs
- To reduce duplication, updated the Warning icon to be a triangle instead of the 'i' already being used by the Info icon
- Updated the conditions in Alert component, to show the icon AlertCircle for the error and warning variants

## 1.0.0-beta.6

### Features

- Update FileUpload component to the new button style.

### Breaking changes

- The `size` prop on FileUpload is now a Boolean prop `small`

## 1.0.0-beta.5

### Accessibility improvement

- Change the @hover text color to be primary-900 on NewLink & NewButton styled as a link so that the color difference is more obvious (from the default primary-500 text color)

## 1.0.0-beta.4

### Bug Fixes

- Styling adjustments to the NewLink and MainNavigationChildItem components to allow the MainNavigation to display focus rings correctly

## 1.0.0-beta.3

### Features

- Updated the RadioGroup component to work with both RadioButton and MegaButton components as children

### Bug Fixes

- Added the MegaButton to the exported components (prior to this version the MegaButton would not have been accessible)

## 1.0.0-beta.2

### Bug Fixes

- Styling adjustments to the MainNavigation component concerning the focus ring

## 1.0.0-beta.1

### Features

- Restyle of [Dropdown component](./src/components/Dropdown/Dropdown.mdx)

### Breaking changes

- list-height prop previously expected a value from the available list of [https://tailwindcss.com/docs/height](Tailwind CSS heights).
  Now the value expected should be an actual number value with units (i.e. '20rem', '256px').
- any `class` prop that was previous defined on a `Dropdown` component needs to be moved to an enclosing `<div></div>` as the `Dropdown` no
  longer has a built-in wrapper with which to pass the `class` prop down to. You need to provide your own wrapper now.

## 0.0.197

### Bug Fixes

- Changed NewLink wrapper to be inline-block so it sits better in text
- Subnavigation after NewLink changes broke styling

## 0.0.196

### Bug Fixes

- Set inheritAttrs to false at component level this will stop the role="link" and data-testIds etc from duplicating in tests

## 0.0.195

### Features

- Added new [NewLink component](./src/components/NewLink/NewLink.mdx) (with the new button styles primary & secondary)
- Added images support to the Megabutton component
  - New prop `imageSource` added allowing for the display of an image in a Megabutton

### Noteworthy Changes

- NewLink is being added to provide a backwards compatible migration path to updating the LobLink.
  LobLink instances can be updated to use NewLink at this time. At some point in the near future we will be renaming NewLink to LobLink.
  If your application uses LobLink you can choose to migrate to NewLink now and change its name later, or wait until NewLink is renamed to LobLink
  which may require some props changes at that time.
- NewLink `variant` prop values are now [`link`, `primary-button`, `secondary-button`]
- The `size` prop on LobLink is now a Boolean prop `small` on NewLink

## 0.0.194

### Bug Fixes

- Styling adjustments to Alert (font and padding changes)

## 0.0.193

### Bug Fixes

- Revert changes made in version 0.0.192

## 0.0.192

### Features

- Transfer Primary and Secondary Button styles onto Link
- Added new [Megabutton component](./src/components/MegaButton/MegaButton.mdx)
- Added small text support to the Megabutton:
  - New prop `text` added allowing for the display of smaller text under the label in a Megabutton

## 0.0.191

### Bug Fixes

- Gave Icons `currentColor` instead of fixed color
- Added text size 14 to the Alert

## 0.0.190

### Bug Fixes

- Temp fix in Link so that we can merge Alerts in dashboard-vue
- Fix Icons that are used in Alert
- Added !important for the MainNavigation text color

## 0.0.189

### Bug Fixes

- Small styling adjustments to Alert to keep text and link together and Icon not to shrink

## 0.0.188

### Features

- Restyle of [Alert component](./src/components/Alert/Alert.mdx)
- Updated Icons (Checkmark, Error, Info, Warning) used by restyled Alert component
- Added new props to Link component (to support the use of Links inside Alerts):
  - New prop `bold`, when `true` will display the Link with a bold font weight
  - New prop `inheritTextColor`, when `true` will display the Link in the color as defined by its parent

### Breaking/Noteworthy Changes

- Using a Link inside of an Alert component requires a specific approach to style the Link with the correct color.
  See the section `Example of using this component with a link` in the [Alert documentation](./src/components/Alert/Alert.mdx) for details.
- Previously when using an Icon inside an Alert, the Icon had to be provided within a `<slot>`, now the Icon is built into the Alert and is defined
  by the `variant` prop value.

## 0.0.187

### Features

- Added new prop to NewButton:
  - new prop `small`, when `true` will display a smaller version of the button

### Bug Fixes

- Styling adjustments to NewButton component
- Styling adjustments to the VerticalStepper component

## 0.0.186

### Features

- Added new [NewButton component](./src/components/NewButton/NewButton.mdx)
- Added new [StepperVertical component](./src/components/StepperVertical/StepperVertical.mdx)

### Noteworthy Changes

- NewButton is being added to provide a backwards compatible migration path to updating the LobButton.
  LobButton instances can be updated to use NewButton at this time. At some point in the near future we will be renaming NewButton to LobButton.
  If your application uses LobButton you can choose to migrate to NewButton now and change its name later, or wait until NewButton is renamed to LobButton
  which may require some props changes at that time.
- NewButton `variant` prop values are now [`primary`, `secondary`, `link`, `none`] (if something was `tertiary` it should now be `secondary`)
- The `size` prop on LobButton is now a Boolean prop `small` on NewButton
