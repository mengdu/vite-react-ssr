function Home (props) {
  // console.log(props.arr)
  return (
    <>
      <h1>Home</h1>
      <p>{JSON.stringify(props.arr)}</p>
    </>
  )
}

Home.loadData = async function (ctx) {
  // console.log(ctx)

  return {
    arr: [1, 2, 3, 4]
  }
}

export default Home