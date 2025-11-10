"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("middleware",{

/***/ "(middleware)/./middleware.ts":
/*!***********************!*\
  !*** ./middleware.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   middleware: () => (/* binding */ middleware)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(middleware)/./node_modules/next/dist/esm/api/server.js\");\n\nfunction middleware(request) {\n    const { pathname } = request.nextUrl;\n    const isAuth = request.cookies.get('auth')?.value;\n    const esRutaProtegida = pathname.startsWith('/dashboard');\n    if (esRutaProtegida && isAuth !== 'true') {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.redirect(new URL('/login', request.url));\n    }\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.next();\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4vbWlkZGxld2FyZS50cyIsIm1hcHBpbmdzIjoiOzs7OztBQUEyQztBQUdwQyxTQUFTQyxXQUFXQyxPQUFvQjtJQUM3QyxNQUFNLEVBQUVDLFFBQVEsRUFBRSxHQUFHRCxRQUFRRSxPQUFPO0lBQ3BDLE1BQU1DLFNBQVNILFFBQVFJLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLFNBQVNDO0lBRTVDLE1BQU1DLGtCQUFrQk4sU0FBU08sVUFBVSxDQUFDO0lBRTVDLElBQUlELG1CQUFtQkosV0FBVyxRQUFRO1FBQ3hDLE9BQU9MLHFEQUFZQSxDQUFDVyxRQUFRLENBQUMsSUFBSUMsSUFBSSxVQUFVVixRQUFRVyxHQUFHO0lBQzVEO0lBRUEsT0FBT2IscURBQVlBLENBQUNjLElBQUk7QUFDMUIiLCJzb3VyY2VzIjpbIkU6XFxCdWVub3NQYXNvc1xcYnVlbm9zcGFzb3NcXHBhc29hcGFzb1xcY2FtaW5hdGFzLWxpbXBpb1xcbWlkZGxld2FyZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XHJcbmltcG9ydCB0eXBlIHsgTmV4dFJlcXVlc3QgfSBmcm9tICduZXh0L3NlcnZlcic7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWlkZGxld2FyZShyZXF1ZXN0OiBOZXh0UmVxdWVzdCkge1xyXG4gIGNvbnN0IHsgcGF0aG5hbWUgfSA9IHJlcXVlc3QubmV4dFVybDtcclxuICBjb25zdCBpc0F1dGggPSByZXF1ZXN0LmNvb2tpZXMuZ2V0KCdhdXRoJyk/LnZhbHVlO1xyXG5cclxuICBjb25zdCBlc1J1dGFQcm90ZWdpZGEgPSBwYXRobmFtZS5zdGFydHNXaXRoKCcvZGFzaGJvYXJkJyk7XHJcblxyXG4gIGlmIChlc1J1dGFQcm90ZWdpZGEgJiYgaXNBdXRoICE9PSAndHJ1ZScpIHtcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UucmVkaXJlY3QobmV3IFVSTCgnL2xvZ2luJywgcmVxdWVzdC51cmwpKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBOZXh0UmVzcG9uc2UubmV4dCgpO1xyXG59XHJcbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJtaWRkbGV3YXJlIiwicmVxdWVzdCIsInBhdGhuYW1lIiwibmV4dFVybCIsImlzQXV0aCIsImNvb2tpZXMiLCJnZXQiLCJ2YWx1ZSIsImVzUnV0YVByb3RlZ2lkYSIsInN0YXJ0c1dpdGgiLCJyZWRpcmVjdCIsIlVSTCIsInVybCIsIm5leHQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(middleware)/./middleware.ts\n");

/***/ })

});