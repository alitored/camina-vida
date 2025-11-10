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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   middleware: () => (/* binding */ middleware)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(middleware)/./node_modules/next/dist/esm/api/server.js\");\n\nfunction middleware(request) {\n    const { pathname } = request.nextUrl;\n    const isAuth = request.cookies.get('auth')?.value;\n    // Rutas que requieren autenticación\n    const rutasProtegidas = [\n        '/dashboard'\n    ];\n    const requiereProtección = rutasProtegidas.some((ruta)=>pathname.startsWith(ruta));\n    if (requiereProtección && isAuth !== 'true') {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.redirect(new URL('/login', request.url));\n    }\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.next();\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4vbWlkZGxld2FyZS50cyIsIm1hcHBpbmdzIjoiOzs7OztBQUEyQztBQUdwQyxTQUFTQyxXQUFXQyxPQUFvQjtJQUM3QyxNQUFNLEVBQUVDLFFBQVEsRUFBRSxHQUFHRCxRQUFRRSxPQUFPO0lBQ3BDLE1BQU1DLFNBQVNILFFBQVFJLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLFNBQVNDO0lBRTVDLG9DQUFvQztJQUNwQyxNQUFNQyxrQkFBa0I7UUFBQztLQUFhO0lBRXRDLE1BQU1DLHFCQUFxQkQsZ0JBQWdCRSxJQUFJLENBQUMsQ0FBQ0MsT0FDL0NULFNBQVNVLFVBQVUsQ0FBQ0Q7SUFHdEIsSUFBSUYsc0JBQXNCTCxXQUFXLFFBQVE7UUFDM0MsT0FBT0wscURBQVlBLENBQUNjLFFBQVEsQ0FBQyxJQUFJQyxJQUFJLFVBQVViLFFBQVFjLEdBQUc7SUFDNUQ7SUFFQSxPQUFPaEIscURBQVlBLENBQUNpQixJQUFJO0FBQzFCIiwic291cmNlcyI6WyJFOlxcQnVlbm9zUGFzb3NcXGJ1ZW5vc3Bhc29zXFxwYXNvYXBhc29cXGNhbWluYXRhcy1saW1waW9cXG1pZGRsZXdhcmUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xyXG5pbXBvcnQgdHlwZSB7IE5leHRSZXF1ZXN0IH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1pZGRsZXdhcmUocmVxdWVzdDogTmV4dFJlcXVlc3QpIHtcclxuICBjb25zdCB7IHBhdGhuYW1lIH0gPSByZXF1ZXN0Lm5leHRVcmw7XHJcbiAgY29uc3QgaXNBdXRoID0gcmVxdWVzdC5jb29raWVzLmdldCgnYXV0aCcpPy52YWx1ZTtcclxuXHJcbiAgLy8gUnV0YXMgcXVlIHJlcXVpZXJlbiBhdXRlbnRpY2FjacOzblxyXG4gIGNvbnN0IHJ1dGFzUHJvdGVnaWRhcyA9IFsnL2Rhc2hib2FyZCddO1xyXG5cclxuICBjb25zdCByZXF1aWVyZVByb3RlY2Npw7NuID0gcnV0YXNQcm90ZWdpZGFzLnNvbWUoKHJ1dGEpID0+XHJcbiAgICBwYXRobmFtZS5zdGFydHNXaXRoKHJ1dGEpXHJcbiAgKTtcclxuXHJcbiAgaWYgKHJlcXVpZXJlUHJvdGVjY2nDs24gJiYgaXNBdXRoICE9PSAndHJ1ZScpIHtcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UucmVkaXJlY3QobmV3IFVSTCgnL2xvZ2luJywgcmVxdWVzdC51cmwpKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBOZXh0UmVzcG9uc2UubmV4dCgpO1xyXG59XHJcbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJtaWRkbGV3YXJlIiwicmVxdWVzdCIsInBhdGhuYW1lIiwibmV4dFVybCIsImlzQXV0aCIsImNvb2tpZXMiLCJnZXQiLCJ2YWx1ZSIsInJ1dGFzUHJvdGVnaWRhcyIsInJlcXVpZXJlUHJvdGVjY2nDs24iLCJzb21lIiwicnV0YSIsInN0YXJ0c1dpdGgiLCJyZWRpcmVjdCIsIlVSTCIsInVybCIsIm5leHQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(middleware)/./middleware.ts\n");

/***/ })

});