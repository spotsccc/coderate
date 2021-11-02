import { ArrowButton, ArrowDirection } from '@/shared/ui/arrow-button/view'
import React from 'react'
import styled from 'styled-components'

const MonthSelectorContainer = styled.span`
	display: flex;
	align-items: center;
	font-size: 36px;
	color: white;
`

const CurrentMonth = styled.p`
	margin: 0;
	padding: 0 5px;
`

export const MonthSelector = () => (
	<MonthSelectorContainer>
		<ArrowButton direction={ArrowDirection.left} />
		<CurrentMonth>Февраль 2021</CurrentMonth>
		<ArrowButton direction={ArrowDirection.right} />
	</MonthSelectorContainer>
)
