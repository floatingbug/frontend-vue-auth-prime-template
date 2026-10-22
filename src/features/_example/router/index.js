// Routes are protected by default (see src/app/router/authGuard.js).
// Add `meta: { public: true }` only for pages that need no sign-in.
export const exampleRoutes = [
  {
    path: "/example",
    name: "example",
    component: () => import("../ui/views/ExampleView.vue"),
  },
];
