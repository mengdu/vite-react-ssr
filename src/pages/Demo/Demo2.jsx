function Demo1 (props) {
  return (
    <>
      <h5>/demo/Demo2</h5>
    </>
  )
}

Demo1.loadData = ctx => {
  console.log('get demo2 data')
  return { ccc: [1, 2, 3] }
}

export default Demo1
