import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/studio(.*)']);
const isSignInRoute = createRouteMatcher(['/studio/sign-in(.*)']);

// Temel bellek içi (in-memory) rate limit tablosu
const rateLimitMap = new Map();

export default clerkMiddleware(async (auth, req) => {
    // Kötü niyetli botlara karşı iletişim formu (API) için Hız Sınırı (Rate Limiting)
    if (req.nextUrl.pathname.startsWith('/api/contact')) {
        const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
        const now = Date.now();
        const windowMs = 60 * 1000; // 1 dakika
        const maxRequests = 5; // IP başına dakikada maksimum 5 istek

        const requestData = rateLimitMap.get(ip) || { count: 0, startTime: now };

        if (now - requestData.startTime > windowMs) {
            requestData.count = 1;
            requestData.startTime = now;
        } else {
            requestData.count++;
        }

        rateLimitMap.set(ip, requestData);

        if (requestData.count > maxRequests) {
            return new NextResponse('Çok Fazla İstek (Rate Limit Aşımı)', { status: 429 });
        }
    }

    if (isProtectedRoute(req) && !isSignInRoute(req)) {
        await auth.protect();
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
