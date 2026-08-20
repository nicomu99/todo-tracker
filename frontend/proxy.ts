import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { match } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"

let locales = ["en", "de"]
let defaultLocale = "en"

function getLocale(request: NextRequest) {
    let languages = new Negotiator({
        headers: Object.fromEntries(request.headers)
    }).languages()

    return match(languages, locales, defaultLocale)
}

/**
 * Redirects non-localized application routes to their localized equivalents.
 *
 * Static assets and internals are excluded through `config.mather`.
 */
export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (pathnameHasLocale) return

    const locale = getLocale(request)
    request.nextUrl.pathname = `/${locale}${pathname}`
    return NextResponse.redirect(request.nextUrl)
}

// noinspection JSUnusedGlobalSymbols
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)',
    ],
}