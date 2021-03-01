function Demo1 (props) {
  return (
    <>
      <h5>/demo/Demo1</h5>
    </>
  )
}

Demo1.loadData = ctx => {
  console.log('get demo1 data')
  return { bbb: [1, 2, 3] }
}

export default Demo1