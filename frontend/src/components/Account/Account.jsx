import { useState } from 'react'
import {Outlet} from 'react-router'
import './Account.css'

import Menu from "./../Menu/Menu.jsx"
import TopBar from "./../TopBar/TopBar.jsx"

function Account() {

  return (
    <>
    <TopBar/>
    <Menu/>
    <Outlet/>
    </>
  )
}

export default Account
