import React from 'react'
import { actions } from 'data'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getData, getWalletsWithoutRemoteData } from './selectors'
import Template from './template.success'
import { Remote } from 'blockchain-wallet-v4/src'
import { formValueSelector } from 'redux-form'

class BitcoinWalletsContainer extends React.Component {
  shouldComponentUpdate (nextProps) {
    return !Remote.Loading.is(nextProps.data)
  }

  render () {
    const {
      search,
      data,
      walletsWithoutRemoteData,
      modalActions,
      coreActions,
      ...rest
    } = this.props

    return data.cata({
      Success: value => (
        <Template
          wallets={value}
          search={search && search.toLowerCase()}
          onUnarchive={i => coreActions.setAccountArchived(i, false)}
          handleClick={() =>
            modalActions.showModal('AddBitcoinWallet', {
              wallets: value
            })
          }
          {...rest}
        />
      ),
      Failure: message => (
        <Template
          failure
          message={message}
          wallets={walletsWithoutRemoteData}
          search={search && search.toLowerCase()}
          onUnarchive={i => coreActions.setAccountArchived(i, false)}
          handleClick={() =>
            modalActions.showModal('AddBitcoinWallet', {
              wallets: walletsWithoutRemoteData
            })
          }
          {...rest}
        />
      ),
      Loading: () => <div />,
      NotAsked: () => <div />
    })
  }
}

const mapDispatchToProps = dispatch => ({
  modalActions: bindActionCreators(actions.modals, dispatch),
  coreActions: bindActionCreators(actions.core.wallet, dispatch),
  actions: bindActionCreators(actions.core.data.bitcoin, dispatch)
})

const mapStateToProps = state => ({
  data: getData(state),
  search: formValueSelector('settingsAddresses')(state, 'search'),
  walletsWithoutRemoteData: getWalletsWithoutRemoteData(state)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BitcoinWalletsContainer)
