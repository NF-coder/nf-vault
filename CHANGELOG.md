## 0.1.0-a0 (2026-07-09)

### Feat

- add rename and delete actions in tree
- add tree structure by adding parent_id column to db
- implement plain documents relations structure
- **request.ts**: add fallback for empty-body responces
- add document creation & document save-on-update
- **request.ts**: specify RequestError class for errors inside request func
- **request.ts**: explicitly specify the same-origin parameter
- **api**: add api versioning via `ApiVersionConfig` bean
- **api**: add api versioning constant
- **DocumentController**: add getByDocumentId stub
- **editor**: get title and content on current document load
- **buildDevServer**: add redirection of api requests in dev mode
- added backend and many improvements in frontend. i know that its bad)
- added basic files tree
- basic editor implementation

### Fix

- **devToolsPlugin**: destroy plugin on editor destroy
- autosave now skips document restore
- **useAutoSaveDocument**: send content update request only on markdown change
- **DocumentController**: user must be authed to use most of documents endpoints
- **auth**: JwtAuthFilter clears SecurityContext on fail & simplification of SecurityConfig
- **SecurityConfig**: specify filter order
- **Makefile**: add --build option to backend-dev build
- **SecurityConfig**: add dedicated filter chain for auth requests with versioning
- **editor**: setEditorContent now using transactions
- **build**: fix `make backend-dev` by adding separate image
- add db health check in dev build mode
- **DocumentService**: handle createDocument properly
- **UserService**: use UnauthorizedException instead of NotFoundException if user not found
- **topbar**: fix logout mechanism
- **auth**: return proper authentication/authorization status codes
- add EnableMethodSecurity annotation to enable SpEL
- **nginx**: add google fonts to CSP header
- **deploy**: use configs instead of volumes for init.sql

### Refactor

- make tree design better
- **logout.ts**: omit double-logout errors
- **request**: updated requests and error handling pipelines
- **edit-document**: make document sent as markdown
- **error**: improve errors behavior
