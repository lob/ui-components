# CHANGELOG

## v2.0.36

- Fix `<TextInput />` ref

## v2.0.35

- Fix helper text styles on `<TextInput />`

## v2.0.34

- Type `<TextInput />` component
- Fix clickbox on the `<TextInput />`

## v2.0.33

- Add `<Steps />` component
- Adds the icons:
  - `Back`
  - `CampaignAutomated`
  - `CampaignOneTime`
  - `Next`
  - `Success`

## v2.0.32

- Add `<IconButton />` component

## v2.0.31

- Adds the icons:
  - `PlanBusiness`
  - `PlanDeveloper`
  - `PlanEnterprise`
  - `PlanGrowth`
  - `PlanGrowthPlus`
  - `PlanStartup`

### Breaking Changes

- Removes the icons:
  - `Rocket`
  - `Shop`
  - `UserChatBubble`

## v2.0.30

## v2.0.29

- Make `PrimeVue` an external dependency

## v2.0.28

- Upgrades `Vue` to latest `v3.4` release.

## v2.0.26

- Adds guardrails for the `RadioButtonLarge` components input events.

## v2.0.25

- Refactor the `Badge` component's interface and implementation
- Update styles of the `Alert` component

### Breaking Changes

- The `Badge` interface has changed and does not contain as many variants in favor of utilizing `variant` and `color`
- Removes some `Badge` variants
- The `Badge` component is no longer available globally, it must be imported directly

## v2.0.24

- Adds an alternative to props for the Modal component through the use of slots

## v2.0.23

- Adds `BankAccount` to Icons and the `Icon` component

## v2.0.22

- Change the border color for `secondary-button` links

## v2.0.21

- Change the border color for `secondary` buttons

## v2.0.20

- Begin adding type definitions
- Made the components `<Icon />` and `<Modal />` directly importable

### Breaking Changes

- `<Icon />` and `<Modal />` are no longer available as global components and must be imported directly

## v2.0.19

- `FloatingActionButton` will now center on parent component rather than viewport

## v2.0.18

- export `FloatingActionButton` component

## v2.0.17

- Add `FloatingActionButton` component

## v2.0.16

- Adds `CircleInfo` to the `Icon` component

## v2.0.15

- Adds `IconColor` options to the `Modal` component of
  - `error`
  - `info`
  - `neutral`
  - `success`
  - `upgrade`
  - `warning`

## v2.0.14

- Fix `v-model` on `NumberInput`

## v2.0.13

- Fix `maxFractionDigits` prop on `Number Input`

## v2.0.12

- Removes the `CurrencyInput` component
- Add the `NumberInput` component

## v2.0.11

- Update linting to understand Vue globals
- Style the close button in `Modal`s
- Add new icons for the `Icon` component
  - `CircleCheck`
  - `CircleClose`
  - `CircleExclamation`
  - `Close`

## v2.0.10

- Downgrade Vue to 3.2.32

## v2.0.9

- Implement new `Modal` component

### Breaking Changes

- The `Modal` component has been moved to `LegacyModal` due to the new `Modal` utilizing `v-model`

## v2.0.8

- Fix `LobTable`s with nested slots

## v2.0.7

- Fix `Icon` component registration

## v2.0.6

- Upgrade Vue
- Upgrade Typescript
- Install PrimeVue
- Add `Icon` component

## v2.0.5

- Upgrade Storybook

## v2.0.4

- Fix text color for `Link` `upgrade-button` variant.

## v2.0.3

- Adds link variant `upgrade-button`.

## v2.0.2

- Adds button variant `Upgrade`.
- Adds a `Lightning` icon.

## v2.0.1

- Adds a `CircleEmpty` icon.

## v2.0.0

- Removing beta tag since this is no longer in beta
- Adds a `showDollarSign` prop to the `CurrencyInput` component so we can hide it at will

## v2.0.0-beta.64

- Fixes import of `UserCircle` icon

## v2.0.0-beta.63

- Adds icons:
  - `Exit`
  - `FileAlt`
  - `Gift`
  - `LayerGroup`
  - `OpenBook`
  - `UserCircle`
- Updates icons:
  - `Signal`
  - `User`

## v2.0.0-beta.62

- Adds a `refresh` variant to `Alert`

## v2.0.0-beta.61

- Updates the `MegaButton` component to accept custom widths

## v2.0.0-beta.59

- More icon styling tweaks

## v2.0.0-beta.58

- Icon sizing style updates

## v2.0.0-beta.57

- Add `AppWindows` Icon
- Add `CloudData` Icon
- Add `CreditCard` Icon
- Add `LocationPin` Icon
- Add `NavArrowLeft` Icon
- Add `PieChartSlice` Icon
- Add `Users` Icon
- Update `Chevron` and `Chevrons` Icons

## v2.0.0-beta.56

Some style updates for `Modal` and `Badge`:

- Modal: allow removing the section separators/dividers
- Modal: allow a subheading
- Badge: create a new variant for a new gradient

## v2.0.0-beta.55

Adds the external link icon

## v2.0.0-beta.54

Style changes for `Input` and `Label`

## v2.0.0-beta.53

`SubnavigationItem` bug fix

## v2.0.0-beta.52

Add an option to pass stringToMatch prop to `SubnavigationItem`, this can be used to pass a string that is turned into a regex pattern

## v2.0.0-beta.51

Updates the prop definitions for `TopNavDropdown` so that `title` is no longer a required prop.

## v2.0.0-beta.50

Adds the `User` and `Bell` icons to the icons library, with a props interface matching the other icons

## v2.0.0-beta.49

Adds the `icon` variant to the nav dropdown.

## v2.0.0-beta.48

Adds the `PuzzlePiece` icon to the icons library, with a props interface matching the other icons.

## v2.0.0-beta.47

### Bugfixes

Update `this` binding of currency formatter and input to function as expected in a NodeJS v14 environment.

## v2.0.0-beta.46

### Bugfixes

Explicitly bind `this` context of currency formatter to its parent object.

## v2.0.0-beta.45

### Features

Adds the `CurrencyInput` component.

## v2.0.0-beta.44

### Features

Adds the `Tree`, `Car` and `Fire` icon to the icons library, with a props interface matching the other icons.

## v2.0.0-beta.43

### Features

Adds a `Coin` icon to the icons library, with a props interface matching the other icons.

## v2.0.0-beta.42

### Bug fixes

Make `Megabutton` image rounded at top to prevent border overlap

## v2.0.0-beta.41

### Bug fixes

Make `RadioGroup` full width

## v2.0.0-beta.40

### Bug fixes

Fix click event not emitting on `RadioButtonLarge`

## v2.0.0-beta.39

### Bug fixes

Add conditional rendering to confirm modal in `Dropzone` and `Dropdown`

## v2.0.0-beta.38

### Bug fixes

Fix component initialization order

## v2.0.0-beta.37

### Bug fixes

Fixes incorrect prop names in `Dropdown`

## v2.0.0-beta.36

### Features

Adds an optional confirm change modal to `Dropdown`

## v2.0.0-beta.35

### Features

Adds an optional confirm deletion modal to `Dropzone`

## v2.0.0-beta.34

### Features

Adds `uploading` as a valid value the prop `status` can have for the `Dropzone` component.

## v2.0.0-beta.33

### Features

Reduce focus dashed outline widths to 1px

## v2.0.0-beta.32

### Features

`Subnavigation` design updates

## v2.0.0-beta.31

### Features

`Dropdown` design updates

### Breaking Changes

`size` prop and small variant removed from `Dropdown`

## v2.0.0-beta.30

### Features

`TextInput` and `Textarea` design updates
`Textarea` new (optional) features: character counter and max characters

### Breaking Changes

`size` prop and small variant removed from `TextInput`

## v2.0.0-beta.29

### Features

`Checkbox` and `MegaButton` design updates

## v2.0.0-beta.28

### Features

`RadioButton` and `RadioButtonLarge` design updates

## v2.0.0-beta.27

### Features

changes the `LoadingIndicator` background color to transparent

## v2.0.0-beta.26

### Bug fixes

Restores the Badge background color

## v2.0.0-beta.25

### Features

Updates the `Alert` component design and adds new optional features: headline, close button, and link

### Breaking changes

- the `linkColor` functionality in the Alert content is deprecated

## v2.0.0-beta.24

### Bug Fixes

Remove min width class from `Table`

## v2.0.0-beta.23

### Bug Fixes

Fix broken dynamic class in `Table`

## v2.0.0-beta.22

### Bug Fixes

Prevents `Table` component from having x-overflow

## v2.0.0-beta.21

### Features

Adds the `TopNavDropdown` component that replaces the `MegaMenu` component

### Breaking changes

- the `MegaMenu` component is removed from the library

## v2.0.0-beta.20

### Features

Updates the styles of the `Badge` component

### Breaking changes

- removes the `shape` prop and `square` shape, the Badge will be rounded by default
- removes `flint` and `turquoise` colors (adds `default` and `secondary` variants)

## v2.0.0-beta.19

### Features

Updates the styles of the `Switch` component

## v2.0.0-beta.18

### Features

Updates the styles of `Button` and `Link` components to only show the outline for keyboard navigation

## v2.0.0-beta.17

### Features

Updates the styles of `Button` and `Link` components

### Breaking changes

- `Button` and `Link` now have 4 sizes defined by the `size` prop (the `small` prop is removed)
- `Button` variant 'subtle' is removed and replaced by 'quiet' and 'ghost' variants

## v2.0.0-beta.16

### Features

Remove Icon titles, add aria-label for accessibility where `MainNavigationIcon` uses Icons

## v2.0.0-beta.15

### Features

Update the styles of the `MainNavigation` component

### Breaking changes

- The icon is passed to a `MainNavigationItem` through the `#icon` slot, using the Icon components (or any svg)
- The icon Tooltip is part of the `MainNavigationItem` component

## v2.0.0-beta.14

### Bug fixes

Refactor the `Label` component to place the Tooltip outside the label

## v2.0.0-beta.13

### Features

Add `iconClass` prop to `MegaMenuItem` & `MainNavigationItem` to adjust the icons size

## v2.0.0-beta.12

### Features

Icons design refresh

## v2.0.0-beta.11

### Features

Updates the styles of the `LoadingIndicator` spinner

## v2.0.0-beta.10

### Features

Updates the styles of the `Label` component

## v2.0.0-beta.9

No changes

## v2.0.0-beta.8

### Features

Remove background color from `SearchBar` when focused

## v2.0.0-beta.7

### Features

Do not show clear button in `SearchBar` unless there is a search term

## v2.0.0-beta.6

### Features

Updates the Color Palette with the new Gray color.
Updates the Main Navigation text color to gray-800.

## v2.0.0-beta.5

### Features

Updates the styles of disabled Button and button-style Link

## v2.0.0-beta.4

### Bug Fixes

Adds darker gray border color to components: TextInput, TextArea, Dropdown, RadioButtonLarge & secondary Button

## v2.0.0-beta.3

### Features

Adds the new Colors Palette

## v2.0.0-beta.2

### Features

Adds the new Typography classes

## v2.0.0-beta.1

### Features

Adds new `invalid` event listener to the TextInput component

## v2.0.0-beta.0

### Breaking changes

Adds new font 'Messina', used as font-family class `font-messina`
Removes old font 'Larsseit'

## 1.0.0-beta.65

### Features

Remove strikethrough line from disabled `MegaButton`
Add reduced image opacity to disabled `MegaButton`

## 1.0.0-beta.64

### Features

Adds `error` and `errorMessage` props to `DateInput`
Adds `disableWeekends` and `disableHolidays` props to `DateInput` and `DatePicker`

## 1.0.0-beta.63

### Features

Adds `full-height` prop to `RadioButtonLarge`

## 1.0.0-beta.62

### Features

Adds `full-width` prop to `RadioButtonLarge`

## 1.0.0-beta.61

### Features

Adds `gradient` variant to `Badge`

## 1.0.0-beta.60

### Features

Adds `ariaDisabled` prop to `MegaButton`

## 1.0.0-beta.59

### Bug fixes

Fixes `MegaButton` not showing as selected when using prop `topFullImage`

## 1.0.0-beta.58

### Features

Adds a `topFullImage` prop to `MegaButton`

### Breaking changes

Removes `twoToned` and `lowerImage` props

## 1.0.0-beta.57

### Bug fixes

Adds a `relative` class wrapper to the MegaButton to avoid unwanted behavior because of absolute positioning

## 1.0.0-beta.56

### Features

Additional changes to noPadding prop for `Modal`

## 1.0.0-beta.55

### Features

Added noPadding prop to `Modal`
Made header prop optional in `Modal`

## 1.0.0-beta.54

### Features

Added lowerImage prop to `MegaButton`

## 1.0.0-beta.53

### Features

Added twoTone prop to `MegaButton`

## 1.0.0-beta.52

### Features

- Update the background color of the `ToolTip` from `primary-700` to `gray-900` to match the new design system.

## 1.0.0-beta.51

### Bug fixes

Fix the size of the `Radiobutton` dot for the case of the radio button being checked and disabled

## 1.0.0-beta.50

### Features

- Add new 'subtle' variant style to LobButton & LobLink

## 1.0.0-beta.49

### Features

- add `fileFor` prop to the `Dropzone` component to update the 'fileSizeError' text

## 1.0.0-beta.48

### Features

- New `Dropzone` component

## 1.0.0-beta.47

### Features

Add `open:list`, `close:list`, `hover:option` emits to the `Dropdown` component

## 1.0.0-beta.46

### Features

Updated ARIA labels for the Modal.
Add `header` String prop, remove header slot.
Add `closeButtonAriaLabel` prop as the aria-label for the Close (X) button.
Add ESC key listener for closing the Modal.

### Breaking Changes

The `closeButtonAriaLabel` and `header` props in the `Modal` are required.

## 1.0.0-beta.45

### Features

Added responsiveness to text and margins of `MegaButton`

## 1.0.0-beta.44

### Breaking changes

Removes `Typography` component. Instead of Typography wrapper components, we now use Tailwind [Component Classes](./src/theme/componentClasses/componentClasses.mdx)

Renames components:

- `NewButton` -> `Button`, exported as `LobButton`
- `NewLink` -> `Link`, exported as `LobLink`

Removes old Button & Link components

## 1.0.0-beta.43

### Features

Updated tailwind-plugin-lob version to 0.0.42

## 1.0.0-beta.42

### Features

Adds `text-error` (red) color to the asterisk for all reaquired input fields

## 1.0.0-beta.41

### Features

Restores error state for `RadioButton` and `RadioButtonLarge`

## 1.0.0-beta.40

### Bug fixes

Changes the `MainNavigationChildItem` component's logic for its active state to the following: when its `to` prop starts with the current route, instead of when it includes it. This way, a component with `to = /logs` won't be active when the current route is something like `/settings/logs`.

## 1.0.0-beta.39

### Features

Made the close (X) icon of the `Modal` larger, added background color on hover

## 1.0.0-beta.38

### Features

Changed the color of `Accordion` component for better contrast/accessibility

## 1.0.0-beta.37

### Bug fixes

Corrected margins on `RadioButton`

## 1.0.0-beta.36

### Features

Updates the styling of the `TextInput` & `TextArea` components
Removes the `disabled` prop from the `Label` component

## 1.0.0-beta.35

### Bug fixes

Maintain the gradient background on primary-button variant of `NewLink` when active

## 1.0.0-beta.34

### Features

Updates `RadioButton` and `RadioButtonLarge` hover and selected states.
Update to `Dropdown` to make chevron icon darker, remove focus ring, and hover box-shadow.

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
