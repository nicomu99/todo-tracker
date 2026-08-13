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
        // Skip all internal paths (_next)
        '/((?!_next).*)',
    ],
}