import ListTable from '../components'
import { connect } from 'react-redux'

function mapStateToProps(state) {
  const project = state.project
  const common = state.common
  const company = state.company
  return {
    project,
    company,
    common
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: {
      ...dispatch.project,
      queryToproject: dispatch.company.queryToproject
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListTable)
