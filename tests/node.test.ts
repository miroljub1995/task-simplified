import { Task } from '../dist'
import { expect } from 'chai';
import 'mocha'

describe("Test", () => {
    it('Run', async () => {
        const res = await Task.Run(p => p * p, 15);
        expect(res).to.equal(15 * 15);
    });
});