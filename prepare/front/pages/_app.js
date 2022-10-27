import 'antd/dist/antd.css'
import PropTypes from 'prop-types'
import React from 'react'
import Head from 'next/head'


const NodeBird = ({Component}) => {
    return(
        <>
    <Head>
        <meta charSet='utf-8' />
        <title>원희의 NodeBird</title>
    </Head>
        <Component />
        </>
    )

}

NodeBird.propTypes = {
    Component : PropTypes.elementType.isRequired,
}

export default NodeBird;