import ListTable from '../components'
import { connect } from 'react-redux'

function mapStateToProps(state) {
  const company = state.company
  const common = state.common
  return {
    company,
    common
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: {
      ...dispatch.company
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListTable)
