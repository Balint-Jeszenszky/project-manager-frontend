# Project Manager Frontend

## Információk a projectről:

A projekt BME VIK AUT témalaboratóriumra készült teendőket kezelő háromrétegű architektúrára épülő alkalmazás backendje. A frontend itt érhető el: https://github.com/Balint-Jeszenszky/project-manager-backend

### Szükséges szoftverek:
- Node.js (12.18.4-es verzióval készült)
- npm, node-al települ (6.14.8-es verzióval készült)

### Felhasznált technológiák:
- React

## Beüzemelés:
- nyissunk egy terminált és navigáljunk a projekt mappájába
- telepítsük a szükséges node modulokat `npm i` paranccsal
- nyissuk meg tetszőleges szerkesztőben a src/common/FetchData.tsx fájlt
- adjuk meg a backend szerverünk címét a `server` változónak
- a korábban megnyitott terminálon adjuk ki a `npm run build` parancsot
- a build mappában megtaláljuk a lefordított projektet
- __Ha az elérési út nem a gyökér:__
    - a package.json fájlban állítsuk be az elérési utat a "start_url" és  "homepage" kulcsokkal
    - további információ: https://create-react-app.dev/docs/deployment/