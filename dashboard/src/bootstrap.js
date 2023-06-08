import { createApp } from 'vue';
import Dashboard from './components/Dashboard.vue';

const mount = (el) => {
    const app = createApp(Dashboard)
    app.mount(el);
}

if ('development' === process.env.NODE_ENV) {
    const element = document.querySelector('#_dashboard-dev-root');
    if (element) [
        mount(element)
    ]
}

export { mount };

