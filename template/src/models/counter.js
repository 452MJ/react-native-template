export default {
  namespace: "counter",
  state: 0,
  reducers: {
    addCounter(state, { payload }) {
      state += 1
      return state
    }
  },
  effects: {},
  subscriptions: {}
}
