import DetailsView from '../components/details-view'
import { connect } from 'react-redux'

function mapStateToProps(state) {
  const candidate = state.candidate
  const common = state.common
  return {
    candidate,
    common
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: {
      ...dispatch.candidate,
      ...dispatch.common
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsView)
