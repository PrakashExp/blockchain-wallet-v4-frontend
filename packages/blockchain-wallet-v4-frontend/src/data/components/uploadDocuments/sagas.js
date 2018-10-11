import { put, call } from 'redux-saga/effects'

import * as actions from '../../actions'
import * as A from './actions'
export const logLocation = 'components/identityVerification/sagas'

export default ({ api }) => {
  const fetchData = function*({ payload }) {
    try {
      const { token } = payload
      const response = yield call(api.fetchUploadData, token)
      yield put(A.setData(response))
    } catch (error) {
      yield put(actions.alerts.displayError(error.description))
    }
  }

  const upload = function*({ payload }) {
    try {
      const { files, token } = payload
      yield put(A.setUploadedLoading())
      const response = yield call(
        api.uploadDocuments,
        token,
        JSON.stringify(files)
      )
      yield put(A.setUploadedSuccess(response))
      yield put(A.setReference(response))
    } catch (error) {
      yield put(A.setUploadedFailure(error.description))
      yield put(actions.alerts.displayError(error.description))
    }
  }

  return {
    fetchData,
    upload
  }
}
