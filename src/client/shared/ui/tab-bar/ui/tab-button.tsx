import styled from "styled-components"
import { colors, fonts } from "../../constants"

export type TabButtonProps = {
	selected?: boolean
	onClick: () => void
}

export const TabButton = styled.button<TabButtonProps>`
	width: 100px;
	height: 60px;
	border: 1px solid ${colors.black};
	background: ${(props) => (props.selected ? colors.grey : colors.white)};
	font-size: ${fonts.m.size};

	&:focused {
		outline: none;
	}

	&:last-child {
		border-radius: 0 4px 4px 0;
		border-left: none;
	}

	&:first-child {
		border-radius: 4px 0 0 4px;
		border-right: none;
	}
`
