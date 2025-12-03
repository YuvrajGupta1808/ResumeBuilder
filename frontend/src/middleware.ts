export { default } from 'next-auth/middleware';

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/resume-upload/:path*',
        '/job-input/:path*',
        '/results/:path*',
        '/download/:path*',
    ],
};
