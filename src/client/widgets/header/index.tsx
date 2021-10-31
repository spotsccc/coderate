import React from 'react'
import styled from 'styled-components'

import { colors, indents } from '@client/shared/ui/constants'

const View = styled.header`
	width: 100%;
	height: ${indents[19]};
	background-color: ${colors.red};
`

export const Header = () => <View />
