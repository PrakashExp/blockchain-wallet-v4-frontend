import { fork } from 'redux-saga/effects'
import bitcoin from './btc/sagaRegister'
import coinify from './coinify/sagaRegister'
import ethereum from './eth/sagaRegister'
import bch from './bch/sagaRegister'
import misc from './misc/sagaRegister'
import sfox from './sfox/sagaRegister'
import shapeShift from './shapeShift/sagaRegister'

export default ({ api }) =>
  function*() {
    yield fork(bitcoin({ api }))
    yield fork(coinify({ api }))
    yield fork(ethereum({ api }))
    yield fork(bch({ api }))
    yield fork(misc({ api }))
    yield fork(shapeShift({ api }))
    yield fork(sfox({ api }))
  }
