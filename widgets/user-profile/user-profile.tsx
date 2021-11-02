import styled from 'styled-components'

const UserAvatar = styled.button`
	border: none;
	background-color: inherit;
	background-image: url('/user-avatar.svg');
	background-repeat: no-repeat;
	cursor: pointer;
	width: 50px;
	height: 50px;
`

const Settings = styled.button`
	border: none;
	background-color: inherit;
	background-image: url('/settings.svg');
	background-repeat: no-repeat;
	cursor: pointer;
	width: 28px;
	height: 28px;
`

const UserProfileContainer = styled.span`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 90px;
`

export const UserProfile = () => (
	<UserProfileContainer>
		<Settings />
		<UserAvatar />
	</UserProfileContainer>
)
