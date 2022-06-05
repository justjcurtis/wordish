const az = 'abcdefghijklmnopqrstuvwxyz'

class WordEngine {
    constructor() {
        this.word = undefined
        this.letters = undefined
        this.extra = undefined
        this.letterMap = undefined
        this.allowed = undefined
        this.letterMapCache = {}
    }

    getLetterMap(word) {
        const map = {}
        if (word != 'constructor' && this.letterMapCache[word] != undefined) return this.letterMapCache[word]
        for (let i = 0; i < word.length; i++) {
            const char = word[i]
            if (map[char] == undefined) map[char] = 0
            map[char]++
        }
        this.letterMapCache[word] = map
        return map
    }

    getWordListLetterMap(wl) {
        const map = {}
        for (let i = 0; i < wl.length; i++) {
            const wMap = this.getLetterMap(wl[i])
            const keys = Object.keys(wMap)
            for (let j = 0; j < keys.length; j++) {
                const key = keys[j]
                if (map[key] == undefined) map[key] = 0
                map[key] += wMap[key]
            }
        }
        return map
    }

    extraNeeded(a, b) {
        let needed = ''
        const aMap = this.getLetterMap(a)
        const bMap = this.getLetterMap(b)
        const aKeys = Object.keys(aMap)
        for (let i = 0; i < aKeys.length; i++) {
            const key = aKeys[i]
            if (bMap[key] == undefined) bMap[key] = 0
            if (bMap[key] < aMap[key]) {
                const count = aMap[key] - bMap[key]
                for (let j = 0; j < count; j++) {
                    needed += key
                }
            }
        }
        return needed.split('').sort().join('')
    }

    condensePossibleSorted(possibleMap, needed) {
        const possibleSorted = []
        const keys = Object.keys(possibleMap).filter(key => key.length <= needed)
        keys.sort((a, b) => b.length - a.length)
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            let newWords = []
            if (key.length < needed) break
            for (let j = i + 1; j < keys.length; j++) {
                const child = keys[j]
                if (this.extraNeeded(child, key).length == 0) {
                    newWords = [...newWords, ...possibleMap[child]]
                }
            }
            possibleSorted.push([key, [...new Set([...possibleMap[key], ...newWords])]])
        }
        possibleSorted.sort((a, b) => b.length - a.length)
        return possibleSorted
    }

    getExtraLettersAndAllowedWords(word) {
        const allowed = []
        const possibleMap = {}
        for (let i = 0; i < words.length; i++) {
            const other = words[i]
            const extra = this.extraNeeded(other, word)
            if (extra.length == 0) {
                allowed.push(other)
                continue
            }
            if (extra.length + word.length > 8) continue
            if (possibleMap[extra] == undefined) possibleMap[extra] = []
            possibleMap[extra].push(other)
        }
        const extraLettersNeeded = 8 - word.length
        const condensedPossibleSorted = this.condensePossibleSorted(possibleMap, extraLettersNeeded)
        const [extra, possible] = condensedPossibleSorted[0]
        return { extra, allowed: [...allowed, ...possible] }
    }

    newWord(min = 5, max = 6, word = null) {
        if (word == null) {
            const possibleWords = words.filter(w => w.length >= min && w.length <= max)
            const index = Math.floor(random(0, possibleWords.length))
            this.word = possibleWords[index]
            word = this.word
        } else {
            this.word = word
        }
        const { extra, allowed } = this.getExtraLettersAndAllowedWords(word)
        this.extra = extra
        this.allowed = allowed
        this.letterMap = this.getWordListLetterMap(this.allowed)
        this.letters = word.split('').concat(this.extra.split(''))
        this.letters.sort(() => Math.random() < 0.5 ? -1 : 1)
        this.letters.sort(() => Math.random() < 0.5 ? -1 : 1)
        this.letters.sort(() => Math.random() < 0.5 ? -1 : 1)
        return { extra, allowed, word }
    }

    getWordScore(guess) {
        if (!this.allowed.includes(guess)) return 0
        if (this.letterMap == undefined) return undefined
        if (this.word == undefined) return undefined
        if (guess == this.word) return 20

        const indiciesScored = {}
        let score = 0
        for (let i = 0; i < guess.length; i++) {
            const g = guess[i]
            if (this.word.length > i) {
                const w = this.word[i]
                if (w == g) {
                    indiciesScored[i] = true
                    score += 2
                    continue
                }
            }
        }
        for (let i = 0; i < guess.length; i++) {
            if (indiciesScored[i]) continue
            const g = guess[i]
            const wordIndicies = []
            for (let j = 0; j < this.word.length; j++) {
                if (this.word[j] == g) wordIndicies.push(j)
            }
            wordIndicies.filter(i => !indiciesScored[i])
            if (wordIndicies.length > 0) {
                indiciesScored[wordIndicies[0]] = true
                score += 1
            }
        }
        return score == 0 ? 1 : score
    }
}