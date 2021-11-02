import React from 'react'
import styled from 'styled-components'

const Input = styled.input`
	width: 257px;
	box-sizing: border-box;
	height: 44px;
	padding: 0 24px;
	background-color: rgba(255, 255, 255, 0.2);
	border: none;
	outline: none;
	border-radius: 7px;
	color: black;
	background-image: url('/search.svg');
	background-repeat: no-repeat;
	background-position: right 24px center;

	&::placeholder {
		color: black;
	}
`

export const SearchInput = () => <Input placeholder="Поиск" type="text" />
