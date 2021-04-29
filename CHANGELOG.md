# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.1]
### Added
- Added support for passing a headers object when calling RPC endpoints
### Note
- Sorry about the huge version bump

## [1.0.0]
### Changed
- [Breaking] The RPC client now makes calls to an RPC server in the form of `endpoint/:methodName`, to allow for clearer debugging and tracing. Ensure you are using >= v. 1.0.0 of `buffer-rpc` on your server as well.
### Added
- Added this CHANGELOG.