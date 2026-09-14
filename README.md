# TzrufotKlia_Client (פרויקט דמו)

אפליקציית MFE לדוגמה (Webpack Module Federation), המדמה שירות React 17 +
`@material-ui/core` v4 שנמצא באמצע מיגרציה ל-React 18 + `@mui/material` v7 -
בדיוק סוג הריפו ש-[`mfe-migration-v2`](../mfe-migration-v2) נועד להריץ עליו.

זהו **פרויקט פיקסצ'ר**, לא אפליקציה בפרודקשן. הוא נבנה במכוון עם תמהיל של
דפוסים legacy כדי לתרגל את כל סוגי הממצאים שה-S2 scan מזהה:

| דפוס בקוד | קובץ | ממצא (`FindingType`) |
|---|---|---|
| `import ... from '@material-ui/core/...'` | כמעט כל הרכיבים | `material-ui-import` |
| `makeStyles({...})` (אובייקט שטוח) | `Header.jsx` | `makeStyles-A` |
| `makeStyles((theme) => ({...}))` | `Sidebar.jsx` | `makeStyles-B` |
| `makeStyles((theme) => ({ x: (props) => ({...}) }))` | `ClaimDetailsPage.jsx` | `makeStyles-C` |
| `withStyles(styles)(...)` | `DocumentUpload.jsx` | `withStyles` |
| `createMuiTheme({...})` | `theme.js` | `createMuiTheme` |
| `<Grid item>` | `Header`, `Sidebar`, `ClaimDetailsPage`, `HomePage` | `grid-item` |
| `<Hidden ...>` | `Header.jsx`, `Sidebar.jsx` | `hidden-component` |
| `ref="..."` (string ref) | `DocumentUpload.jsx` | `string-ref` |
| `ReactDOM.findDOMNode(...)` | `DocumentUpload.jsx` | `find-dom-node` |
| `ReactDOM.render(...)` | `bootstrap.js`, `LegacyModal.jsx` | `reactdom-render` |
| `ReactDOM.unmountComponentAtNode(...)` | `LegacyModal.jsx` | `reactdom-unmount` |
| `<Switch>` / `<Route exact>` / `render=` / `component=` / `<Redirect>` / `useHistory()` | `routes/AppRoutes.jsx` | `switch`, `route-exact`, `route-render-prop`, `route-component-prop`, `redirect`, `use-history` |
| `useEffect(async () => {...})` | `pages/HomePage.jsx` | `async-effect` |
| `renderInput={...}` (על `DatePicker` מ-`@mui/x-date-pickers`) | `DatePickerField.jsx` | `render-input` |
| `import { shallow } from 'enzyme'` בקובץ `*.test.jsx` | `__tests__/Header.test.jsx` | `legacy-test-renderer` |
| `new ModuleFederationPlugin({ exposes, shared })` | `webpack.config.js` | `module-federation` |
| קובץ בשם `bootstrap.js` | `src/bootstrap.js` | `bootstrap-file` |

שימו לב שה-`react-router-dom` ב-`package.json` כבר על v6 (`^6.0.2`), אבל
`routes/AppRoutes.jsx` עדיין כתוב בסגנון v5 (`Switch`/`exact`/`useHistory`) -
זהו חוב טכני מכוון שמדמה מצב אמיתי של מיגרציה חלקית, וזה בדיוק מה שה-scan
אמור לתפוס. באותו אופן, `DatePickerField.jsx` כבר עובד עם
`@mui/x-date-pickers` (v5-alpha) בעוד ששאר הרכיבים עדיין על
`@material-ui/core` v4.

## הרצת ה-CLI של המיגרציה מול הפרויקט הזה

מתוך תיקיית `mfe-migration-v2` (אחרי `npm install && npm run build` שם):

```powershell
node packages\cli\dist\index.js preflight --repo C:\Users\WIN10\TzrufotKlia_Client
node packages\cli\dist\index.js branch --repo C:\Users\WIN10\TzrufotKlia_Client --source main --target migration/mfe-v2 --auto-stash
node packages\cli\dist\index.js scan --repo C:\Users\WIN10\TzrufotKlia_Client
```

או הכל ברצף:

```powershell
node packages\cli\dist\index.js init --repo C:\Users\WIN10\TzrufotKlia_Client
```

`preflight` ו-`scan` כותבים בהתאמה `preflight-report.json` ו-
`inventory-report.json` לשורש הריפו הזה (`TzrufotKlia_Client`), לא לריפו של
הכלי.

> `branch` דורש `origin` מוגדר עם ה-branch המקור (כדי ש-`git fetch`/
> `git pull --ff-only` יצליחו). אם שיבטתם את הריפו הזה מחדש בלי `origin`,
> תצטרכו להגדיר remote (אפילו לריפו bare מקומי) לפני הרצת `branch`/`init`.

## הרצת האפליקציה עצמה

```powershell
npm install
npm run start
```

(מריץ `webpack serve` על סביבת `sviva=local`, פורט 3001).
