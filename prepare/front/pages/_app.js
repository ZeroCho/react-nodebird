import 'antd/dist/antd.css'
import PropTypes from 'prop-types'
import React from 'react'
import Head from 'next/head'
import wrapper from '../store/configureStore'

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

export default wrapper.withRedux(NodeBird);
//wrapper의 withRedux HOC로 app.js 컴포넌트를 감싸준다.
// 이제 각 페이지에서 getStaticProps, getServerSideProps 등의 함수 내에서 스토어 접근이 가능해진다.
