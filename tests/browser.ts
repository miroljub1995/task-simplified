import { Task } from '../dist'
import { expect } from 'chai';
const jsdom = require('mocha-jsdom');

describe("Test", () => {
    jsdom({ url: "http://localhost" });

    it('Run', async () => {
        const res = await Task.Run(p => p * p, 15);
        expect(res).to.equal(15 * 15);
    });
});