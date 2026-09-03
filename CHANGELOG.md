# Changelog

## [1.0.0] - 2026-09-03

### Changed

- Breaking: renamed the public `open` state property to `isOpen` and renamed `show()`/`hide()` to `open()`/`close()`.

## [0.3.0] - 2026-09-02

### Changed

- Made custom-element module evaluation SSR-safe by extending `JBBaseComponent` where needed and registering elements through the shared `defineWebComponent()` helper; raised the minimum `jb-core` version to `0.36.0`.

## [0.2.1] 2026-08-14

### Changed

- Extended the SSR-safe `JBBaseComponent` for both tooltip elements and guarded custom-element registration so the package can be imported without browser globals.
- Preserved the React client boundary in the published React entry point and generated bundles.
- Aligned published dependency ranges with the `jb-core` and `@jbui/tooltip` versions that provide these APIs.

## [0.2.0] 2026-08-14

### Changed

- Updated component color defaults to use the shared semantic content and surface tokens.
