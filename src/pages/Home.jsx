import { useState } from 'react'
import { sleep } from '../utils'
function Home (props) {
  // console.log(props.arr)
  const [arr, setArr] = useState(props.arr || [])

  const onAdd = () => {
    arr.push(Date.now())
    setArr([...arr])
  }

  return (
    <>
      <h1>Home</h1>
      <button onClick={onAdd}>Add</button>
      <p>{JSON.stringify(arr)}</p>
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