import { registerApplication, start } from "single-spa";

registerApplication({
  // name: "@single-spa/welcome",
  name: "hzby-app-6",
  app: () =>
    System.import(
      // 'http://localhost:8080/hzby-app-6.js'
      "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
    ),
  activeWhen: ["/"],
});

registerApplication({
  name: "@hzby/app-6",
  app: () => System.import("http://localhost:8081/hzby-app-2.js"),
  activeWhen: (location) => location.pathname.startsWith("/1"),
});

registerApplication({
  name: "@hzby/client",
  app: () => System.import("http://localhost:8082/hzby-client.js"),
  activeWhen: (location) => location.pathname.startsWith("/client"),
});

// registerApplication({
//   name: "@hzby/navbar",
//   app: () => System.import("@hzby/navbar"),
//   activeWhen: ["/"]
// });

start({
  urlRerouteOnly: true,
});
