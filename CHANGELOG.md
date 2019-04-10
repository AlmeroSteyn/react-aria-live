## 2.0.5 (Apr 10, 2019)

Add nowrap style to hidden regions to hotfix issue [https://github.com/nvaccess/nvda/issues/5448](https://github.com/nvaccess/nvda/issues/5448)

## 2.0.4 (Mar 18, 2019)

Log a warning if the context is missing ([Jeremy Einfeld](https://github.com/JeremyEinfeld))

## 2.0.3 (Feb 27, 2019)

Move live region container to bottom of the announcer to reduce accidental navigation risk.

## 2.0.2 (May 31, 2018)

* Enable easier rebroadcast of messages when required.

## 2.0.1 (May 31, 2018)

* Fixed peer dependencies.

## 2.0.0 (May 30, 2018)

* Rewrite of package using the new React Context API.
* Removal of the old context API.
* Introduction of new LiveMessenger component to allow direct access to raw functions.

## 1.0.6 (May 30, 2018)

* Remove incorrect and redundant ARIA from live regions.

## 1.0.5 (February 5, 2018)

* Add `clearOnUnmount` prop to toggle clearing live region on unmount of `LiveMessage`.

## 1.0.4 (September 11, 2017)

* Peer dependencies now allows for React 16.0.0-rc

## 1.0.3 (July 26, 2017)

* CHORE: Clearing the message in LiveMessage now removes the previous message sent to allow for rebroadcast of the same message.

## 1.0.2 (July 21, 2017)

* Refactored internal component layout.
* Added unit tests
* Updated documentation

## 1.0.1 (July 14, 2017)

* Added documentation and PropTypes

## 1.0.0

* Initial creation
