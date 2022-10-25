import 'antd/dist/antd.css'
import PropTypes from 'prop-types'
import React from 'react'



const NodeBird = ({Component}) => {
    return(
        <>
        <Component />
        </>
    )

}

NodeBird.propTypes = {
    Component : PropTypes.elementType.isRequired,
}

export default NodeBird;