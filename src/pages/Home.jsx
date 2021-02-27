import { useEffect, useState } from 'react'
import { sleep } from '../utils'

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
      <Demo></Demo>
    </>
  )
}

Home.loadData = async function (ctx) {
  // console.log(ctx)
  // await sleep(2000) // 延迟测试

  return {
    arr: [1, 2, 3, 4]
  }
}

export default Home
