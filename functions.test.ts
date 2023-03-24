const {shuffleArray} = require('./utils')

const testArray = [30,22,37,41,51,68];

describe('shuffleArray should', () => {
    let result = shuffleArray(testArray);

    it('return an array', () => {
        expect(typeof result).toBe('object');
    });

    it('return an array of the same length as the argument sent in', () => {
        expect(result.length).toBe(testArray.length);
    });

    it('return an array with the same items as input', () => {
        let checkArr = [...testArray];
        for (let i = 0; i < result.length; i++) {
            for (let j = 0; j < result.length; j++) {
                if (result[i] === checkArr[j]) {
                    checkArr.splice(j, 1);
                }
            }
        }
        expect(checkArr.length).toBe(0);
    });

    it('retrun an array with items shuffled around', () => {
        let shuffled = false;
        let checkArr = [...testArray];
        const allowedMatchingSpaces = 2; // in some random cases, a number will end up at the same index it started at
                                         // this variable was implemented to let the tester allow a certain amount of 
                                         // indexes to be remain unchanged but still let the test pass

        for (let i = 0; i < checkArr.length; i++) {
            if (checkArr[i] === result[i]) checkArr[i] = 1;
            else checkArr[i] = 0;
        }
        let sum = checkArr.reduce((acc, a) => acc + a, 0)

        if (sum > allowedMatchingSpaces) shuffled = false
        else shuffled = true;

        expect(shuffled).toBe(true);
    });
});