import curry from 'lodash.curry'

export default class StateBag {
    constructor(props) {
        this.map = new Map()

        for (let prop of props) {
            this[`get${prop}`] = curry(this.getProp)(prop)
            this[`set${prop}`] = curry(this.setProp)(prop)
        }
    }

    setProp(prop, vertex, val) {
        let state = this.map.get(vertex) || {}
        state[prop] = val
        this.map.set(vertex, state)
    }

    getProp(prop, vertex) {
        let state = this.map.get(vertex) || {}
        return state[prop]
    }
}
