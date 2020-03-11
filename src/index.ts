import BrowserTask from './BrowserTask'

let Task = BrowserTask;
if (eval('typeof window') === 'undefined') {
    Task = require('./NodeTask').default;
}

// Export types
export { Task };