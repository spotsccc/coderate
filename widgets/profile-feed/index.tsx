import React from 'react'
import styled from 'styled-components'

import { colors } from '@/shared/ui/constants'

const PROFILE_FEED_WIDTH = 500

const View = styled.div`
	width: ${PROFILE_FEED_WIDTH}px;
	min-height: 100vh;
	background-color: ${colors.green};
`

export const ProfileFeed = () => <View />