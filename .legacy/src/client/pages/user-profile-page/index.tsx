import React from 'react'

import { ProfileCard } from '@client/widgets/profile-card'
import { ProfileFeed } from '@client/widgets/profile-feed'
import { Layout } from '@client/pages/user-profile-page/layout'

export const UserProfilePage = () => (
	<Layout ProfileCard={ProfileCard} ProfileFeed={ProfileFeed} />
)
