import { useEffect, useState } from 'react'
import { sleep } from '../utils'
import request from '../utils/request'

function Demo (props) {
  return 'demo'
}
function Home (props) {
  const [arr, setArr] = useState(props.arr || [])

  const onAdd = () => {
    arr.push(Date.now())
    setArr([...arr])
  }

  useEffect(() => {
    setArr(props.arr)
  }, [props.arr])

  return (
    <>
      <h1>Home</h1>
      <button onClick={onAdd}>Add</button>
      <p>{JSON.stringify(arr)}</p>
      <p>{JSON.stringify(props.data)}</p>
      <Demo></Demo>
    </>
  )
}

Home.loadData = async function (ctx) {
  // await sleep(2000) // 延迟测试
  const result = await request.get('https://cnodejs.org/api/v1/topics')
  console.log(result.data)
  return {
    // redirect: '/user/1234', // Switch to route
    // redirect: 'https://other.com?w=123', // Redirect to site
    data: result.data, // props.data
    arr: [1, 2, 3, 4] // props.arr
  }
}

export default Home
