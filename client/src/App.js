import React from 'react'
import styles from './App.module.scss'
import { getRoute } from './utils/utils'
import Hero from "./components/Hero/index.js"
import Header from './components/Header/index'
import Footer from './components/Footer/index'
import Provable from './components/ProvableCrowdsale/index'

export default _ =>
  <div className={styles.App}>
    <Header />
      { getRoute() === '' && <Hero /> }
      { getRoute() === 'provable' && <Provable routeName='provable' /> }
    <Footer />
  </div>
