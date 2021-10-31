import React from 'react'
import styled from 'styled-components'

import { colors } from '@/shared/ui/constants'

const PROFILE_CARD_WIDTH = 300
const PROFILE_CARD_HEIGHT = 440

const View = styled.div`
	width: ${PROFILE_CARD_WIDTH}px;
	height: ${PROFILE_CARD_HEIGHT}px;
	background-color: ${colors.grey};
`

export const ProfileCard = () => <View />
