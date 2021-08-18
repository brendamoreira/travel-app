const utils = require("../utils")

describe('test countdown', () =>{
    test('should return 3 days', () => {
        let date = new Date();
        date = date.getTime() + (24*3*3600*1000); //3 days
        expect(utils.countdown(date)).toBe(3);
    })
})
