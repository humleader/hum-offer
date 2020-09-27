import im from 'immutable'
import axios from 'common/axios'

const initialState = im.fromJS({
  listSource: {},
  params: {
    pageSize: 20,
    pageIndex: 1
  },
  historyParams: undefined,
  editData: {},
  skill: []
})

export default {
  state: initialState,
  reducers: {
    listSource: (state, payload) => {
      return state.set('listSource', im.fromJS(payload))
    },
    setParams: (state, payload) => {
      return state.set('params', im.fromJS(payload))
    },
    setHistoryParams: (state, payload) => {
      return state.set('historyParams', im.fromJS(payload))
    },
    setEditData: (state, payload) => {
      return state.set('editData', im.fromJS(payload))
    },
    setSkill: (state, payload) => {
      return state.set('skill', im.fromJS(payload))
    }
  },
  effects: {
    async query(params, rootState) {
      const data = await axios.get('/candidate/list', { params })
      this.listSource(data)
      return data
    },
    save(data, rootState) {
      return axios.post('/candidate/save', data)
    },
    async queryById(id, rootState) {
      const data = await axios.get('/candidate/getcandidate', { params: { id } })
      this.setEditData(data)
      return data
    },
    async getSkill(id, rootState) {
      const data = await axios.get('/skill/tree')
      this.setSkill(data)
      return data
    }
  }
}
