import React from 'react'
import PropTypes from 'prop-types'

import contactData from './contact.json'

import Profile from './Profile'

const ProfileScreen = () => <Profile {...contactData} />

export default ProfileScreen
