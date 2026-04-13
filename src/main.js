import { createApp } from "vue";
import App from "./App.vue";
/**
 * TODO: I believe this somehow doesn't generate all the --tw-* vars or does not attach
 * them properly, which is why I always have to declare a shadow color when using
 * shadow-xl for instance (see src/assets/css/themes/card.css).
 */
import widgetStyles from "./assets/css/app.css?inline";

// TODO: Fix this: I had to copy the altcha styles into our own CSS file,
// because the styles from the altcha package were not applied when imported directly.
// I am assuming this is because altcha isn't supposed to be used in a Shadow DOM environment,
// but I will need to investigate this further.
import altachaStyles from "./assets/css/altcha.css?inline";

//  It'd also be sweet if we could
// import styles based on the selected theme, but themes seem broken at the moment,
// so I'll look into that later as well.
// import altchaTheme from "altcha/themes/cyberpunk.css?inline";

const initWidget = (config = {}) => {
  console.log("Initializing Voces Widget with config:", config);
  const target = config.target || "#voces-widget";
  const el = document.querySelector(target);

  if (!el) {
    console.error(`Voces Error: Target element "${target}" not found.`);
    return;
  }

  let shadowRoot;

  if (el.shadowRoot) {
    shadowRoot = el.shadowRoot;
    if (el.__voces_app__) {
      el.__voces_form__.unmount();
    }
    shadowRoot.innerHTML = "";
  } else {
    // First time initializing
    shadowRoot = el.attachShadow({ mode: "open" });
  }

  // 2. Create a style element and inject your Tailwind CSS into the Shadow Root
  const styleTag = document.createElement("style");
  styleTag.textContent = widgetStyles;
  styleTag.setAttribute("data-voces-styles", "");
  shadowRoot.appendChild(styleTag);

  const altchaStyleTag = document.createElement("style");
  altchaStyleTag.textContent = altachaStyles;
  altchaStyleTag.setAttribute("data-altcha-styles", "");
  shadowRoot.appendChild(altchaStyleTag);

  const container = document.createElement("div");
  shadowRoot.appendChild(container);

  const urlParams = new URLSearchParams(window.location.search);
  const finalSource = urlParams.get("source") || config.source || null;
  const finalOrigin =
    urlParams.get("origin") || config.origin || window.location.hostname;

  const app = createApp(App, {
    campaignUuid: config.campaignUuid,
    source: finalSource,
    origin: finalOrigin,
    locale: config.locale || "de",
    theme: config.theme || "minimal",
    apiUrl: config.apiBaseUrl || "https://app.voces.ch/api/v1",
  });

  app.mount(container);

  el.__voces_form__ = app;
};

window.voces = {
  widget: initWidget,
};
