import _ from 'lodash'

export default class StateBag {
    constructor(props) {
        this.map = new Map()

        for (let prop of props) {
            this[`get${prop}`] = _.curry(this.getProp)(prop)
            this[`set${prop}`] = _.curry(this.setProp)(prop)
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
