import im from 'immutable'
import axios from 'common/axios'

const initialState = im.fromJS({
  listSource: {},
  params: {
    pageSize: 10,
    pageIndex: 1
  },
  historyParams: undefined,
  toproject: [],
  editData: {}
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
    setToproject: (state, payload) => {
      return state.set('toproject', im.fromJS(payload))
    },
    setEditData: (state, payload) => {
      return state.set('editData', im.fromJS(payload))
    }
  },
  effects: {
    async query(params, rootState) {
      const data = await axios.get('/company/list', { params })
      this.listSource(data)
      return data
    },
    save(data, rootState) {
      return axios.post('/company/save', data)
    },
    async queryById(id, rootState) {
      const data = await axios.get('/company/getcompany', { params: { id } })
      this.setEditData(data)
    },
    // 查询已签约公司
    queryToproject(data, rootState) {
      axios.get('/company/toproject').then(res => {
        this.setToproject(res)
      })
    },
    async remove(id, rootState) {
      await axios.post(`/user/remove/${id}`)
    }
  }
}
