# mfe-gen1-demo

פרויקט דמו של MFE **דור 1** (Webpack Module Federation, React 17 +
`@material-ui/core` v4), שקיים אך ורק כדי לשמש כריפו-יעד לבדיקה של
[`mfe-migration-v2`](../mfe-migration-v2) - הכלי שמיישם את המיגרציה ל-**דור
2** (React 18 + `@mui/material` v7). השם מכוון: "gen1" = מה שיש כרגע, "demo"
= פרויקט לבדיקה בלבד, לא אפליקציה אמיתית.

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

מתוך תיקיית `mfe-migration-v2` (אחרי `npm run setup` שם, ראו README של
אותו ריפו):

```powershell
mfe-migrate preflight --repo C:\Users\WIN10\mfe-gen1-demo
mfe-migrate branch --repo C:\Users\WIN10\mfe-gen1-demo --source main --target migration/mfe-v2 --auto-stash
mfe-migrate scan --repo C:\Users\WIN10\mfe-gen1-demo
```

או הכל ברצף:

```powershell
mfe-migrate init --repo C:\Users\WIN10\mfe-gen1-demo
```

בלי `npm run link-cli` (כלומר בלי `mfe-migrate` על ה-PATH), מריצים במקום זה
`node packages\cli\dist\index.js ...` מתוך תיקיית `mfe-migration-v2`.

`preflight` ו-`scan` כותבים בהתאמה `preflight-report.json` ו-
`inventory-report.json` לשורש הריפו הזה (`mfe-gen1-demo`), לא לריפו של
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

בסביבת `local` אין שרת API: הנתונים (מספר התביעות הפתוחות) הם נתוני דמה
שמוחזרים מתוך `src/services/claimsService.js`, בלי פנייה לרשת.
