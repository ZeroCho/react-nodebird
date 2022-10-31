import  {useState, useCallback} from 'react'

export default (initialValue = null) => {
    const [value, setValue] = useState(initialValue)
    const handler= useCallback((e) => {
        // 컴포넌트에 프롭스로 넘겨주는 함수는 usecallback을 써라. 그래야 최적화가 되기 때문이다.
        setValue(e.target.value)
    },[])

    return[value, handler]
}