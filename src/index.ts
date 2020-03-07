import BrowserTask from './BrowserTask'

let Task = BrowserTask;
declare global { const window: any };
if (typeof window === 'undefined') {
    Task = require('./NodeTask').default;
}

// Export types
export { Task };