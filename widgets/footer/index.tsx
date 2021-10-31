import React from 'react'
import styled from 'styled-components'

import { colors, indents } from '@/shared/ui/constants'

const View = styled.footer`
	width: 100%;
	height: ${indents[19]};
	background-color: ${colors.black};
`

export const Footer = () => <View />
