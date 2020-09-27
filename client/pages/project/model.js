import im from 'immutable'
import axios from 'common/axios'

const initialState = im.fromJS({
  listSource: {},
  params: {
    pageSize: 20,
    pageIndex: 1
  },
  historyParams: undefined,
  modalStatus: {
    visible: false,
    currentRecord: {},
    proList: [],
    loading: false
  },
  editData: {}
})

export default {
  state: initialState,
  reducers: {
    showModal: (state, payload = {}) => {
      return state.update('modalStatus', modal =>
        modal.set('visible', true).set('currentRecord', im.fromJS(payload))
      )
    },
    hideModal: (state, payload) => {
      return state.update('modalStatus', modal => modal.set('visible', false).set('loading', false))
    },
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
    }
  },
  effects: {
    async query(params, rootState) {
      const data = await axios.get('/project/list', { params })
      this.listSource(data)
      return data
    },
    save(data, rootState) {
      return axios.post('/project/save', data)
    },
    async queryById(id, rootState) {
      const data = await axios.get('/project/getproject', { params: { id } })
      this.setEditData(data)
    },
    async remove(id, rootState) {
      await axios.post(`/user/remove/${id}`)
    }
  }
}
