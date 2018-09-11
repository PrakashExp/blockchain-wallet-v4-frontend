import React from 'react'
import { FormattedMessage } from 'react-intl'
import {
  SettingComponent,
  SettingContainer,
  SettingDescription,
  SettingHeader,
  SettingSummary
} from 'components/Setting'

import Settings from './Settings'

const RenameDevice = props => {
  const { deviceName, deviceId } = props

  return (
    <SettingContainer>
      <SettingSummary>
        <SettingHeader>
          <FormattedMessage
            id='scenes.lockbox.settings.renamedevice.title'
            defaultMessage='Name'
          />
        </SettingHeader>
        <SettingDescription>
          <FormattedMessage
            id='scenes.lockbox.settings.renamedevice.description'
            defaultMessage='{deviceName}'
            values={{ deviceName }}
          />
        </SettingDescription>
      </SettingSummary>
      <SettingComponent>
        <Settings deviceId={deviceId} />
      </SettingComponent>
    </SettingContainer>
  )
}

export default RenameDevice