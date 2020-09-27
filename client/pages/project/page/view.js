import DetailsView from '../components/details-view'
import { connect } from 'react-redux'

function mapStateToProps(state) {
  const project = state.project
  const company = state.company
  const common = state.common
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
      ...dispatch.common,
      queryToproject: dispatch.company.queryToproject
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsView)
