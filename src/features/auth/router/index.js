// Routes are protected by default (see src/app/router/authGuard.js).
// meta.public: reachable without being signed in.
// meta.guestOnly: signed-in users are redirected away from it.
export const authRoutes = [
  {
    path: "/sign-in",
    name: "sign-in",
    component: () => import("../ui/views/SignInView.vue"),
    meta: { public: true, guestOnly: true },
  },
  {
    path: "/sign-up",
    name: "sign-up",
    component: () => import("../ui/views/SignUpView.vue"),
    meta: { public: true, guestOnly: true },
  },
  {
    // Target of the link in the verification e-mail.
    path: "/verify-email",
    name: "verify-email",
    component: () => import("../ui/views/VerifyEmailView.vue"),
    meta: { public: true },
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: () => import("../ui/views/ForgotPasswordView.vue"),
    meta: { public: true, guestOnly: true },
  },
  {
    // Target of the link in the password reset e-mail.
    path: "/reset-password",
    name: "reset-password",
    component: () => import("../ui/views/ResetPasswordView.vue"),
    meta: { public: true },
  },
];
