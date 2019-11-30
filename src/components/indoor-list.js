import { html } from '@polymer/lit-element';

const INDOOR_ACTIVITIES = [
    {"id": 1, "title": "Cabot Creamery Extra Sharp Cheddar Cheese"},
    {"id": 2, "title": "Cowgirl Creamery Mt. Tam Cheese"},
    {"id": 3, "title": "Tillamook Medium Cheddar Cheese"},
    {"id": 4, "title": "Point Reyes Bay Blue Cheese"},
    {"id": 5, "title": "Shepherd's Halloumi Cheese"}
  ];

export const IndoorList = html`
<style>
  button {
    font-size: inherit;
    vertical-align: middle;
    background: transparent;
    border: none;
    cursor: pointer;
  }
  button:hover svg {
    fill: var(--app-primary-color);
  }
</style>
<p>Please add some products to cart.</p>
${INDOOR_ACTIVITIES.map((item) =>
  html`
    <div>
      <shop-item name="${item.title}"></shop-item>
    </div>
  `
)}
`;
